const request = require('request');

const { savePostsToMongo, getPostsFromMongo } = require('../mongo');

module.exports.saveLogRocketPosts = function() {
  request.get('https://blog.logrocket.com?format=json', function(error, response) {

    const trimmed = response.body.replace('])}while(1);</x>', '');
    const json = JSON.parse(trimmed);

    const posts = Object.values(json.payload.references.Post).map((post) => ({
      id: post.id,
      title: post.title,
      thumbnail: `https://cdn-images-1.medium.com/max/500/${post.virtuals.previewImage.imageId}`,
      summary: post.content.subtitle,
      source: `LogRocket`,
      sourceType: 'medium',
      date: post.firstPublishedAt,
    }));

    savePostsToMongo({ collection: 'logRocket', posts });
  });
};

module.exports.getLogRocketPosts = async function() {
  const posts = await getPostsFromMongo({ collection: 'logRocket' });
  console.log('POSTS', posts);
  return posts;
};
