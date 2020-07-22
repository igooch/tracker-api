require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

async function connectToDb() {
  const url = process.env.MONGO_URI
    || 'mongodb://igooch:74wOFITnYFqQHN6S@ds113785.mlab.com:13785/heroku_sgcdw4dg';
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

async function getNextSequence(name) {
  const result = await db.collection('counters').findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.value.current;
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getNextSequence, getDb };
