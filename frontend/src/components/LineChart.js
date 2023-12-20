// ChartComponent.js
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Grouped Bar Chart",
    },
  },
};

const ChartComponent = ({ title }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user ID from local storage
        const savedData = await localStorage.getItem("pusheralsUser");
        const parsedUser = JSON.parse(savedData);
        const userId = parsedUser.id;

        // Fetch data from the backend using the user ID
        const response = await axios.get(
          `http://localhost:4000/user/finalDataset/crops/${userId}`
        );
        setData(response.data); // Assuming the response format matches your data structure
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  // Function to group data by Crop_Names
  const groupedData = data.reduce((result, record) => {
    const cropName = record.Crop_Names;
    if (!result[cropName]) {
      result[cropName] = [];
    }
    result[cropName].push(record);
    return result;
  }, {});

  const colors = [
    "rgb(255, 99, 132)",
    "rgb(75, 192, 192)",
    "rgb(53, 162, 235)",
  ];

  // const labels = [
  //   "Growth_Stage",
  //   "Avg_Temperature",
  //   "User_Field_Capacity",
  //   "Ideal_Field_Capacity",
  //   "Ideal_Soil_Roughness_Threshold",
  //   "Max_Months",
  //   "Soil_Roughness",
  // ];

  const labels = [
    "avgTemperature",
    "idealFieldCapacity",
    "idealSoilMoisture",
    "idealSoilRoughnessThreshold",
    "maxMonths",
    "minMonths",
    "soilRoughness",
    "stageIdentifier",
    "stageNumber",
    "type",
    "userFieldCapacity",
  ];

  // Preparing datasets for the chart
  const datasets = data.map((item, index) => ({
    label: item.cropName,
    data: labels.map((label) => item[label]),
    backgroundColor: colors[index % colors.length], // Use the colors in a cyclic manner
  }));

  return (
    <Card sx={{ marginBottom: "16px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Bar
          options={options}
          data={{
            labels: [
              "avgTemperature",
              "idealFieldCapacity",
              "idealSoilMoisture",
              "idealSoilRoughnessThreshold",
              "maxMonths",
              "minMonths",
              "soilRoughness",
              "stageIdentifier",
              "stageNumber",
              "type",
              "userFieldCapacity",
            ],
            datasets,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
