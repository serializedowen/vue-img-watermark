const cache = [];
let lastInd = null;

function importAll(r) {
  r.keys().forEach((key) => cache.push(r(key).default));
}
importAll(require.context("./gallery", false, /\.jpg$/));

const getRandomPic = () => {
  let ind = lastInd;
  while (ind == lastInd) ind = Math.floor(Math.random() * cache.length);

  lastInd = ind;
  return cache[ind];
};

export default getRandomPic;
