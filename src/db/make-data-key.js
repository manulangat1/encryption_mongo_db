// make-data-key.js

const { readMasterKey, CsfleHelper } = require("./helpers");
// const { connectionString } = require("./config");

async function main() {
const localMasterKey = readMasterKey()

const csfleHelper = new CsfleHelper({
   kmsProviders: {
      local: {
      key: localMasterKey
      }
   },
   connectionString: "mongodb+srv://manulangat:3050manu@mern-shopping-list.hquqa.mongodb.net/test-encrypt?retryWrites=true&w=majority"
})

const client = await csfleHelper.getRegularClient()

const dataKey = await csfleHelper.findOrCreateDataKey(client)
console.log("Base64 data key. Copy and paste this into clients.js\t", dataKey)

client.close()
}

main().catch(console.dir)