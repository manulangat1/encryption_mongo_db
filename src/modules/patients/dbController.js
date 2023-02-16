import {readMasterKey, CsfleHelper  } from '../../db/helpers'
import SchemaMaps from "../../db/schema.map";
const connectionString = process.env.ATLAS_URI 
const dataKey = "lhfS9pAFTFKFz8YqpA6JQw=="

const localMasterKey = readMasterKey()

const csfleHelper = new CsfleHelper({
   // The client expects a key management system to store and provide the application's master encryption key. For now, we will use a local master key, so they use the local KMS provider.
   kmsProviders: {
      local: {
         key: localMasterKey
      }
   },
   connectionString,
})

export class patientDbController { 
    constructor() {
        console.log("hello world")
        this.collection = null
    }

    async init ()  { 
        const schemeMap = csfleHelper.createJsonSchemaMap(dataKey)
            // console.log(schemeMap)
            let csfleClient = await csfleHelper.getCsfleEnabledClient(schemeMap)
            // // console.log(csfleClient)
            const csfleClientPatientsColl = csfleClient
            .db("test-encrypt")
            .collection("patients")
        this.collection = csfleClientPatientsColl
        console.log(this.collection, "now here")
        return csfleClientPatientsColl
    }

}