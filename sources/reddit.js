module.exports = function getRedditPosts() {
  
  const { data } = fetch('https://www.reddit.com/r/ProgrammerHumor+Frontend+javascript+learnjavascript+programming+reactjs+webdev.json')
    .then(response => response.json());

  const posts = data.children.map(child => {
    const post = child.data;
    return {
      id: post.id,
      thumbnail: post.thumbnail,
      title: post.title,
      source: `r/${post.subreddit}`,
      sourceType: 'reddit',
    };
  });
  const nextPageToken = data.after;

  return {
    posts,
    nextPageToken,
  };
};
