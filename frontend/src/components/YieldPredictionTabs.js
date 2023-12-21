// AdditionalTabs.js
import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomAppBar from "../components/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import SoilTemperature from "../components/predictionTabs/soilTemperature";
import FieldCapacity from "../components/predictionTabs/fieldCapacity";
import SoilMoisture from "../components/predictionTabs/soilMoisture";
import SoilRoughness from "../components/predictionTabs/soilRoughness";
import Analytics from "../components/predictionTabs/analytics";
import axios from "axios";
// import ScrollableTabsButtonAuto from "@mui/material/ScrollableTabsButtonAuto";


const chartData4 = [
  { name: "Jan", value: 3000 },
  { name: "Feb", value: 5000 },
  { name: "Mar", value: 8000 },
  // Add more data points as needed
];
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const AdditionalTabs = ({title}) => {
  const [value, setValue] = useState(0);
  const [chartData, setChartData] = useState([]);

  const loadData = async () => {
    try {
      const savedData = await localStorage.getItem("pusheralsUser");
      let parsedUser = JSON.parse(savedData);
      const response = await axios.get(
        `http://localhost:4000/user/soilTemperature/${parsedUser.id}`
      );
      setChartData(response.data);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  useEffect(() => {
    // Fetch polygons from the API on the first load
    loadData();
  }, []); // Run the effect only once on mount


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!chartData.length) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <CustomAppBar />
      <Box
        sx={{
          my: 4,
          mt: 6,
          //   backgroundColor: "#f5f5f5", // Light gray background
          //   padding: "16px",
          //   minWidth: '100vh'
        }}
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
      >
        {/* <ScrollableTabsButtonAuto> */}
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="#ffffff"
          style={{
            backgroundColor: "#2e7d32",
            borderRadius: "8px",
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab
            label="Soil Temperature Yield"
            sx={{ color: value === 0 ? "#2CD6F4" : "#ffffff" }}
          />
          <Tab
            label="Field Capacity Yield"
            sx={{ color: value === 1 ? "#2CD6F4" : "#ffffff" }}
          />
          <Tab
            label="Soil Moisture Yield"
            sx={{ color: value === 2 ? "#2CD6F4" : "#ffffff" }}
          />
           <Tab
            label="Soil Roughness Yield"
            sx={{ color: value === 3 ? "#2CD6F4" : "#ffffff" }}
          />
           <Tab
            label="Analytics"
            sx={{ color: value === 4 ? "#2CD6F4" : "#ffffff" }}
          />
        </Tabs>
        {/* </ScrollableTabsButtonAuto> */}
        <TabPanel value={value} index={0}>
          <Box
            sx={{
              minWidth: "100vh",
            }}
          >
            <SoilTemperature data={chartData} />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            sx={{
              minWidth: "100vh",
            }}
          >
            <FieldCapacity data={chartData}/>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box
            sx={{
              minWidth: "100vh",
            }}
          >
            <SoilMoisture data={chartData}/>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Box
            sx={{
              minWidth: "100vh",
            }}
          >
            <SoilRoughness data={chartData}/>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Box
            sx={{
              minWidth: "100vh",
            }}
          >
            <Analytics data={chartData}/>
          </Box>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default AdditionalTabs;
