import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ChartComponent = ({ title }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user/getFloods");
        const data = response.data;
        processChartData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const processChartData = (data) => {
    const categories = data.data.data.time.map(e => e.slice(5).replace("-", "/"));
    console.log("categories; ", categories);
    const series = [
      {
        name: 'River Discharge m³/s',
        visible: false,
        data: data.data.data.river_discharge,
        color: 'rgb(255, 99, 132)'
      },
      {
        name: 'Mean River Discharge m³/s',
        visible: false,
        data: data.data.data.river_discharge_mean,
        color: 'rgb(53, 162, 235)'
      },
      {
        name: 'Median River Discharge m³/s',
        visible: false,
        data: data.data.data.river_discharge_median,
        color: 'rgb(75, 192, 192)'
      },
      {
        name: 'Max River Discharge m³/s',
        data: data.data.data.river_discharge_max,
        color: 'rgb(255, 205, 86)'
      },
      {
        name: 'Min River Discharge m³/s',
        data: data.data.data.river_discharge_min,
        color: 'rgb(54, 162, 235)'
      }
    ];
    

    setChartData({
      xAxis: {
        categories
      },
      series
    });
  };

  const options = {
    chart: {
      type: 'area'
    },
    title: {
      text: title
    },
    yAxis: {
      title: {
        text: 'Discharge m³/s'
      },
      max: 25,
      plotLines: [{
        color: 'black',
        width: 2,
        value: 22,
        animation: {
            duration: 1000,
            defer: 4000
        },
        label: {
            text: 'Flood Warning',
            align: 'right',
            x: -20
        }
    }]
    },
    plotOptions: {
      line: {
        marker: {
          enabled: false
        }
      }
    },
    ...chartData // Spread the chartData into the options
  };

  if (!chartData) {
    return <div>Loading...</div>;
  }

  return (
    <Card sx={{ marginBottom: '16px' }}>
      <CardContent>
        <Typography variant='h6' gutterBottom>
          {title}
        </Typography>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
