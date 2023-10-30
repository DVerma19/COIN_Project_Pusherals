import React, { useEffect } from 'react';
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
 
export default Map;