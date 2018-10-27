const MongoClient = require('mongodb').MongoClient;
const mongoUrl = process.env.MONGO_URL;
console.log('MONGO URL', process.env.MONGO_URL);

module.exports.savePostsToMongo = function({ collection, posts }) {
  console.log('SAVING TO MONGO...');
  MongoClient.connect(
    mongoUrl,
    { useNewUrlParser: true },
    function(err, client) {
    const db = client.db('cstoddart');
    const dbCollection = db.collection(collection);
    dbCollection.insertMany(posts);

    client.close();
  });  
};

module.exports.getPostsFromMongo = function({ collection }) {
  console.log('GETTING FROM MONGO...');
  return new Promise(function(resolve) {
    MongoClient.connect(
      mongoUrl,
      { useNewUrlParser: true },
      function(err, client) {
        if (!client) throw err;
        return client
            .db('cstoddart')
            .collection(collection)
            .find({})
            .toArray(function(error, documents) {
              resolve(documents);
              client.close();
            });
      });
  });
};
