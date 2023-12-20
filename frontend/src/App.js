import React, { useEffect, useRef, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import ProTip from "./components/ProTip";
import Card from "./components/Card";
import MapWithDraw from "./components/MapWithDraw";
import CustomAppBar from "./components/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import axios from "axios";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      paddingTop="30px"
    >
      {"Copyright © "}
      <Link color="inherit" href="https://google.com/">
        Pusherals
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function App() {
  const [fetchedPolygons, setFetchedPolygons] = useState([]);
  const [loading, setLoading] = useState(true); // Introduce loading state

  const loadPolygonsFromAPI = async () => {
    try {
      const savedData = await localStorage.getItem("pusheralsUser");
      let parsedUser = JSON.parse(savedData);
      const response = await axios.get(
        `http://localhost:4000/user/getPolygons/${parsedUser.id}`
      );
      setFetchedPolygons(response.data.data);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    } finally {
      setLoading(false); // Set loading to false when the API call is finished
    }
  };

  useEffect(() => {
    // Fetch polygons from the API on the first load
    loadPolygonsFromAPI();
  }, []); // Run the effect only once on mount

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator while fetching data
  }
  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <CustomAppBar />
      <Box
        sx={{ my: 4, mt: 12 }}
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Pusherals - Dashboard
        </Typography>
        <ProTip />
        <Card>
          <MapWithDraw
            fetchedPolygons={fetchedPolygons}
            setFetchedPolygons={setFetchedPolygons}
            loadPolygonsFromAPI={loadPolygonsFromAPI}
          />
        </Card>
        <Copyright />
      </Box>
    </Container>
  );
}
