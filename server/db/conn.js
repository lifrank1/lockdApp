const Db = process.env.ATLAS_URI;
const { MongoClient, ServerApiVersion } = require('mongodb');


var _db;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(Db, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//node server.js client in server directory
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // verify db object
      console.log("TESTING123.");
      if (db) {
        _db = db.db("employees");
        console.log("Successfully connected to MongoDB.");
      }
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
