import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-black p-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-red-600 text-3xl font-bold">
          Netflix
        </div>
        <div>
          <button className="bg-red-600 text-white px-4 py-2 rounded">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
