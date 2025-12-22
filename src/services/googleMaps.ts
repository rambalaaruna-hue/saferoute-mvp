/// <reference types="@types/google.maps" />

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export interface RouteData {
  id: string;
  name: string;
  type: 'safe' | 'balanced' | 'fastest';
  distance: string;
  duration: string;
  safetyScore: number;
  color: string;
  polyline: string;
  legs: google.maps.DirectionsLeg[];
  warnings: string[];
  summary: string;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

// Declare google as a global variable
declare global {
  interface Window {
    google: typeof google;
    __googleMapsScriptLoading?: Promise<void>;
  }
}

// Load Google Maps script dynamically
function loadGoogleMapsScript(): Promise<void> {
  // Return existing promise if script is already being loaded
  if (window.__googleMapsScriptLoading) {
    return window.__googleMapsScriptLoading;
  }

  const promise = new Promise<void>((resolve, reject) => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector(
      `script[src*="maps.googleapis.com/maps/api/js"]`
    ) as HTMLScriptElement;
    
    if (existingScript) {
      // Script exists, wait for it to load
      if (window.google && window.google.maps) {
        resolve();
      } else {
        const onLoad = () => {
          existingScript.removeEventListener('load', onLoad);
          existingScript.removeEventListener('error', onError);
          resolve();
        };
        const onError = () => {
          existingScript.removeEventListener('load', onLoad);
          existingScript.removeEventListener('error', onError);
          reject(new Error('Failed to load Google Maps script'));
        };
        existingScript.addEventListener('load', onLoad);
        existingScript.addEventListener('error', onError);
      }
      return;
    }

    // Create and load the script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
    script.async = true;
    script.defer = true;
    
    const onLoad = () => {
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onError);
      resolve();
    };
    
    const onError = () => {
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onError);
      reject(new Error('Failed to load Google Maps script'));
    };
    
    script.addEventListener('load', onLoad);
    script.addEventListener('error', onError);
    document.head.appendChild(script);
  });

  // Store the promise globally to prevent duplicate loading
  window.__googleMapsScriptLoading = promise;
  
  // Clean up the promise after it resolves or rejects
  promise.finally(() => {
    delete window.__googleMapsScriptLoading;
  });

  return promise;
}

class GoogleMapsService {
  private map: google.maps.Map | null = null;
  private directionsService: google.maps.DirectionsService | null = null;
  private directionsRenderers: google.maps.DirectionsRenderer[] = [];
  private isLoaded = false;

  async ensureLoaded(): Promise<void> {
    if (!this.isLoaded) {
      await loadGoogleMapsScript();
      this.isLoaded = true;
    }
  }

  async initMap(mapElement: HTMLElement, center?: { lat: number; lng: number }): Promise<google.maps.Map> {
    await this.ensureLoaded();
    
    this.map = new google.maps.Map(mapElement, {
      center: center || { lat: 40.7128, lng: -74.0060 }, // Default to NYC
      zoom: 13,
      styles: [
        {
          featureType: 'all',
          elementType: 'geometry',
          stylers: [{ color: '#1a2332' }]
        },
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#8ec3b9' }]
        },
        {
          featureType: 'all',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#1a2332' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#2c3e50' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#1a2332' }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#0f1821' }]
        }
      ],
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true
    });

    this.directionsService = new google.maps.DirectionsService();
    
    return this.map;
  }

  async geocodeAddress(address: string): Promise<Location> {
    await this.ensureLoaded();
    const geocoder = new google.maps.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          resolve({
            lat: location.lat(),
            lng: location.lng(),
            address: results[0].formatted_address
          });
        } else {
          reject(new Error(`Geocoding failed: ${status}`));
        }
      });
    });
  }

  async getRoutes(
    origin: string,
    destination: string,
    travelTime?: string
  ): Promise<RouteData[]> {
    await this.ensureLoaded();
    
    if (!this.directionsService) {
      throw new Error('Directions service not initialized');
    }

    // Clear previous route renderers
    this.directionsRenderers.forEach(renderer => renderer.setMap(null));
    this.directionsRenderers = [];

    const routes: RouteData[] = [];

    // Request routes with alternatives
    const request: google.maps.DirectionsRequest = {
      origin,
      destination,
      travelMode: google.maps.TravelMode.WALKING,
      provideRouteAlternatives: true,
      unitSystem: google.maps.UnitSystem.METRIC
    };

    return new Promise((resolve, reject) => {
      this.directionsService!.route(request, (result, status) => {
        if (status === 'OK' && result) {
          const routesData = result.routes.slice(0, 3); // Get up to 3 routes

          routesData.forEach((route, index) => {
            const leg = route.legs[0];
            const distance = leg.distance?.text || 'N/A';
            const duration = leg.duration?.text || 'N/A';

            // Calculate a base safety score (will be enhanced by Gemini AI)
            const safetyScore = this.calculateBaseSafetyScore(route, index);

            const routeData: RouteData = {
              id: `route-${index}`,
              name: index === 0 ? 'Safest Route' : index === 1 ? 'Balanced Route' : 'Fastest Route',
              type: index === 0 ? 'safe' : index === 1 ? 'balanced' : 'fastest',
              distance,
              duration,
              safetyScore,
              color: index === 0 ? 'safe' : index === 1 ? 'caution' : 'unsafe',
              polyline: route.overview_polyline,
              legs: route.legs,
              warnings: route.warnings || [],
              summary: route.summary
            };

            routes.push(routeData);

            // Render route on map
            if (this.map) {
              const renderer = new google.maps.DirectionsRenderer({
                map: this.map,
                directions: result,
                routeIndex: index,
                polylineOptions: {
                  strokeColor: this.getRouteColor(index),
                  strokeWeight: index === 0 ? 6 : 4,
                  strokeOpacity: index === 0 ? 0.8 : 0.6
                },
                suppressMarkers: false,
                markerOptions: {
                  visible: index === 0 // Only show markers for the first route
                }
              });

              this.directionsRenderers.push(renderer);
            }
          });

          // Fit map to show all routes
          if (this.map && result.routes[0]) {
            const bounds = new google.maps.LatLngBounds();
            result.routes[0].legs[0].steps.forEach(step => {
              bounds.extend(step.start_location);
              bounds.extend(step.end_location);
            });
            this.map.fitBounds(bounds);
          }

          resolve(routes);
        } else {
          reject(new Error(`Directions request failed: ${status}`));
        }
      });
    });
  }

  private calculateBaseSafetyScore(route: google.maps.DirectionsRoute, index: number): number {
    // Base score calculation (simplified)
    // In a real app, this would consider:
    // - Street lighting data
    // - Crime statistics
    // - Foot traffic patterns
    // - Time of day
    
    let score = 70; // Base score

    // Prefer routes with more steps (more populated areas)
    const steps = route.legs[0].steps.length;
    score += Math.min(steps / 2, 15);

    // Penalize routes with warnings
    score -= (route.warnings?.length || 0) * 5;

    // First route gets bonus (Google's recommended)
    if (index === 0) score += 10;
    if (index === 2) score -= 15; // Fastest route penalty

    return Math.max(50, Math.min(95, Math.round(score)));
  }

  private getRouteColor(index: number): string {
    const colors = [
      '#2EC4B6', // Safe - Teal
      '#F4D35E', // Caution - Yellow
      '#999999'  // Unsafe - Gray
    ];
    return colors[index] || colors[2];
  }

  highlightRoute(routeIndex: number) {
    this.directionsRenderers.forEach((renderer, index) => {
      const polylineOptions = renderer.getDirections()?.routes[index] ? {
        strokeColor: this.getRouteColor(index),
        strokeWeight: index === routeIndex ? 6 : 3,
        strokeOpacity: index === routeIndex ? 0.9 : 0.4
      } : undefined;

      if (polylineOptions) {
        renderer.setOptions({ polylineOptions });
      }
    });
  }

  async getCurrentLocation(): Promise<Location> {
    await this.ensureLoaded();
    
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Reverse geocode to get address
          const geocoder = new google.maps.Geocoder();

          geocoder.geocode(
            { location: { lat, lng } },
            (results, status) => {
              if (status === 'OK' && results && results[0]) {
                resolve({
                  lat,
                  lng,
                  address: results[0].formatted_address
                });
              } else {
                resolve({
                  lat,
                  lng,
                  address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`
                });
              }
            }
          );
        },
        (error) => {
          reject(new Error(`Geolocation error: ${error.message}`));
        }
      );
    });
  }

  clearRoutes() {
    this.directionsRenderers.forEach(renderer => renderer.setMap(null));
    this.directionsRenderers = [];
  }
}

export const googleMapsService = new GoogleMapsService();
