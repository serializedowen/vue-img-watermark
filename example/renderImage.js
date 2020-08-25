import getRandomPic from "./getRandomPic";

const renderImage = (h, url, config = {}, index) => {
  return (
    <div key={index} class="image-container">
      <img
        src={url}
        v-watermark={config}
        style={"width: 500px; height : 360px"}
      ></img>
    </div>
  );
};

export default renderImage;
