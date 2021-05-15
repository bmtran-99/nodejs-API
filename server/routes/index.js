const express = require('express');
const router = express.Router();

const {MongoClient, ObjectID} = require('mongodb');
const uri = "mongodb+srv://bmtran:minhcurry99@clusterio.ijqmn.mongodb.net/games?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/', async (req, res) => {
    await client.connect();
    
    const collection = client.db("games").collection("games_list");
    const cursor = collection.find();
    const list = await cursor.toArray();
    res.json(JSON.stringify(list));
});

module.exports = router;