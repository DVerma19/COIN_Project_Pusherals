const axios = require("axios");
const apiKey =
  "734257f4-9d84-11ee-8b92-0242ac130002-7342586c-9d84-11ee-8b92-0242ac130002";

// // Set custom start and end dates (replace with your desired dates)
// const customStartDate = new Date("2023-12-19T00:00:00Z");
// const customEndDate = new Date("2023-12-29T00:00:00Z");

const getTemperatureInfo = async (latitude, longitude) => {
  try {
    return {
      20122023: { temperature: -12.665565719604492 },
      21122023: { temperature: -13.748993843793869 },
      22122023: { temperature: -5.859420675039291 },
      23122023: { temperature: -1.5398312163352967 },
      24122023: { temperature: -8.0507435464859 },
      25122023: { temperature: -6.086374502182007 },
      26122023: { temperature: -15.686089293956755 },
      27122023: { temperature: -8.35903770327568 },
      28122023: { temperature: -5.9619814550876615 },
      29122023: { temperature: -11.817198553085326 },
      30122023: { temperature: -14.6375 },
    };

    // let startDate = new Date();

    // let endDate = addDaysToDate(10);

    // const response = await axios.get(
    //   "https://api.stormglass.io/v2/weather/point",
    //   {
    //     params: {
    //       lat: latitude,
    //       lng: longitude,
    //       params: "airTemperature",
    //       start: Math.floor(startDate.getTime() / 1000),
    //       end: Math.floor(endDate.getTime() / 1000),
    //     },
    //     headers: {
    //       Authorization: apiKey,
    //     },
    //   }
    // );

    // const responseData = response.data;
    // const uniqueEntries = {};

    // for (const entry of responseData.hours) {
    //   const date = new Date(entry.time);
    //   const air_temperature = entry.airTemperature.noaa;

    //   const formattedDate = `${date.getDate().toString().padStart(2, "0")}${(
    //     date.getMonth() + 1
    //   )
    //     .toString()
    //     .padStart(2, "0")}${date.getFullYear()}`;

    //   if (!uniqueEntries[formattedDate]) {
    //     uniqueEntries[formattedDate] = {
    //       temperature: air_temperature,
    //     };
    //   } else {
    //     uniqueEntries[formattedDate].temperature =
    //       (uniqueEntries[formattedDate].temperature + air_temperature) / 2;
    //   }
    // }

    // for (const date in uniqueEntries) {
    //   const { temperature } = uniqueEntries[date];
    //   console.log(`${date}: ${temperature.toFixed(2)} °C`);
    // }

    // return uniqueEntries;
  } catch (error) {
    console.error("Error:", error.message);
  }
};

function addDaysToDate(days) {
  const currentDate = new Date();
  const futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + days);

  return futureDate;
}

module.exports = {
  getTemperatureInfo,
};

// axios
//   .get("https://api.stormglass.io/v2/weather/point", {
//     params: {
//       lat: 62.7984,
//       lng: 25.8081,
//       params: "airTemperature",
//       start: Math.floor(customStartDate.getTime() / 1000), // Convert to Unix timestamp
//       end: Math.floor(customEndDate.getTime() / 1000), // Convert to Unix timestamp
//     },
//     headers: {
//       Authorization: apiKey,
//     },
//   })
//   .then((response) => {
//     const responseData = response.data;

//     const uniqueEntries = {};

//     // Process each entry in the data
//     for (const entry of responseData.hours) {
//       // Extract date and temperature
//       const date = new Date(entry.time);
//       const air_temperature = entry.airTemperature.noaa; // You can choose any source ("dwd", "noaa", "sg", "smhi")

//       // Format date as DDMMYYYY
//       const formattedDate = `${date.getDate().toString().padStart(2, "0")}${(
//         date.getMonth() + 1
//       )
//         .toString()
//         .padStart(2, "0")}${date.getFullYear()}`;

//       // Update unique entries
//       if (!uniqueEntries[formattedDate]) {
//         uniqueEntries[formattedDate] = {
//           temperature: air_temperature,
//         };
//       } else {
//         uniqueEntries[formattedDate].temperature =
//           (uniqueEntries[formattedDate].temperature + air_temperature) / 2;
//       }
//     }

//     // Print the results
//     for (const date in uniqueEntries) {
//       const { temperature } = uniqueEntries[date];
//       console.log(`${date}: ${temperature.toFixed(2)} °C`);
//     }
//   })
//   .catch((error) => {
//     console.error("Error:", error.message);
//   });
