//import { useState } from 'react' 
import './App.css'
//import CurrentLocationMap from './components/CurrentLocationMap'
import ShowCurrentLocation from './components/ShowCurrentLocation'
import GetWeather from './components/GetWeather'
import { LocationProvider } from './components/LocationContext'
 
const DEFAULT_POSITION = { lat: 1.364917, lng: 103.822872 };


function App() {   

  return (
    <LocationProvider>
      <h1>Easy Parking Singapore</h1>
      {/*<CurrentLocationMap/>*/}
      <ShowCurrentLocation position={DEFAULT_POSITION} />
      <GetWeather  />

    <p>Created by NTU students SE10 Group-1, 2025</p> 

    </LocationProvider>
  )
}

export default App
