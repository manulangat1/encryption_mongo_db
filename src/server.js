import express from "express";
import bodyParser from "body-parser";

import morgan from "morgan";
import cors from "cors";
import colors from "colors";
import { Patient } from "./db/models";
import { getCsfleEnabledClient } from "./db/helpers";
import modules from "./modules";

const { readMasterKey, CsfleHelper } = require("./db/helpers");
const connectionString = process.env.ATLAS_URI;
const dataKey = "lhfS9pAFTFKFz8YqpA6JQw==";

const localMasterKey = readMasterKey();

const csfleHelper = new CsfleHelper({
  // The client expects a key management system to store and provide the application's master encryption key. For now, we will use a local master key, so they use the local KMS provider.
  kmsProviders: {
    local: {
      key: localMasterKey,
    },
  },
  connectionString,
});

let schemeMap = csfleHelper.createJsonSchemaMap(dataKey);
let csfleClient = await csfleHelper.getCsfleEnabledClient(schemeMap);
const main = async () => {
  let regularClient = await csfleHelper.getRegularClient();
  let schemeMap = csfleHelper.createJsonSchemaMap(dataKey);
  let csfleClient = await csfleHelper.getCsfleEnabledClient(schemeMap);

  // console.log(regularClient)
  // console.log(schemeMap)
  //   console.log(csfleClient, 'here')

  //   console.log("now now")

  //   let exampleDocument = {
  //     name: "Jon Doe",
  //     ssn: 241014209,
  //     bloodType: "AB+",
  //     medicalRecords: [
  //        {
  //        weight: 180,
  //        bloodPressure: "120/80"
  //        }
  //     ],
  //     insurance: {
  //        provider: "MaestCare",
  //        policyNumber: 123142
  //     }
  //  }

  //  const regularClientPatientsColl = regularClient
  //     .db("medicalRecords")
  //     .collection("patients")

  //   // console.log(regularClientPatientsColl)
  //  const csfleClientPatientsColl = csfleClient
  //     .db("medicalRecords")
  //     .collection("patients")

  //   console.log(csfleClientPatientsColl)

  // //  // Performs the insert operation with the csfle-enabled client
  // //  // We're using an update with an upsert so that subsequent runs of this script
  // //  // don't insert new documents
  //  const f = await csfleClientPatientsColl.updateOne(
  //     { ssn: exampleDocument["ssn"] },
  //     { $set: exampleDocument },
  //     { upsert: true }
  //  )
  //  console.log(f)
  //  // Performs a read using the encrypted client, querying on an encrypted field
  //  const csfleFindResult = await csfleClientPatientsColl.findOne({
  //     ssn: exampleDocument["ssn"]
  //  })
  //  console.log(
  //     "Document retreived with csfle enabled client:\n",
  //     csfleFindResult
  //  )

  //  // Performs a read using the regular client. We must query on a field that is
  //  // not encrypted.
  //  // Try - query on the ssn field. What is returned?
  //  const regularFindResult = await regularClientPatientsColl.findOne({
  //     name: "Jon Doe"
  //  })
  //  console.log("Document retreived with regular client:\n", regularFindResult)

  //  await regularClient.close()
  //  await csfleClient.close()
};

// const alla =  main().then(data => console.log("conn open")).catch(err => console.error(err))

main();
// alla.once('open', function() {
//   console.log("Connected to second MongoDB instance");
// });
// console.log(alla)
// console.log(alla, 'another promise loading?')
// main().catch(console.dir)
// main()

console.log(localMasterKey, "Is my key");

import connectDB from "./db/conn";
require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();

connectDB();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());

modules(app);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(morgan("dev"));
app.get("/", function (req, res) {
  res.send("Hello world, I am the Fledging Flight API");
});

app.get("/patients", async (req, res) => {
  const patients = await Patient.find();
  console.log(patients);
  res.send(patients);

  // const fa = await getCsfleEnabledClient.
});

app.use("*", (req, res) => {
  res.status(404).send({
    message: "Url not found",
  });
});
// const PORT = process.env.PORT || 8000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Server connected successfully on http://localhost:${PORT}/api/v1 in ${process.env.NODE_ENV} mode`
      .yellow.underline
  );
});

export default app;
