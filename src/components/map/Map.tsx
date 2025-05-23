import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapComponentProps {
  selectedLocation: { lat: number; lng: number; address: string } | null;
  setSelectedLocation: (location: { lat: number; lng: number; address: string } | null) => void;
  accessToken: string;
}

const MapComponent = ({ selectedLocation, setSelectedLocation, accessToken }: MapComponentProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markerRef = useRef<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: selectedLocation ? [selectedLocation.lng, selectedLocation.lat] : [0, 0],
      zoom: selectedLocation ? 14 : 2,
      accessToken: accessToken
    });

    mapRef.current = map;

    // Add controls
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserLocation: true
      })
    );

    // Add marker if selectedLocation exists
    if (selectedLocation) {
      addMarker(selectedLocation.lng, selectedLocation.lat);
    }

    // Handle map clicks
    map.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      addMarker(lng, lat);
      
      // Reverse geocode to get address
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}`)
        .then(res => res.json())
        .then(data => {
          const address = data.features[0]?.place_name || 'Selected location';
          setSelectedLocation({
            lat,
            lng,
            address
          });
        });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [accessToken]);

  const addMarker = (lng: number, lat: number) => {
    if (!mapRef.current) return;
    
    // Remove existing marker
    if (markerRef.current) {
      markerRef.current.remove();
    }
    
    // Add new marker
    markerRef.current = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(mapRef.current);
  };

  return (
    <div className="space-y-4">
      {selectedLocation && (
        <div className="p-3 bg-gray-50 rounded-lg">
          <p className="font-medium">Selected Location:</p>
          <p>{selectedLocation.address}</p>
          <p className="text-sm text-gray-500">
            Latitude: {selectedLocation.lat.toFixed(6)}, Longitude: {selectedLocation.lng.toFixed(6)}
          </p>
        </div>
      )}
      <div ref={mapContainerRef} className="h-96 w-full rounded-lg" />
    </div>
  );
};

export default MapComponent;