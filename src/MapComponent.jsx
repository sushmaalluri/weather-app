import React, { useEffect, useRef, useState } from 'react';

const MapComponent = ({ city, weather }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // Load Google Maps script
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBmeDpDyWo4LYIWbu8ZzwcW6M5d8FhoYKY`;
      script.async = true;
      script.defer = true;
      script.onload = () => setIsScriptLoaded(true);
      document.head.appendChild(script);
    } else {
      setIsScriptLoaded(true);
    }
  }, []);

  // Initialize and update map
  useEffect(() => {
    if (!city || !weather || !isScriptLoaded) return;

    const position = { lat: weather.coord.lat, lng: weather.coord.lon };

    if (mapInstanceRef.current) {
      // Update existing map
      mapInstanceRef.current.setCenter(position);
      
      // Update or create marker
      if (markerRef.current) {
        markerRef.current.setPosition(position);
      } else {
        markerRef.current = new window.google.maps.Marker({
          position: position,
          map: mapInstanceRef.current,
          title: city
        });
      }
    } else {
      // Create new map
      const map = new window.google.maps.Map(mapRef.current, {
        center: position,
        zoom: 12,
      });

      // Create new marker
      markerRef.current = new window.google.maps.Marker({
        position: position,
        map: map,
        title: city
      });

      mapInstanceRef.current = map;
    }

    // Cleanup function
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [city, weather, isScriptLoaded]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '400px', 
        marginTop: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    />
  );
};

export default MapComponent; 