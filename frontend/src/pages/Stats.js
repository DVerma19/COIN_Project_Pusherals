import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CustomAppBar from "../components/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import ChartComponent from "../components/LineChart";
import FloodPrediction from "../components/FloodPrediction";
import YieldPrediction from "../components/Yield"

const chartData1 = [
  { name: "Jan", value: 2400 },
  { name: "Feb", value: 1398 },
  { name: "Mar", value: 9800 },
  // Add more data points as needed
];

const chartData2 = [
  { name: "Jan", value: 1200 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 6000 },
  // Add more data points as needed
];

const chartData3 = [
  { name: "Jan", value: 5000 },
  { name: "Feb", value: 8000 },
  { name: "Mar", value: 12000 },
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

const Stats = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <CustomAppBar />
      <Box
        sx={{
          my: 4,
          mt: 12,
          //   backgroundColor: "#f5f5f5", // Light gray background
          //   padding: "16px",
          //   minWidth: '100vh'
        }}
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="#ffffff"
          style={{
            backgroundColor: "#2e7d32",
            borderRadius: "8px",
          }}
        >
          <Tab
            label="Crop Information"
            sx={{ color: value === 0 ? "#2CD6F4" : "#ffffff" }}
          />
          <Tab
            label="Flood Predictions"
            sx={{ color: value === 1 ? "#2CD6F4" : "#ffffff" }}
          />
          <Tab
            label="Yield Predictions"
            sx={{ color: value === 1 ? "#2CD6F4" : "#ffffff" }}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Box
            sx={{
              minWidth: "100vh",
            }}
          >
            <ChartComponent data={chartData1} />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box
            sx={{
              minWidth: "100vh",
            }}
          >
            <FloodPrediction />
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Box
            sx={{
              minWidth: "100vh",
            }}
          >
            <YieldPrediction />
          </Box>
        </TabPanel>
      </Box>
    </Container>
  );
};

export default Stats;
