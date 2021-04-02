const express = require('express');
const router = express.Router();

const {MongoClient, ObjectID} = require('mongodb');
const uri = "mongodb+srv://bmtran:minhcurry99@clusterio.ijqmn.mongodb.net/games?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const Wishlist = require('../utils/wishlist');

router.get('/', async (req, res) => {
    await client.connect();
    
    const collection = client.db("games").collection("games_list");
    const cursor = collection.find();
    const list = await cursor.toArray();

    var listChunks = [];
    var chunkSize = 3;
    for (var i=0; i<list.length; i+=chunkSize)
        listChunks.push(list.slice(i, i+chunkSize));

    res.render('views/index', {title: 'Shoppal', listGames: listChunks});
});

router.get('/add-to-wishlist/:id', async (req, res) => {
    var productId = req.params.id;
    var list = new Wishlist(req.session.list ? req.session.list : {});
    console.log(list.total);

    try {
        await client.connect();

        const collection = client.db("games").collection("games_list");
        const product = await collection.findOne({_id: ObjectID(productId)});

        if (product) {
            list.add(product, product._id);
            req.session.list = list;
            console.log(req.session.list);
            res.redirect('/');
        }
    } finally {
        await client.close();
    }
});

router.get('/remove/:id', (req,res) => {
    var productId = req.params.id;
    var list = new Wishlist(req.session.list ? req.session.list : {});

    list.remove(productId);
    req.session.list = list;
    res.redirect('/wishlist');
})

router.get('/wishlist', (req, res) => {
    if (!req.session.list) return res.render('views/wishlist', {products: null});

    var list = new Wishlist(req.session.list);
    res.render('views/wishlist', {products: list.generateArray()});
});

module.exports = router;