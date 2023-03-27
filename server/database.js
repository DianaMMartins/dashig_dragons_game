let dbConnection;
const API_KEY = process.env.API_KEY;
let uri = `mongodb+srv://pindernc:Xa7nqPHPaMKEEZDz@pinder.skvgszw.mongodb.net/?retryWrites=true&w=majority`;
const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();

router.get('/', async (req, res) => {
    const test = await loadDemoCollection();
    res.send(await test.find({}).toArray())
});




// async function main() {
//   const uri =
//     "mongodb+srv://pindernc:Xa7nqPHPaMKEEZDz@pinder.skvgszw.mongodb.net/?retryWrites=true&w=majority";
//   const client = new MongoClient(uri);

//   try {
//     // Connect to the MongoDB cluster
//     await client.connect();
//     const db = client.db('sample_mflix');
//     const collection = db.collection('comments');
//     const first = await collection.findOne();
//     console.log(first);
//   } catch (e) {
//     console.error(e);
//   } finally {
//     await client.close();
//   }
// }

// main().catch(console.error);
