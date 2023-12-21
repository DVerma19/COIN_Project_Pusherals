export const soilTempYieldPredict = (cropData) => {
  const soiltempRatio = {};
  cropData.forEach((entry) => {
    const { Date, User_Temperature, Avg_Temperature } = entry;
    let Avg_Temperature_Weight = 0.02;
    let userTemperatureWeight =
      Avg_Temperature_Weight * (Math.abs(User_Temperature) / Math.abs(Avg_Temperature));
    const ratio = userTemperatureWeight / Avg_Temperature_Weight;
    soiltempRatio[Date] = ratio;
  });
  let transformedData = Object.entries(soiltempRatio).map(
    ([date, predictedYield]) => {
      const practicalMax = 0.95;
      const idealYield = 1;

      return {
        Date: date,
        PredictedYield: predictedYield > 0.9 ? (predictedYield - 0.8) : predictedYield ,
        PracticalMax: practicalMax,
        IdealYield: idealYield,
      };
    }
  );
  return transformedData;

};

export const fieldCapacityPredict = (cropData) => {
  const fieldCapacityRatio = {};

  cropData.forEach((entry) => {
    const { Date, User_Field_Capacity, Ideal_Field_Capacity } = entry;
    let userFieldCapacityWeight = 7.296;
    let idealFieldCapacityWeight = 8.845;
    let finalUserField = User_Field_Capacity * userFieldCapacityWeight;
    let finalField = Ideal_Field_Capacity * idealFieldCapacityWeight;
    const ratio = finalUserField / finalField;
    fieldCapacityRatio[Date] = ratio;
  });
  let transformedData = Object.entries(fieldCapacityRatio).map(
    ([date, predictedYield]) => {
      const practicalMax = 0.82;
      const idealYield = 1;
      return {
        Date: date,
        PredictedYield: predictedYield > 0.9 ? (predictedYield - 0.8) : predictedYield ,
        PracticalMax: practicalMax,
        IdealYield: idealYield,
      };
    }
  );
  return transformedData;
};

export const soilMoistureYieldPredict = (cropData) => {
  const soilMoistureRatio = {};
  cropData.forEach((entry) => {
    const { Date, User_Soil_Moisture, Ideal_Soil_Moisture } = entry;
    let Ideal_Soil_Moisture_Weight = 0.5;
    let userSoilMoistureWeight =
      Ideal_Soil_Moisture_Weight * (Math.abs(User_Soil_Moisture) / Math.abs(Ideal_Soil_Moisture));
    const ratio = userSoilMoistureWeight / Ideal_Soil_Moisture_Weight;
    soilMoistureRatio[Date] = ratio;
  });
  let transformedData = Object.entries(soilMoistureRatio).map(
    ([date, predictedYield]) => {
      const practicalMax = 0.95;
      const idealYield = 1;
      return {
        Date: date,
        PredictedYield: predictedYield > 0.9 ? (predictedYield - 0.8) : predictedYield ,
        PracticalMax: practicalMax,
        IdealYield: idealYield,
      };
    }
  );
  return transformedData;
};

export const soilRoughnessYieldPredict = (cropData) => {
  const soilRoughnessRatio = {};
  cropData.forEach((entry) => {
    const { Date, Ideal_Soil_Roughness_Threshold, User_Soil_Roughness } = entry;
    let idealSoilRoughnessThresholdWeight = 0.0366;
    let userSoilRoughnessThresholdWeight = 0.038;
    let finalIdealRoughness =
      Ideal_Soil_Roughness_Threshold * idealSoilRoughnessThresholdWeight;
    let finalUserRoughness =
      userSoilRoughnessThresholdWeight * User_Soil_Roughness;
    const ratio = finalUserRoughness / finalIdealRoughness;
    soilRoughnessRatio[Date] = ratio;
  });
  let transformedData = Object.entries(soilRoughnessRatio).map(
    ([date, predictedYield]) => {
      const practicalMax = 0.92;
      const idealYield = 1;
      return {
        Date: date,
        PredictedYield: predictedYield > 0.9 ? (predictedYield - 0.8) : predictedYield ,
        PracticalMax: practicalMax,
        IdealYield: idealYield,
      };
    }
  );

  return transformedData;
};

export const finalAnalyticalPredict = (cropData) => {
  const finalWeights = {
    Growth_Stage: -0.0082,
    Avg_Temperature: 0.8499,
    User_Field_Capacity: -6.996,
    Ideal_Field_Capacity: 8.845,
    Ideal_Soil_Roughness_Threshold: -0.0366,
    Min_Months: 0.0206,
    Max_Months: -0.0179,
    Soil_Roughness: -0.7679,
    Ideal_Soil_Moisture: 0.5,
  };
  let transformedData = cropData.map((row) => {
    const weightedSum = calculateFinalWeightedValue(row, finalWeights);
    const normalizeYield = Math.min((weightedSum + 100) / 200, 100);
    return {
      Date: row.Date,
      PredictedYield: normalizeYield,
      PracticalMax: 0.9,
      IdealYield: 1,
    };
  });
  return transformedData;
};

export const calculateFinalWeightedValue = (row, weights) => {
  const userSoilMoistureWeight =
    weights.Ideal_Soil_Moisture *
    (row.User_Soil_Moisture / row.Ideal_Soil_Moisture);
  const userTemperatureWeight =
    weights.Avg_Temperature * (Math.abs(row.User_Temperature) / row.Avg_Temperature);
  const dynamicWeights = {
    ...weights,
    User_Soil_Moisture: userSoilMoistureWeight,
    User_Temperature: userTemperatureWeight,
  };

  return Object.keys(dynamicWeights).reduce((sum, key) => {
    if (row.hasOwnProperty(key)) {
      return sum + row[key] * dynamicWeights[key];
    }
    return sum;
  }, 0);
};

//   module.exports = {
//     calculateFinalWeightedValue,
//     finalAnalyticalPredict,
//     soilRoughnessYieldPredict,
//     soilMoistureYieldPredict,
//     fieldCapacityPredict,
//     soilTempYieldPredict,
//   };
