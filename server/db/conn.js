const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

module.exports = {
  connectToServer: async function (callback) {
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Successfully connected to MongoDB!");
      return client.db("employees");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      return callback(error);
    } finally {
      await client.close();
    }
  },
};
