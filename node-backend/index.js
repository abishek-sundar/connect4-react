const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const bcrypt = require("bcrypt");
const assert = require("assert");
const fs = require("fs");
const http = require("http");
const https = require("https");

const url = "mongodb://localhost:27017";
const dbName = "connect4";
var privateKey = fs.readFileSync("./sslcert/server.key", "utf8");
var certificate = fs.readFileSync("./sslcert/server.cert", "utf8");
const port = 8080;
const saltRounds = 10;
var credentials = { key: privateKey, cert: certificate };
const app = express();
const HTTP_SUCCESS = 200;
const HTTP_UNAUTH = 401;
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

var db = null;
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db = client.db(dbName);
});

async function checkCreds(db, document) {
  const collection = db.collection("documents");
  const docs = await collection.find({ user: document["user"] }).toArray();
  if (docs.length == 1) {
    let hash = docs[0]["password"];
    const match = await bcrypt.compare(document["password"], hash);
    return match ? HTTP_SUCCESS : HTTP_UNAUTH;
  } else return HTTP_UNAUTH;
}

const findDocuments = function (db) {
  // Get the documents collection
  const collection = db.collection("documents");
  // Find some documents
  collection.find({}).toArray(function (err, docs) {
    console.log("Found the following records");
    console.log(docs);
  });
};

app.get("/", function (req, res) {
  res.send("<h1>Hello World</h1>");
});

app.post("/", function (req, res) {
  console.log(req.body);
  console.log(req.headers);
  res.sendStatus(200);
});
app.get("/pls", function (req, res) {
  findDocuments(db);
  res.sendStatus(200);
});
app.post("/signin", async function (req, res) {
  let data = req.body;
  res.sendStatus(await checkCreds(db, data));
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpServer.listen(8080, () => {
  console.log("Example app listening at http://localhost:${port}");
});

httpsServer.listen(8443, () => {
  console.log("Example app listening at http://localhost:${port}");
});
