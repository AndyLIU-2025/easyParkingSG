import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const CurrentLocationMap = () => {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        alert('Geolocation failed: ' + error.message);
      }
    );
  }, []);

  useEffect(() => {
    if (location && mapRef.current && !mapRef.current._leaflet_id) {
      const map = L.map(mapRef.current).setView([location.lat, location.lon], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      L.marker([location.lat, location.lon])
        .addTo(map)
        .bindPopup('You are here!')
        .openPopup();
    }
  }, [location]);

  return (
    <div style={{ height: '100vh', width: '100%' }} ref={mapRef} />
  );
};

export default CurrentLocationMap;
