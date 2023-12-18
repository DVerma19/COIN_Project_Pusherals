import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Button from "@mui/material/Button";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import { booleanContains, polygon } from "@turf/turf";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import axios from "axios"; // Import Axios
import { TextField, FormControl } from "@mui/material";

mapboxgl.accessToken =
  "pk.eyJ1IjoibmlnaHQ1MzQwIiwiYSI6ImNsbzhrcnV6MDAydjIya25uZmd3cDZyaGYifQ.XU2Vf6GFyBITezb9gXHVdQ"; // Replace with your Mapbox access token
const jyvaskylaCenter = [25.7446, 62.2415]; // Jyväskylä, Finland coordinates
const zoomLevel = 12; // Preferred zoom level

const MapWithDraw = () => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [draw, setDraw] = useState(null);
  const [selectedOption, setSelectedOption] = useState({
    crop: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [fetchedPolygons, setFetchedPolygons] = useState([]);

  const loadPolygonsFromAPI = async () => {
    try {
      const savedData = await localStorage.getItem("pusheralsUser");
      let parsedUser = JSON.parse(savedData)
      const response = await axios.get(`http://localhost:4000/user/getPolygons/${parsedUser.id}`);
      setFetchedPolygons(response.data.data);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  const handleDropdownChange = (event) => {
    setSelectedOption({
      ...selectedOption,
      crop: event.target.value,
    });
  };

  const handleDateChange = (event) => {
    setSelectedOption({
      ...selectedOption,
      date: event.target.value,
    });
  };


  const sendToBackend = () => {
    if (draw && map) {
      const data = draw.getAll();
      const savedData = localStorage.getItem("pusheralsUser");
      let parsedUser = JSON.parse(savedData)
      // Example fetch request
      axios
        .post("http://localhost:4000/user/savePolygon", {
          selectedOption,
          data,
          id: parsedUser.id,
        })
        .then((response) => {
          console.log("Data sent to backend:", response.data);
          toast.success("Data saved successfully!", { autoClose: 3000 });
          loadPolygonsFromAPI();

          // Add any additional logic here based on the backend response
        })
        .catch((error) => {
          console.error("Error sending data to backend:", error);
        });
    }
  };

  const jyvaskylaBoundary = polygon([
    [
      [25.6701, 62.2603],
      [25.8191, 62.2603],
      [25.8191, 62.2226],
      [25.6701, 62.2226],
      [25.6701, 62.2603],
    ], // Define the boundary of Jyväskylä
  ]);

  // // Load polygons from localStorage
  // const loadPolygons = () => {
  //   const savedData = localStorage.getItem("polygons");
  //   return savedData ? JSON.parse(savedData) : [];
  // };

  // Save polygons to localStorage
  const savePolygons = () => {
    if (draw && map) {
      const data = draw.getAll();
      localStorage.setItem("polygons", JSON.stringify(data));
      alert("Polygons saved!");
    }
  };

  // Check if polygon is within Jyväskylä boundary
  const isPolygonWithinBoundary = (polygon) => {
    return booleanContains(jyvaskylaBoundary, polygon);
  };

  const recenterMap = () => {
    if (map) {
      map.flyTo({
        center: jyvaskylaCenter,
        zoom: zoomLevel,
      });
    }
  };

  useEffect(() => {
    // Fetch polygons from the API on the first load
    loadPolygonsFromAPI();
  }, []); // Run the effect only once on mount

  const loadPolygons = () => {
    let parsedPolygons = fetchedPolygons[0]?.features[0];
    console.log("parsed: ", parsedPolygons)
    return parsedPolygons;
  };

  useEffect(() => {
    // Initialize the map
    const initialMap = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v9", // Mapbox style
      center: [25.7446, 62.2415], // Jyväskylä, Finland coordinates
      zoom: 12,
    });

    // Add drawing tools
    const initialDraw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
    });
    initialMap.addControl(initialDraw);

    setMap(initialMap);
    setDraw(initialDraw);

    // Load saved polygons
    initialMap.on("load", () => {
      const polygons = loadPolygons();
      if (polygons?.features?.length > 0) {
        initialDraw.set(polygons);
      }
    });

    initialMap.on("draw.create", (e) => {
      const polygon = e.features[0];
      if (!isPolygonWithinBoundary(polygon)) {
        alert("Polygon is outside Jyväskylä boundary. It will be removed.");
        initialDraw.delete(polygon.id);
      }
    });

    // Clean up on unmount
    return () => initialMap.remove();
  }, []);

  return (
    <div>
      <div ref={mapContainerRef} style={{ height: 400 }} />
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          <FormControl>
            <Select value={selectedOption.crop} onChange={handleDropdownChange}>
              <MenuItem value="wheat">Wheat</MenuItem>
              <MenuItem value="potato">Potato</MenuItem>
              <MenuItem value="rice">Rice</MenuItem>
              <MenuItem value="corn">Corn</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </FormControl>
          <FormControl>
            <TextField
              type="date"
              style={{ marginLeft: "10px" }}
              value={selectedOption.date}
              onChange={handleDateChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>
          <Button
            variant="outlined"
            color="success"
            onClick={sendToBackend}
            style={{ marginLeft: "10px" }}
            disabled={!selectedOption}
          >
            Save Boundary
          </Button>
        </div>
        <Button variant="outlined" color="primary" onClick={recenterMap}>
          Recenter to Jyväskylä
        </Button>
      </div>
    </div>
  );
};

export default MapWithDraw;
