import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-moment';


const CropChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      const chartInstance = chartRef.current?.chartInstance;
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  const cropData = [
    {
      Crop_Names: "Barley",
      Growth_Stage: 1,
      Avg_Temperature: 11.4,
      User_Field_Capacity: 9.97,
      Ideal_Field_Capacity: 12,
      Ideal_Soil_Roughness_Threshold: 60,
      Ideal_Soil_Moisture: 0.3,
      Type: "Cold",
      User_Soil_Roughness: 52,
      User_Soil_Moisture: 0.2,
      User_Temperature: 10.8,
      Date: "2023-12-01"
    },
    {
        Crop_Names: "Barley",
        Growth_Stage: 2,
        Avg_Temperature: 11.4,
        User_Field_Capacity: 9.97,
        Ideal_Field_Capacity: 12,
        Ideal_Soil_Roughness_Threshold: 60,
        Ideal_Soil_Moisture: 0.3,
        Type: "Cold",
        User_Soil_Roughness: 52,
        User_Soil_Moisture: 0.2,
        User_Temperature: 10.8,
        Date: "2023-12-01"
      },
    // ... (other data entries)
  ];

  const weights = {
    Growth_Stage: -0.0082,
    Avg_Temperature: 0.0499,
    User_Field_Capacity: -6.996,
    Ideal_Field_Capacity: 8.845,
    Ideal_Soil_Roughness_Threshold: -0.0366,
    Min_Months: 0.0206,
    Max_Months: -0.0179,
    Soil_Roughness: -0.9679
  };

  const calculateWeightedSum = (row, weights) => {
    return Object.keys(weights).reduce((sum, key) => {
      if (row.hasOwnProperty(key)) {
        return sum + row[key] * weights[key];
      }
      return sum;
    }, 0);
  };

  const calculatePercentYield = (weightedSum) => {
    const normalizedYield = (weightedSum + 100) / 2;
    return Math.min(normalizedYield, 100);
  };

  const generateChartData = (cropData, weights) => {
    return cropData.map(row => {
      const weightedSum = calculateWeightedSum(row, weights);
      const percentYield = calculatePercentYield(weightedSum);

      return {
        date: new Date(row.Date),
        percentYield,
      };
    });
  };

  const [selectedFactors, setSelectedFactors] = useState(Object.keys(weights));
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const newChartData = generateChartData(cropData, weights);
    setChartData(newChartData);
  }, [cropData, weights, selectedFactors]);

  const handleFactorToggle = (factor) => {
    setSelectedFactors(prevFactors =>
      prevFactors.includes(factor)
        ? prevFactors.filter(f => f !== factor)
        : [...prevFactors, factor]
    );
  };

  const chartLabels = chartData.map(entry => entry.date);
  const chartValues = chartData.map(entry => entry.percentYield);


  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Yield',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        data: chartValues,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        // data: chartValues,
      },
    ],
  };

  const options = {
    scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
            tooltipFormat: 'll' // Moment.js date format (e.g., 'll' for 'Sep 4, 1986')
          }
        },
        y: {
          beginAtZero: true
        }
      },
    // Other chart options
  };
  return (
    <div>
      <h2>Yield Chart</h2>
      <div>
        {Object.keys(weights).forEach(factor => (
          <label key={factor}>
            <input
              type="checkbox"
              checked={selectedFactors.includes(factor)}
              onChange={() => handleFactorToggle(factor)}
            />
            {factor}
          </label>
        ))}
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default CropChart;