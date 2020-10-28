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
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

var db = null;
MongoClient.connect(url, function (err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db = client.db(dbName);
});

app.post("/signin", async function (req, res) {
  let data = req.body;
  const collection = db.collection("users");
  const users = await collection.find({ user: data["user"] }).toArray();
  if (users.length == 1) {
    let hash = users[0]["password"];
    const match = await bcrypt.compare(data["password"], hash);
    res.sendStatus(match ? 200 : 401);
  } else return res.sendStatus(401);
});

app.post("/signup", async function (req, res) {
  let data = req.body;
  const collection = db.collection("users");
  const users = await collection.find({ user: data["user"] }).toArray();
  if (users.length == 0) {
    const hash = await bcrypt.hash(data["password"], saltRounds);
    data["password"] = hash;
    await collection.insertOne(data);
    res.sendStatus(200);
  } else res.sendStatus(401);
});

app.post("/deleteacc", async function (req, res) {
  let data = req.body;
  const collection = db.collection("users");
  const users = await collection.deleteOne({ user: data["user"] });
  res.sendStatus(users["deletedCount"] == 1 ? 200 : 400);
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
httpServer.listen(8080, () => {
  console.log("Example app listening at http://localhost:${port}");
});

httpsServer.listen(8443, () => {
  console.log("Example app listening at http://localhost:${port}");
});
