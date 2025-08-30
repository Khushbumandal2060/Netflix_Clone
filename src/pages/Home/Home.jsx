import React from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar.jsx';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards'; 
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div className='home'>
      <Navbar />

      <div className="hero">
        <img src={hero_banner} alt="Hero Banner" className='banner-img' />

        <div className="hero-caption">
          <img src={hero_title} alt="Hero Title" className='caption-img' />
          <p>
            Youth is the most energetic and vibrant stage of human life, often seen as the backbone of a nation. 
            It is a period filled with dreams, ambitions, creativity, and the power to bring change. 
          </p>
          <div className="hero-btns">
            <button className='btn'><img src={play_icon} alt="" /> Play</button>
            <button className='btn dark-btn'>
              <img src={info_icon} alt="" /> More Info
            </button>
          </div>
          <TitleCards /> 
        </div>
      </div>
      <div className="more-cards">
        <TitleCards title={"Blockbuster Movies"}/>
        <TitleCards title={"only on Netflix"}/>
        <TitleCards title={"Upcoming"}/>
        <TitleCards title={"Top Pics for You"}/>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
