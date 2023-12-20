const SparqlClient = require("sparql-http-client");

async function runSparqlQuery(cropName, elapsedMonths) {
  const endpointUrl = "http://172.208.36.118:7200/repositories/Crops";

  // SPARQL query
  const sparqlQuery = `
    PREFIX ex: <http://example.org/crops#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

    SELECT ?cropName ?avgTemperature ?idealFieldCapacity ?idealSoilMoisture ?idealSoilRoughnessThreshold
           ?maxMonths ?minMonths ?soilRoughness ?stageIdentifier ?stageNumber ?type ?userFieldCapacity
    WHERE {
      ?crop rdf:type ex:Crop ;
            ex:cropName ?cropName ;
            ex:hasStage ?stage .

      ?stage rdf:type ex:GrowthStage ;
             ex:stageIdentifier ?stageIdentifier ;
             ex:stageNumber ?stageNumber ;
             ex:avgTemperature ?avgTemperature ;
             ex:idealFieldCapacity ?idealFieldCapacity ;
             ex:idealSoilMoisture ?idealSoilMoisture ;
             ex:idealSoilRoughnessThreshold ?idealSoilRoughnessThreshold ;
             ex:maxMonths ?maxMonths ;
             ex:minMonths ?minMonths ;
             ex:soilRoughness ?soilRoughness ;
             ex:type ?type ;
             ex:userFieldCapacity ?userFieldCapacity .
      
      FILTER (?cropName = "${cropName}" && ?minMonths <= ${elapsedMonths} && ?maxMonths >= ${elapsedMonths} )
    }
  `;

  // Create a SPARQL client
  const client = new SparqlClient({ endpointUrl });
  const jsonDataArray = [];

  try {
    const stream = await client.query.select(sparqlQuery);

    stream.on("data", (row) => {
      const resultRow = {};
      Object.entries(row).forEach(([key, value]) => {
        console.log(`${key}: ${value.value}`);
        resultRow[key] = value.value;
      });
      jsonDataArray.push(resultRow);
    });

    await new Promise((resolve, reject) => {
      stream.on("end", () => {
        console.log("Stream ended.");
        resolve();
      });
      stream.on("error", reject);
    });
  } catch (error) {
    console.error(error);
  }

  return jsonDataArray;
}

// runSparqlQuery()

module.exports = {
  runSparqlQuery,
};
