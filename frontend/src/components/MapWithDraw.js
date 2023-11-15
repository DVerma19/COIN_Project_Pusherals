import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import Button from '@mui/material/Button';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';


mapboxgl.accessToken = 'pk.eyJ1IjoibmlnaHQ1MzQwIiwiYSI6ImNsbzhrcnV6MDAydjIya25uZmd3cDZyaGYifQ.XU2Vf6GFyBITezb9gXHVdQ'; // Replace with your Mapbox access token
const MapWithDraw = () => {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [draw, setDraw] = useState(null);

    // Load polygons from localStorage
    const loadPolygons = () => {
        const savedData = localStorage.getItem('polygons');
        return savedData ? JSON.parse(savedData) : [];
    };

    // Save polygons to localStorage
    const savePolygons = () => {
        if (draw && map) {
            const data = draw.getAll();
            localStorage.setItem('polygons', JSON.stringify(data));
            alert('Polygons saved!');
        }
    };

    useEffect(() => {
        // Initialize the map
        const initialMap = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v9', // Mapbox style
            center: [25.7446, 62.2415], // Jyväskylä, Finland coordinates
            zoom: 12
        });

        // Add drawing tools
        const initialDraw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            }
        });
        initialMap.addControl(initialDraw);

        setMap(initialMap);
        setDraw(initialDraw);

        // Load saved polygons
        initialMap.on('load', () => {
            const polygons = loadPolygons();
            if (polygons.features?.length > 0) {
                initialDraw.set(polygons);
            }
        });

        // Clean up on unmount
        return () => initialMap.remove();
    }, []);

    return (
        <div>
            <div ref={mapContainerRef} style={{ height: 400 }} />
            <Button variant="outlined" color="success" onClick={savePolygons} style={{ marginTop: '10px' }}>Save Boundary</Button>

        </div>
    );
};

export default MapWithDraw;