const bcrypt = require("bcrypt");
const saltRounds = 10;
async function getUserRecord(db, user) {
  const collection = db.collection("users");
  return await collection.find({ user: user }).toArray();
}

async function compareHashes(hash, password) {
  return await bcrypt.compare(password, hash);
}

async function hashAndInsert(db, data) {
  const collection = db.collection("users");
  data["password"] = await bcrypt.hash(data["password"], saltRounds);
  return await collection.insertOne(data);
}

async function signUp(req, res, db) {
  let data = req.body;
  const user_db = await getUserRecord(db, data["user"]);
  if (user_db.length == 0) {
    await hashAndInsert(db, data);
    res.sendStatus(200);
  } else res.sendStatus(401);
}

async function signIn(req, res, db) {
  const { user, password } = req.body;
  const user_db = await getUserRecord(db, user);
  let match = false;
  if (user_db.length == 1) {
    match = await compareHashes(user_db[0]["password"], password);
  }
  res.sendStatus(match ? 200 : 401);
}

async function deleteAcc(req, res, db) {
  let data = req.body;
  const collection = db.collection("users");
  const users = await collection.deleteOne({ user: data["user"] });
  res.sendStatus(users["deletedCount"] == 1 ? 200 : 400);
}

module.exports = {
  signUp: signUp,
  signIn: signIn,
  deleteAcc: deleteAcc,
};
