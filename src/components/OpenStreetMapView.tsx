import { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Route {
  id: string;
  name: string;
  coordinates?: [number, number][];
  color?: string;
}

interface OpenStreetMapViewProps {
  routes?: Route[];
  selectedRoute?: Route | null;
}

function MapUpdater({ routes }: { routes: Route[] }) {
  const map = useMap();

  useEffect(() => {
    const allCoordinates = routes.flatMap((route) => route.coordinates || []);

    if (allCoordinates.length > 0) {
      map.fitBounds(L.latLngBounds(allCoordinates), { padding: [30, 30] });
    }
  }, [map, routes]);

  return null;
}

const startIcon = L.divIcon({
  className: 'route-marker',
  html: '<div style="background:#16a34a;width:16px;height:16px;border:3px solid white;border-radius:50%;box-shadow:0 1px 5px #555"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const endIcon = L.divIcon({
  className: 'route-marker',
  html: '<div style="background:#dc2626;width:16px;height:16px;border:3px solid white;border-radius:50%;box-shadow:0 1px 5px #555"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

export function OpenStreetMapView({
  routes = [],
  selectedRoute,
}: OpenStreetMapViewProps) {
  const allCoordinates = routes.flatMap((route) => route.coordinates || []);
  const initialPosition: [number, number] =
    allCoordinates[0] || [17.385, 78.4867];

  return (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden rounded-lg">
      <MapContainer
        center={initialPosition}
        zoom={12}
        scrollWheelZoom
        className="w-full h-full min-h-[400px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {routes.map((route, index) => {
          const isSelected = selectedRoute?.id === route.id;

          if (!route.coordinates?.length) return null;

          return (
            <Polyline
              key={route.id}
              positions={route.coordinates}
              pathOptions={{
                color: route.color || ['#2EC4B6', '#F4D35E', '#999999'][index % 3],
                weight: isSelected ? 7 : 4,
                opacity: isSelected ? 0.95 : 0.65,
              }}
            />
          );
        })}

        {allCoordinates.length > 0 && (
          <>
            <Marker position={allCoordinates[0]} icon={startIcon}>
              <Popup>Route start</Popup>
            </Marker>

            <Marker
              position={allCoordinates[allCoordinates.length - 1]}
              icon={endIcon}
            >
              <Popup>Route destination</Popup>
            </Marker>
          </>
        )}

        <MapUpdater routes={routes} />
      </MapContainer>
    </div>
  );
}