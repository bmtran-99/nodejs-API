const request = require('request');
const Category = require('./category');
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://bmtran:minhcurry99@clusterio.ijqmn.mongodb.net/games?retryWrites=true&w=majority";

const options = {
  method: 'GET',
  url: 'https://rawg-video-games-database.p.rapidapi.com/games',
  headers: {
    'x-rapidapi-key': 'e6463eb2dcmshe484eee23f15cebp1bd3edjsn24f5be7777fb',
    'x-rapidapi-host': 'rawg-video-games-database.p.rapidapi.com',
    useQueryString: true
  }
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
