import React from 'react';
import Navbar from '../dashboard/Navbar';
import hero from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play from '../../assets/play_icon.png';
import info from '../../assets/info_icon.png';
import TitleCards from '../dashboard/TitleCards';
import Footer from '../dashboard/Footer';

const Home1 = () => {
  return (
    <div className='home'>
      <Navbar />
      <div className="relative">
        <img src={hero} className='w-full mask-image-gradient' alt="Hero Banner" />
        <div className="absolute bottom-0 w-full pl-6 pb-8 bg-gradient-to-t from-black to-transparent">
          <img src={hero_title} className='w-11/12 max-w-lg mb-8' alt="Hero Title" />
          <p className='max-w-xl text-lg mb-5 text-white'>
            Your descriptive text goes here. It should be engaging and concise.
          </p>
          <div className="flex gap-2 mb-12">
            <button className='flex items-center gap-2 px-5 py-2.5 bg-white text-black font-semibold rounded-md hover:bg-white/75'>
              <img src={play} className="w-6" alt="Play Icon" /> Play
            </button>
            <button className='flex items-center gap-2 px-5 py-2.5 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700'>
              <img src={info} className="w-6" alt="Info Icon" /> More Info
            </button>
          </div>
        </div>
      </div>
      <div className="pl-6">
        <TitleCards title="Blockbuster Movies" category="top_rated" />
        <TitleCards title="Only on Netflix" category="popular" />
        <TitleCards title="Upcoming" category="upcoming" />
        <TitleCards title="Top Picks for You" category="now_playing" />
      </div>
      <Footer />
    </div>
  );
}

export default Home1;