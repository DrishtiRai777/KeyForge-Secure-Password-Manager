/* eslint-disable no-undef */
// eslint-disable-next-line no-undef

const express = require('express')
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const { MongoClient } = require('mongodb');
dotenv.config()
const cors = require('cors')

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PasswordManager';
const app = express()
const port = 3000
app.use(bodyparser.json());
app.use(cors())

client.connect();

app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
})

app.post('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const savedRes = await collection.insertOne(password);
    res.send({success: true, result: savedRes});
})

app.delete('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const delResult = await collection.deleteOne(password);
    res.send({success: true, result: delResult});
})

app.listen(port, () => {
  console.log(`Example app listening on ${port}`)  
})