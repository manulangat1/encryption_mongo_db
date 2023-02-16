import { Patient } from "../../db/models";
import regularClientConfig from "../../db/utils";
import { readMasterKey, CsfleHelper } from "../../db/helpers";
import SchemaMaps from "../../db/schema.map";
const connectionString = process.env.ATLAS_URI;
const dataKey = "lhfS9pAFTFKFz8YqpA6JQw==";
import { patientDbController } from "./dbController";
import createJsonSchemaMaps from "../../db/schema.map";

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

let exampleDocument = {
  firstName: "Shirley M 1",
  healthCenterId: "455033",
  lastName: "Flores Bernardez 1",
  dateOfBirth: {
    $date: {
      $numberLong: "996451200000",
    },
  },
  gender: "Cis Female",
  spPHA: true,
  spPWSUD: false,
  spPESW: false,
  spCovid: false,
  type: true,
  biologicalGender: "FEMALE",
  genderIndentity: "Cis Male",
  sexualOrientation: "Something else",
  race: "Other Pacific Islander",
  ethnicity: "Yes, Another Hispanic, Latino/a or Spanish origin",
  contactState: "NY",
  organization: {
    $oid: "62726eecd3deee911cafcdc7",
  },
  importedBy: {
    $oid: "627511e9cfc6bfd526918080",
  },
  externalImportId: null,
  createdBy: {
    userId: {
      $oid: "627511e9cfc6bfd526918080",
    },
    createdAt: {
      $date: {
        $numberLong: "1656498839108",
      },
    },
  },
  importMetaData: {
    name: "Janelvis Acevedo",
    created: {
      $date: {
        $numberLong: "1656498839108",
      },
    },
  },
  updatedBy: [],
  createdAt: {
    $date: {
      $numberLong: "1656498839213",
    },
  },
  updatedAt: {
    $date: {
      $numberLong: "1656498839213",
    },
  },
  __v: 0,
  // name: "Jon Doe",
  // ssn: 241014209,
  // bloodType: "AB+",
  // medicalRecords: [
  //    {
  //    weight: 180,
  //    bloodPressure: "120/80"
  //    }
  // ],
  // insurance: {
  //    provider: "MaestCare",
  //    policyNumber: 123142
  // }
};

class PatientController {
  constructor() {
    const gh = new patientDbController();

    this.gh = gh;

    this.collection = null;

    console.log("I am in constructor");
    const schemeMap = csfleHelper.createJsonSchemaMap(dataKey);
    let csfleClient = csfleHelper
      .getCsfleEnabledClient(schemeMap)
      .then((data) => {
        // console.log(data, 'my data ')
        const dd = data.db("test-encrypt").collection("patients");
        // console.log(dd, 'is the dd')
        this.collection = dd;
        return dd;
      })
      .catch((err) => console.log(err));

    // console.log(this.collection , "now this is pending")
    // console.log(csfleClient,'now utside')
    // const g = Promise.resolve()
  }

  async init() {
    const schemeMap = csfleHelper.createJsonSchemaMap(dataKey);
    // console.log(schemeMap)
    let csfleClient = await csfleHelper.getCsfleEnabledClient(schemeMap);
    // // console.log(csfleClient)
    const csfleClientPatientsColl = csfleClient
      .db("test-encrypt")
      .collection("patients");
    this.collection = csfleClientPatientsColl;
    // console.log(this.collection, "now here")
    return csfleClientPatientsColl;
  }

  static async create() {
    const o = new PatientController();
    // console.log(o)
    await o.init();
    return o;
  }

  // lib
  // mongo -

  async getPatient(req, res) {
    const schemeMap = csfleHelper.createJsonSchemaMap(dataKey);
    // const schemeMap = createJsonSchemaMaps(dataKey);
    // // console.log(schemeMap)
    let csfleClient = await csfleHelper.getCsfleEnabledClient(schemeMap);
    // // // console.log(csfleClient)
    const csfleClientPatientsColl = csfleClient
      .db("test-encrypt")
      .collection("patients");
    // console.log(res, req)

    const pa = await csfleClientPatientsColl.findOne({
      gender: exampleDocument["gender"],
    });
    const dfa = await Patient
      .find
      // {

      // gender: exampleDocument["gender"]
      //  }
      ();
    // console.log(regularClientConfig.db("medicalRecords").collection("patients"))
    return res.send({ data: { dfa, pa } }).status(202);
  }

  async createPatient(re, res) {
    // console.log(SchemaMaps.createPatientSchema)
    const schemeMap = csfleHelper.createJsonSchemaMap(dataKey);
    // console.log(schemeMap)
    let csfleClient = await csfleHelper.getCsfleEnabledClient(schemeMap);
    // console.log(csfleClient)
    const csfleClientPatientsColl = csfleClient
      .db("test-encrypt")
      .collection("patients");

    const new_patient = await csfleClientPatientsColl.insertOne(
      {
        ssn: exampleDocument["ssn"],
        firstName: exampleDocument["firstName"],
        lastName: exampleDocument["lastName"],
        gender: exampleDocument["gender"],
        ethnicity: exampleDocument["ethnicity"],
      },
      { $set: exampleDocument }
    );

    return res.send({ data: new_patient }).status(201);
  }

  // static async updatePatient(req,res) {

  // }
}
export default PatientController;
// module.exports = new PatientController()
