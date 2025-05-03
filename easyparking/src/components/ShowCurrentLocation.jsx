import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './ShowCurrentLocation.module.css';
import { useLocation } from './LocationContext'

export default function ShowCurrentLocation() {
    const mapRef = useRef(null);
    const leafletMap = useRef(null);
    const markerRef = useRef(null);
    const { currentPos, setCurrentPos } = useLocation();
  
    useEffect(() => {
      if (!mapRef.current) return;
  
      leafletMap.current = L.map(mapRef.current).setView([currentPos.lat, currentPos.lng], 15);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(leafletMap.current);
  
      markerRef.current = L.marker([currentPos.lat, currentPos.lng], { draggable: true })
        .addTo(leafletMap.current)
        .bindPopup('Drag me!')
        .openPopup();
  
      markerRef.current.on('dragend', () => {
        const { lat, lng } = markerRef.current.getLatLng();
        setCurrentPos({ lat, lng });
      });
  
      return () => leafletMap.current.remove();
    }, []);
  
    const resetToDefault = () => {
      const defaultPos = { lat: 1.364917, lng: 103.822872 };
      markerRef.current.setLatLng([defaultPos.lat, defaultPos.lng]);
      leafletMap.current.setView([defaultPos.lat, defaultPos.lng], 15);
      setCurrentPos(defaultPos);
    };
  
    const getCurrentLocation = () => {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported');
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const newPos = { lat: latitude, lng: longitude };
          markerRef.current.setLatLng([latitude, longitude]);
          leafletMap.current.setView([latitude, longitude], 15);
          setCurrentPos(newPos);
        },
        () => alert('Unable to retrieve your location')
      );
    };
  
    return (
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <h4>Marker Position</h4>
            <p>
              Lat: <strong>{currentPos.lat.toFixed(6)}</strong><br />
              Lng: <strong>{currentPos.lng.toFixed(6)}</strong>
            </p>
          </div>
          <div className={styles.sidebarButtons}>
            <button onClick={resetToDefault} className={styles.button}>
              Reset to Default Location
            </button>
            <button onClick={getCurrentLocation} className={styles.button}>
              Get Current Location
            </button>
          </div>
        </div>
  
        <div ref={mapRef} className={styles.mapContainer} />
      </div>
    );
  }
