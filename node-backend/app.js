const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const assert = require("assert");
const auth = require("./auth");

const url = "mongodb://localhost:27017";
const dbName = "connect4";
const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

var db = null;
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to database");
  db = client.db(dbName);
});

app.post("/signin", (req, res) => auth.signIn(req, res, db));

app.post("/signup", (req, res) => auth.signUp(req, res, db));

app.post("/deleteacc", (req, res) => auth.deleteAcc(req, res, db));

app.listen(8080, () => {
  console.log("Backend listening at http://localhost:${port}");
});
