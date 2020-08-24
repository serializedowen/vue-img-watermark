const cache = [];
function importAll(r) {
  r.keys().forEach((key) => cache.push(r(key).default));
}
importAll(require.context("./gallery", false, /\.jpg$/));

const getRandomPic = () => {
  const ind = Math.floor(Math.random() * cache.length);
  return cache[ind];
};

export default getRandomPic;
