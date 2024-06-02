import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // Ensure this import is correct

const Navbar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignInClick = () => {
    setLoading(true); // Start the loading animation
    setTimeout(() => {
      navigate('/login'); // Navigate to the login page after a delay
    }, 550); // Adjust the delay as needed
  };

  return (
    <nav className="bg-transparent p-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl font-bold bg-black bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
          cinihub
        </div>
        <div>
          {loading ? (
            <ClipLoader color="black" size={30} />
          ) : (
            <button onClick={handleSignInClick} className="bg-red-600 text-white px-4 py-2 rounded">
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
