import getRandomPic from "./getRandomPic";

const renderImage = (h, url, config = {}) => {
  return (
    <div class="image-container">
      <img
        src={url}
        v-watermark={config}
        style={"width: 500px; height : 360px"}
      ></img>
    </div>
  );
};

export default renderImage;
