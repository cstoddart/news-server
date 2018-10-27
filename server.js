require('dotenv').config();

const express = require('express');
const expressGraphQL = require('express-graphql');
const { buildSchema } = require('graphql');

const { getLogRocketPosts } = require('./sources/logRocket');

const app = express();

const schema = buildSchema(`
  type Query {
    posts: [Post]
  },
  type Post {
    id: String
    title: String
    thumbnail: String
    summary: String
    source: String
    sourceType: String
    date: String
  },
`);

function getPosts() {
  console.log('GETTING POSTS...');
  getLogRocketPosts();
  console.log('AFTER...');
//   return [
//     ...getLogRocketPosts(),
//    ];
}

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/graphql', expressGraphQL({
  schema,
  rootValue: {
    posts: getPosts
  },
  graphiql: true
}));

app.listen(3000);
console.log('LISTENING ON PORT 3000...');
