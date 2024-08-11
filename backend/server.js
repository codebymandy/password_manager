const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
require('dotenv').config()

// Connection URL
const url ='mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'Passop';
client.connect();
const db = client.db(dbName);

const app = express()
const port = 3000

app.use(cors())

// parse application/json
app.use(bodyParser.json())

app.get('/', async(req, res) => {
  const collection = db.collection('password');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

app.post('/', async(req, res) => {

  let password = req.body
  const db = client.db(dbName);
  const collection = db.collection('password');
  const findResult = await collection.insertOne(password)
  res.send({succes: true , result:findResult})
})

app.delete('/', async(req, res) => {

  let password = req.body
  const db = client.db(dbName);
  const collection = db.collection('password');
  const findResult = await collection.deleteOne(password)
  res.send({succes: true , result:findResult})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
  
})