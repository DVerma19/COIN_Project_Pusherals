import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import * as turf from '@turf/turf';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const mapContainerRef = useRef(null);
  const [area, setArea] = useState(0); // State to hold the area of the polygon

  useEffect(() => {
    // Retrieve the stored area value from local storage
    const storedArea = localStorage.getItem('polygonArea');
    if (storedArea !== null) {
      setArea(parseFloat(storedArea)); // Initialize state with stored value
    }

    mapboxgl.accessToken = 'pk.eyJ1IjoibmlnaHQ1MzQwIiwiYSI6ImNsbzhrcnV6MDAydjIya25uZmd3cDZyaGYifQ.XU2Vf6GFyBITezb9gXHVdQ';
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.006, 40.7128],
      zoom: 9,
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      defaultMode: 'draw_polygon'
    });
    map.addControl(draw);

    map.on('draw.create', updateArea);
    map.on('draw.delete', updateArea);
    map.on('draw.update', updateArea);

    function updateArea(e) {
      const data = draw.getAll();
      if (data.features.length > 0) {
        const polygon = data.features[0];
        const calculatedArea = turf.area(polygon); // Use Turf to calculate the area
        console.log('Polygon Area:', calculatedArea); // Log the area to the console

        setArea(calculatedArea); // Update state with the new area
        localStorage.setItem('polygonArea', calculatedArea); // Save the area to local storage
      } else {
        setArea(0); // Reset area to zero if no polygon exists
        localStorage.setItem('polygonArea', 0); // Reset stored value in local storage
      }
    }

    return () => map.remove();
  }, []);

  return (
    <div>
      <div ref={mapContainerRef} id="map" style={{ width: '100%', height: '400px' }} />
      {area > 0 && <p>Area: {area.toFixed(2)} square meters</p>} {/* Display the calculated area */}
    </div>
  );
};

export default Map;





















/*import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
 
const Map = () => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmlnaHQ1MzQwIiwiYSI6ImNsbzhrcnV6MDAydjIya25uZmd3cDZyaGYifQ.XU2Vf6GFyBITezb9gXHVdQ'; // Replace with your API token
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11', // You can use other Mapbox styles
      center: [-74.006, 40.7128], // [longitude, latitude]
      zoom: 9, // Adjust the initial zoom level
    });
 
    return () => {
      map.remove(); // Clean up the map on unmount
    };
  }, []);
 
  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
};
 
export default Map;*/