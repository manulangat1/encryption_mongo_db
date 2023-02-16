// clients.js

const fs = require("fs")
const mongodb = require("mongodb")
const { ClientEncryption } = require("mongodb-client-encryption")
const { MongoClient, Binary } = mongodb

module.exports = {
readMasterKey: function (path = "./master-key.txt") {
   return fs.readFileSync(path)
},
CsfleHelper: class {
   constructor({
      kmsProviders = null,
      keyAltNames = "demo-data-key",
      keyDB = "encryption",
      keyColl = "__keyVault",
      schema = null,
      connectionString = "mongodb+srv://manulangat:3050manu@mern-shopping-list.hquqa.mongodb.net/test-encrypt?retryWrites=true&w=majority",
      mongocryptdBypassSpawn = false,
      mongocryptdSpawnPath = "mongocryptd"
   } = {}) {
      if (kmsProviders === null) {
      throw new Error("kmsProviders is required")
      }
      this.kmsProviders = kmsProviders
      this.keyAltNames = keyAltNames
      this.keyDB = keyDB
      this.keyColl = keyColl
      this.keyVaultNamespace = `${keyDB}.${keyColl}`
      this.schema = schema
      this.connectionString = connectionString
      this.mongocryptdBypassSpawn = mongocryptdBypassSpawn
      this.mongocryptdSpawnPath = mongocryptdSpawnPath
      this.regularClient = null
      this.csfleClient = null
   }

   /**
   * In the guide, https://docs.mongodb.com/ecosystem/use-cases/client-side-field-level-encryption-guide/,
   * we create the data key and then show that it is created by
   * retreiving it using a findOne query. Here, in implementation, we only
   * create the key if it doesn't already exist, ensuring we only have one
   * local data key.
   *
   * @param {MongoClient} client
   */
   async findOrCreateDataKey(client) {
      const encryption = new ClientEncryption(client, {
      keyVaultNamespace: this.keyVaultNamespace,
      kmsProviders: this.kmsProviders
      })

      await this.ensureUniqueIndexOnKeyVault(client)

      let dataKey = await client
      .db(this.keyDB)
      .collection(this.keyColl)
      .findOne({ keyAltNames: { $in: [this.keyAltNames] } })

      if (dataKey === null) {
      dataKey = await encryption.createDataKey("local", {
         keyAltNames: [this.keyAltNames]
      })
      return dataKey.toString("base64")
      }

      return dataKey["_id"].toString("base64")
   }
}}