import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import FeatureSection from './FeatureSection';
import Footer from './Footer';
function Home() {
  return (

    <div className="bg-black">
      <Navbar />
      <Hero />
      <FeatureSection />
      <Footer />
    </div>
    // <div className="bg-net-bg bg-cover bg-center   text-white min-h-screen">
    //   <div className="container mx-auto px-4 py-16">
    //     <div className="text-center">
    //       <h1 className="text-5xl font-bold mb-4">NETFLIX</h1>
    //       <p className=" text-lg mb-8">Unlimited films, TV programmes and more</p>
    //       <p className="text-base mb-4">Watch anywhere. Cancel at anytime</p>
    //       <p className="text-base mb-6">Ready to watch? Enter your email toor restart your membership</p>
    //       <div className="flex justify-center">
    //         <input
    //           type="email"
    //           placeholder="Enter your email"
    //           className="px-4 py-3 rounded-md shadow-md mr-4"
    //         />
    //         <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-md shadow-md">
    //           Get Started →
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Home;