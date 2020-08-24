import getRandomPic from "./getRandomPic";

const renderImage = (h, config = {}) => {
  return (
    <div class="image-container">
      <img src={getRandomPic()} v-watermark={config}></img>
    </div>
  );
};

export default renderImage;
