import type { TravelMode } from './googleMaps';

export interface OSMRoute {
  id: string;
  name: string;
  type: 'safe' | 'balanced' | 'fastest';
  distance: string;
  duration: string;
  safetyScore: number;
  color: string;
  polyline: string;
  legs: any[];
  warnings: string[];
  summary: string;
  steps: any[];
  coordinates: [number, number][];
}

interface GeocodingResult {
  lat: string;
  lon: string;
  display_name: string;
}

interface ORSStep {
  distance: number;
  duration: number;
  instruction?: string;
  name?: string;
  way_points?: number[];
  type?: number;
}

interface ORSFeature {
  geometry: {
    coordinates: [number, number][];
  };
  properties: {
    summary: {
      distance: number;
      duration: number;
    };
    segments?: {
      steps?: ORSStep[];
    }[];
  };
}

interface ORSResponse {
  features?: ORSFeature[];
}

async function geocodeAddress(address: string) {
  const url = new URL(
    'https://nominatim.openstreetmap.org/search'
  );

  url.searchParams.set('q', address);
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('limit', '1');

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(
      'Unable to find this location. Please try again.'
    );
  }

  const results =
    (await response.json()) as GeocodingResult[];

  if (results.length === 0) {
    throw new Error(
      `Location not found: ${address}. Try including the city or state.`
    );
  }

  return {
    lat: Number(results[0].lat),
    lon: Number(results[0].lon),
    address: results[0].display_name,
  };
}

function formatDistance(meters: number): string {
  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`;
  }

  return `${Math.round(meters)} m`;
}

function formatDuration(seconds: number): string {
  const minutes = Math.max(
    1,
    Math.round(seconds / 60)
  );

  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return remainingMinutes
      ? `${hours} hr ${remainingMinutes} min`
      : `${hours} hr`;
  }

  return `${minutes} min`;
}

// Initial Two-Wheeler time adjustment.
// This is an estimate, not live traffic information.


function getORSProfile(mode: TravelMode): string {
  switch (mode) {
    case 'WALKING':
      return 'foot-walking';

    case 'TWO_WHEELER':
    case 'DRIVING':
      return 'driving-car';

    case 'TRANSIT':
      // Temporary fallback; this is not actual
      // bus or public-transport routing.
      return 'driving-car';

    default:
      return 'driving-car';
  }
}
function formatTwoWheelerDuration(
  orsDurationSeconds: number
): string {
  const calibrationFactor = 1.9;

  const adjustedSeconds =
    orsDurationSeconds * calibrationFactor;

  return formatDuration(adjustedSeconds);
}
function getDisplayedDuration(
  mode: TravelMode,
  orsDurationSeconds: number
): string {
  if (mode === 'TWO_WHEELER') {
    return formatTwoWheelerDuration(orsDurationSeconds);
  }

  if (mode === 'DRIVING') {
    return formatDuration(orsDurationSeconds * 1.563);
  }

  return formatDuration(orsDurationSeconds);
}

export const openStreetMapService = {
  async getRoutes(
    origin: string,
    destination: string,
    travelMode: TravelMode = 'DRIVING'
  ): Promise<OSMRoute[]> {
    const apiKey =
      import.meta.env.VITE_OPENROUTESERVICE_API_KEY;

    if (!apiKey) {
      throw new Error(
        'OpenRouteService API key is missing. Check your .env file.'
      );
    }

    const start = await geocodeAddress(origin);
    const end = await geocodeAddress(destination);

    const profile = getORSProfile(travelMode);
    console.log('ROUTING DEBUG:', {
  selectedTravelMode: travelMode,
  routingProfile: profile,
});

    const url =
      `https://api.openrouteservice.org/v2/directions/${profile}/geojson`;


    const coordinates: [number, number][] = [
  [start.lon, start.lat],
  [end.lon, end.lat],
];

const requestBody = {
  coordinates,
  instructions: true,
  instructions_format: 'text',
  alternative_routes: {
    target_count: 3,
    weight_factor: 1.4,
    share_factor: 0.6,
  },
};

let response = await fetch(url, {
  method: 'POST',
  headers: {
    Authorization: apiKey,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(requestBody),
});

if (!response.ok) {
  const errorText = await response.text();

  console.error(
    'OpenRouteService error:',
    response.status,
    errorText
  );

  const isAlternativeRouteLimit =
    response.status === 400 &&
    (
      errorText.includes('100000') ||
      /alternative.routes|approximated route distance/i.test(
        errorText
      )
    );

  if (isAlternativeRouteLimit) {
    console.warn(
      'Alternative-route limit reached. Retrying with a single route.'
    );

    response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        coordinates,
        instructions: true,
        instructions_format: 'text',
      }),
    });
  } else {
    throw new Error(
      `Routing failed (${response.status}). ${errorText}`
    );
  }
}

if (!response.ok) {
  const errorText = await response.text();

  console.error(
    'OpenRouteService retry failed:',
    response.status,
    errorText
  );

  throw new Error(
    `Routing failed (${response.status}). Please check the console for details.`
  );
}

    const data =
      (await response.json()) as ORSResponse;

    if (!data.features?.length) {
      throw new Error(
        'No road routes were found between these locations.'
      );
    }

    console.log(
      'Number of routes returned by OpenRouteService:',
      data.features.length
    );

    return data.features.map((feature, index) => {
      console.log('RAW ORS ROUTE:', {
  routeNumber: index + 1,
  distanceKm: (
    feature.properties.summary.distance / 1000
  ).toFixed(1),
  originalDurationMinutes: (
    feature.properties.summary.duration / 60
  ).toFixed(1),
});
      const coordinates =
        feature.geometry.coordinates.map(
          ([longitude, latitude]) =>
            [latitude, longitude] as [number, number]
        );

      const routeSteps =
        feature.properties.segments?.flatMap(
          (segment) => segment.steps ?? []
        ) ?? [];

      const steps = routeSteps.map((step) => {
        const pointIndex =
          step.way_points?.[0] ?? 0;

        const point =
          coordinates[
            Math.min(
              pointIndex,
              coordinates.length - 1
            )
          ] ?? coordinates[0];

        return {
          instruction:
            step.instruction ||
            step.name ||
            'Continue along the road',
          distance: formatDistance(step.distance),
          duration: formatDuration(step.duration),
          maneuver: step.type,
          location: point
            ? {
                lat: point[0],
                lng: point[1],
              }
            : {
                lat: start.lat,
                lng: start.lon,
              },
        };
      });

      const routeType: OSMRoute['type'] =
        index === 0
          ? 'safe'
          : index === 1
            ? 'balanced'
            : 'fastest';

      return {
        id: `ors-route-${index}`,
        name: `Route ${index + 1}`,
        type: routeType,
        distance: formatDistance(
          feature.properties.summary.distance
        ),
        duration: getDisplayedDuration(
  travelMode,
  feature.properties.summary.duration
),
        safetyScore: 0,
        color: '#2EC4B6',
        polyline: '',
        legs: [],
        warnings: [],
        summary: routeSteps
          .map((step) => step.name)
          .filter(Boolean)
          .slice(0, 5)
          .join(', '),
        steps,
        coordinates,
      };
    });
  },
};