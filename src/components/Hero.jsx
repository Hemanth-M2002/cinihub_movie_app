import React from 'react';

const Hero = () => {
  return (
    <div className="bg-net-bg bg-cover bg-center   text-white min-h-screen bg-cover bg-center h-screen" >
      <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl md:text-7xl text-white font-bold mb-6">Unlimited movies, TV shows, and more.</h1>
        <h2 className="text-2xl md:text-3xl text-white mb-6">Watch anywhere. Cancel anytime.</h2>
        <p className="text-xl text-white mb-8">Ready to watch? Enter your email to create or restart your membership.</p>
        <div className="flex flex-col md:flex-row">
          <input type="email" placeholder="Email address" className="p-4 w-full md:w-auto md:flex-1 border-none rounded-l-md"/>
          <button className="bg-red-600 text-white px-8 py-4 rounded-r-md text-xl">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
