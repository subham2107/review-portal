import React from "react";
import "./Banner.css";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './index.css';
function Banner() {
  return (
    <div className="App">
     <AliceCarousel autoPlay activeIndex infinite disableButtonsControls autoPlayInterval="3000">
      <a href="https://www.youtube.com/watch?v=Yj0l7iGKh8g" target="_blank"><img src="https://m.media-amazon.com/images/S/sonata-images-prod/PV_IN_TheFlashLaunch/8a5a9910-6224-4339-9242-7dd0a3254ecb._UR3000,600_SX1500_FMjpg_.jpeg" className="sliderimg" alt="Flash" /></a>
      <a href="https://www.youtube.com/watch?v=2iKZmRR9AR4" target="_blank"><img src="https://m.media-amazon.com/images/G/01/digital/video/sonata/Hero_IN_Office_v1/2efa5ef6-b2f4-4c6f-ab0f-a120fa7d934a._UR3000,600_SX1500_FMjpg_.jpg" className="sliderimg" alt="The Office" /></a>
      <a href="https://www.youtube.com/watch?v=FStMMcj-RiA" target="_blank"><img src="https://m.media-amazon.com/images/S/sonata-images-prod/PV_IN_YoungSheldonNewSeason4WatchNow/203ed7b6-6f53-4b1c-99ba-2f7e80f7199d._UR3000,600_SX1500_FMjpg_.jpg" alt="Young Sheldon" className="sliderimg" alt="Young Sheldon"/></a>
      <a href="https://www.youtube.com/watch?v=ZFxag-taIqE" target="_blank"><img src="https://m.media-amazon.com/images/S/sonata-images-prod/PV_IN_SolosLaunch/bd7c0f2f-c504-4d22-9d71-33e951bb2be5._UR3000,600_SX1500_FMjpg_.jpeg" className="sliderimg" alt="Solos - Season 1"/></a>
    </AliceCarousel>
    </div>
  );
}

export default Banner;