import React, { useState, useEffect } from "react"

import Trip from "./../classes/Trip";
import Data from "./../classes/Data";

const App = () => {
  const [route, setRoute] = useState({});
  const [data, setData] = useState(Data.load());
  const [vehicleRef, setVehicleRef] = useState();


  const startTripClicked = (e) => {
    console.log("Start Trip Clicked!");
    let startTime = Date.now();

    let trip = new Trip(route, startTime, Trip.getDefaultEndTime(startTime), vehicleRef);
    data.addTrip(trip);
  }

  const endTripClicked = () => {
    data.endCurrentTrip();
  }

  const routes = ["1", "110", "111", "112", "113", "114", "115", "12",
    "120", "121", "12e", "13", "130", "14", "145", "150", "154", "160", "17",
    "170", "17e", "18", "18e", "19", "19e", "2", "20", "200", "201", "202", "203", "204",
    "206", "21", "210", "22", "220", "226", "23", "230", "236", "23e", "23z", "24", "25",
    "250", "251", "26", "260", "261", "262", "264", "27", "28", "280", "281", "29", "290",
    "291", "29e", "3", "300", "30x", "31x", "32x", "33", "34", "35", "36", "37", "52", "56",
    "57", "58", "60", "60e", "7", "81", "83", "84", "85x", "CCL", "HVL", "JVL", "KPL", "MEL",
    "N1", "N2", "N22", "N3", "N4", "N5", "N6", "N66", "N8", "N88", "WHF", "WRL"]

  const routeIdChanged = (event) => {
    // console.log("Route Id Changed: ");
    const route = event.target.value;
    setRoute(route);
    fetch(`api/v1/${route}`)
      .then(res => { return res.json() })
      .then(json => {
        const services = json.Services;
        //setVehicleRef(json.Services.VehicleRef);
        setMyMatchingVehicle(services);
      });
  }

  const setMyMatchingVehicle = (services) => {
    // TO DO ------ Must select the correct vehicle
    const matchedService = services[0];

    setVehicleRef(matchedService.VehicleRef);
  }

  return (
    <div>
      <h1>COVID Tracker For Transit</h1>
      <select id="routeId" onChange={routeIdChanged}>
        {routes.map((route, key) => {
          return (
            <option key={key} value={route}>{route}</option>
          )
        })}
      </select>
      <button onClick={startTripClicked}>Start Trip</button>

      <button onClick={endTripClicked}>End Trip</button>
    </div>
  )
}

export default App