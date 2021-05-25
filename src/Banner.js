import React from "react";
import "./Banner.css";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import './index.css';
function Banner() {
  return (
    <div className="App">
     <AliceCarousel autoPlay activeIndex infinite disableButtonsControls autoPlayInterval="3000">
      <img src="https://m.media-amazon.com/images/S/sonata-images-prod/PV_IN_TheFlashLaunch/8a5a9910-6224-4339-9242-7dd0a3254ecb._UR3000,600_SX1500_FMjpg_.jpeg" className="sliderimg" alt="Flash" />
      <img src="https://m.media-amazon.com/images/G/01/digital/video/sonata/Hero_IN_Office_v1/2efa5ef6-b2f4-4c6f-ab0f-a120fa7d934a._UR3000,600_SX1500_FMjpg_.jpg" className="sliderimg" alt="The Office" />
      <img src="https://m.media-amazon.com/images/S/sonata-images-prod/PV_IN_WonderWomen84Launch/2a4fd577-c5a6-483c-a910-23afbc2ba9f7._UR3000,600_SX1500_FMjpg_.jpeg" className="sliderimg" alt="Wonder Woman 1984" />
      <img src="https://m.media-amazon.com/images/S/sonata-images-prod/PV_IN_SolosLaunch/bd7c0f2f-c504-4d22-9d71-33e951bb2be5._UR3000,600_SX1500_FMjpg_.jpeg" className="sliderimg" alt="Solos - Season 1"/>
    </AliceCarousel>
    </div>
  );
}

export default Banner;