import React, { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ChartComponent = ({ title }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedData = await localStorage.getItem("pusheralsUser");
        const parsedUser = JSON.parse(savedData);
        const userId = parsedUser.id;

        const response = await axios.get(`http://localhost:4000/user/finalDataset/crops/${userId}`);
        const fetchedData = response.data;

        console.log(fetchedData)
        processChartData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const processChartData = (data) => {
    const categories = data.map(item => item.cropName);
    const series = [
      {
        name: 'Avg Temperature',
        visible: false,
        data: data.map(item => parseFloat(item.avgTemperature)),
      },
      {
        name: 'Ideal Field Capacity',
        visible: false,
        data: data.map(item => parseFloat(item.idealFieldCapacity)),
      },
      {
        name: 'Ideal Soil Moisture',
        visible: false,
        data: data.map(item => parseFloat(item.idealSoilMoisture)),
      },
      {
        name: 'Ideal Soil Roughness Threshold',
        data: data.map(item => parseFloat(item.idealSoilRoughnessThreshold)),
      },
      {
        name: 'Max Months',
        visible: false,
        data: data.map(item => parseFloat(item.maxMonths)),
      },
      {
        name: 'Min Months',
        visible: false,
        data: data.map(item => parseFloat(item.minMonths)),
      },
      {
        name: 'Soil Roughness',
        data: data.map(item => parseFloat(item.soilRoughness)),
      },
      {
        name: 'Stage Number',
        visible: false,
        data: data.map(item => parseFloat(item.stageNumber)),
      },
      {
        name: 'User Field Capacity',
        visible: false,
        data: data.map(item => parseFloat(item.userFieldCapacity)),
      },
      // You can add more series based on the data you have.
    ];
  
    setChartData({ categories, series });
  };

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: title,
    },
    xAxis: {
      categories: chartData.categories,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Value',
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                   '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        dataLabels: {
          enabled: true
        }
      },
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f}'
        }
      }
    },
    series: chartData.series,
  };

  if (!chartData.categories || !chartData.series) {
    return <div>Loading...</div>;
  }

  return (
    <Card sx={{ marginBottom: "16px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
