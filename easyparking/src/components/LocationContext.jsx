// src/context/LocationContext.js
import React, { createContext, useContext, useState } from 'react';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [currentPos, setCurrentPos] = useState({ lat: 1.364917, lng: 103.822872 });

  return (
    <LocationContext.Provider value={{ currentPos, setCurrentPos }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}
