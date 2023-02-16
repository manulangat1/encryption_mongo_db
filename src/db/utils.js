const connectionString = process.env.ATLAS_URI 
const dataKey = "lhfS9pAFTFKFz8YqpA6JQw=="
import { readMasterKey, CsfleHelper } from './helpers'


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

const regularClientConfig = async () => { 

    let regularClient = await csfleHelper.getRegularClient()
    
    return regularClient
    // const regularClientPatientsColl = regularClient
    // .db("medicalRecords")
    // .collection("patients")
}

export default  regularClientConfig