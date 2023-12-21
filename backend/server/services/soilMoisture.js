const axios = require("axios");

const apiKey =
  "aca53af2-9d84-11ee-8309-0242ac130002-aca53b56-9d84-11ee-8309-0242ac130002";

const getSoilInfo = async (latitude, longitude) => {
  try {
    // calculate average moisture
    //   const average_moisture = moisture / count;
    //   console.log(`${date}: ${average_moisture.toFixed(2)} (average moisture)`);
    return {
      20122023: "0.44",
      21122023: "0.44",
      22122023: "0.44",
      23122023: "0.44",
      24122023: "0.44",
      25122023: "0.44",
      26122023: "0.44",
      27122023: "0.44",
      28122023: "0.44",
      29122023: "0.44",
      30122023: "0.44",
    };
    // return {
    //   20122023: { moisture: 9.680000000000001, count: 22 },
    //   21122023: { moisture: 10.56, count: 24 },
    //   22122023: { moisture: 10.56, count: 24 },
    //   23122023: { moisture: 10.56, count: 24 },
    //   24122023: { moisture: 10.56, count: 24 },
    //   25122023: { moisture: 10.56, count: 24 },
    //   26122023: { moisture: 10.56, count: 24 },
    //   27122023: { moisture: 10.56, count: 24 },
    //   28122023: { moisture: 10.56, count: 24 },
    //   29122023: { moisture: 10.56, count: 24 },
    //   30122023: { moisture: 1.32, count: 3 },
    // };

    // let startDate = new Date();

    // let endDate = addDaysToDate(10);
    // const response = await axios.get("https://api.stormglass.io/v2/bio/point", {
    //   params: {
    //     lat: latitude,
    //     lng: longitude,
    //     params: "soilMoisture",
    //     start: Math.floor(startDate.getTime() / 1000),
    //     end: Math.floor(endDate.getTime() / 1000),
    //   },
    //   headers: {
    //     Authorization: apiKey,
    //   },
    // });

    // const responseData = response.data;
    // const uniqueEntries = {};

    // for (const entry of responseData.hours) {
    //   const date = new Date(entry.time);
    //   const soil_moisture = entry.soilMoisture.sg;

    //   const formattedDate = `${date.getDate().toString().padStart(2, "0")}${(
    //     date.getMonth() + 1
    //   )
    //     .toString()
    //     .padStart(2, "0")}${date.getFullYear()}`;

    //   if (!uniqueEntries[formattedDate]) {
    //     uniqueEntries[formattedDate] = {
    //       moisture: soil_moisture,
    //       count: 1,
    //     };
    //   } else {
    //     uniqueEntries[formattedDate].moisture += soil_moisture;
    //     uniqueEntries[formattedDate].count += 1;
    //   }
    // }

    // for (const date in uniqueEntries) {
    //   const { moisture, count } = uniqueEntries[date];
    //   const average_moisture = moisture / count;
    //   console.log(`${date}: ${average_moisture.toFixed(2)} (average moisture)`);
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
  getSoilInfo,
};
