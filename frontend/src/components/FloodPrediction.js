

import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Flood Predictions",
    },
  },
  annotation: {
    annotations: [
      {
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y',
        value: 6,
        borderColor: 'rgba(255, 0, 0, 0.7)',
        borderWidth: 2,
        label: {
          content: 'Max Value (18)',
          enabled: true,
          position: 'right',
        },
      },
    ],
  },
};

const ChartComponent = ({ title }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/getFloods"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: data.data.data.time,
    datasets: [
      {
        label: "River Discharge m³/s",
        data: data.data.data.river_discharge.map((item) => item),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Mean River Discharge m³/s",
        data: data.data.data.river_discharge_mean.map((item) => item),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Median River Discharge m³/s",
        data: data.data.data.river_discharge_median.map((item) => item),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Max River Discharge m³/s",
        data: data.data.data.river_discharge_max.map((item) => item),
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: "rgba(255, 205, 86, 0.5)",
      },
      {
        label: "Min River Discharge m³/s",
        data: data.data.data.river_discharge_min.map((item) => item),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Card sx={{ marginBottom: "16px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Line options={options} data={chartData} />
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
