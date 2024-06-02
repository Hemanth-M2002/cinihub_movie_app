import React, { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// import logo from '../../assets/logo.png';
import searchIcon from '../../assets/search_icon.svg';
// import Loader from '../dashboard/Loader';
import './Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}`);
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Sign-out failed:', error.message);
    }
  };

  const handleHomeClick = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <div className='navbar'>
        <div className="navbar-left">
        <li style={{
              backgroundImage: 'linear-gradient(to right, #FF69B4, #FFC0CB)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>CiniHub</li>
          <ul>
            <li onClick={handleHomeClick}>Home</li>
            <li onClick={() => navigate("/mylist")}>MyList</li>
            
          </ul>
        </div>
        <div className="navbar-right">
          <form onSubmit={handleSearch} className="mb-4 flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a movie..."
              className="text-black border p-2 rounded mr-2"
            />
            <img
              src={searchIcon}
              alt="Search"
              className='icons cursor-pointer'
              onClick={handleSearch}
            />
          </form>
          <div className="navbar-profile">
            <button onClick={handleSignOut} className="bg-red-600 text-white px-4 py-2 rounded">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;