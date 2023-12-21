import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {fieldCapacityPredict} from "../../utils/index";

const ChartComponent = ({ title, data }) => {
    const [cropType, setCropType] = useState("");
    const [types, setTypes] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let cropsTitle = data.map(e => e[0]['Crop_Names']);
        setTypes(cropsTitle);
        setCropType(cropsTitle[0]);
        let formattedData = fieldCapacityPredict(data[0]);
        processChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDropdownChange = (event) => {
    setCropType(event.target.value);
    let index = types.indexOf(event.target.value)
    let formattedData = fieldCapacityPredict(data[index]);
    processChartData(formattedData)
  };

  const processChartData = (data) => {
    console.log("Data: ", data)
    const categories = data.map(e => e.Date);
    const series = [
      {
        name: 'Predicted Yield',
        data: data.map(e => e.PredictedYield),
        color: 'rgb(255, 99, 132)'
      },
      {
        name: 'Practical Max',
        data: data.map(e => e.PracticalMax),
        color: 'rgb(53, 162, 235)'
      },
      {
        name: 'Ideal Yield',
        data: data.map(e => e.IdealYield),
        color: 'rgb(75, 192, 192)'
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
      type: 'column'
    },
    title: {
      text: title
    },
    yAxis: {
      title: {
        text: 'Yield'
      },
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
        <TextField
          select
          label="Select Crop Type"
          value={cropType}
          onChange={handleDropdownChange}
          sx={{ marginBottom: '16px' }}
        >
            {types.map(e => {
                return <MenuItem value={e}>{e}</MenuItem>
            })}
        </TextField>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </CardContent>
    </Card>
  );
};

export default ChartComponent;
