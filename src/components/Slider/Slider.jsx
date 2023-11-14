import React, { useState } from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import { useSelector } from "react-redux";
import "./Slider.scss";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const nightmode = useSelector((state) => state.navigation.nightmode)

  const data = [
    'https://images.pexels.com/photos/3062594/pexels-photo-3062594.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1',
    'https://images.pexels.com/photos/18786754/pexels-photo-18786754.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1',
    'https://images.pexels.com/photos/3206121/pexels-photo-3206121.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1',
    "https://images.pexels.com/photos/18822206/pexels-photo-18822206.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1",
    'https://images.pexels.com/photos/944761/pexels-photo-944761.jpeg?auto=compress&cs=tinysrgb&w=1600&dpr=1'
  ];

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? 4 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === 4 ? 0 : (prev) => prev + 1);
  };

  return (
    <div className="slider" id='home'>
      <div className="container" style={{transform:`translateX(-${currentSlide * 100}vw)`}}>
        <img src={data[0]} alt="slider0" />
        <img src={data[1]} alt="slider1" />
        <img src={data[2]} alt="slider2" />
        <img src={data[3]} alt="slider3" />
        <img src={data[4]} alt="slider4" />
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide} style={{'background-color' : !nightmode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'}}>
          <WestOutlinedIcon />
        </div>
        <div className="icon" onClick={nextSlide} style={{'background-color' : !nightmode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)'}}>
          <EastOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Slider;