const request = require('request');
const Category = require('../models/category');
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://bmtran:minhcurry99@clusterio.ijqmn.mongodb.net/games?retryWrites=true&w=majority";

const options = {
  method: 'GET',
  url: 'https://api.rawg.io/api/games?key=d96918eebf564d259feacd863bab7c9b&dates=2019-01-01,2021-01-01&ordering=-added&page_size=500',
};

request(options, async function (error, response, body) {
    if (error) throw new Error(error);
    var json = [];

    var convertedData = await JSON.parse(body);
    json = convertedData['results'];
    
    var list = [];

    for (var i=0; i<json.length; i++){
        list.push(new Category({
            imagePath: json[i]['background_image'],
            title: json[i]['name'],
            rating: json[i]['metacritic']
        }));
    }
    console.log(list);
    
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    
    const collection = client.db("games").collection("games_list");
    await collection.insertMany(list);
    client.close();
})
