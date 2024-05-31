import React from 'react';

const FeatureSection = () => {
  return (
    <div className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        
        {/* Feature 1: TV with Video Playback */}
        <div className="flex flex-col md:flex-row items-center mb-8">
          <div className="md:w-1/2 p-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Enjoy on your TV.</h2>
            <p className="text-xl mb-4">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
          </div>
          <div className="md:w-1/2 p-4 relative">
            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png" alt="Enjoy on your TV" className="w-full" />
            <video className="absolute top-0 left-0 w-full h-full" autoPlay loop muted>
              <source src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Feature 2: Mobile View */}
        <div className="flex flex-col md:flex-row-reverse items-center mb-8">
          <div className="md:w-1/2 p-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Download your shows to watch offline.</h2>
            <p className="text-xl mb-4">Save your favorites easily and always have something to watch.</p>
          </div>
          <div className="md:w-1/2 p-4 relative">
            <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile.jpg" alt="Mobile View" className="w-full" />
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black rounded-md p-2 flex items-center">
              <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/boxshot.png" alt="Stranger Things" className="w-12 h-16 mr-4" />
              <div>
                <p className="text-white text-lg">Stranger Things</p>
                <p className="text-blue-500">Downloading...</p>
              </div>
              <div className="ml-auto">
                <img src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/download-icon.gif" alt="Downloading" className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional features can be added here */}

      </div>
    </div>
  );
};

export default FeatureSection;
