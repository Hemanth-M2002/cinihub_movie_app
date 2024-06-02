// src/components/Loader.jsx
import React from 'react';

const Loader = () => {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="border-8 border-gray-300 rounded-full border-t-8 border-blue-500 w-16 h-16 animate-spin"></div>
      </div>
    );
  };
  
  export default Loader;

// // CSS for loader (Add this to your CSS file, e.g., Navbar.css or a new Loader.css)
// .loader {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background-color: rgba(0, 0, 0, 0.5);
//   z-index: 1000;
// }

// .spinner {
//   border: 8px solid #f3f3f3;
//   border-radius: 50%;
//   border-top: 8px solid #3498db;
//   width: 60px;
//   height: 60px;
//   animation: spin 1s linear infinite;
// }

// @keyframes spin {
//   0% { transform: rotate(0deg); }
//   100% { transform: rotate(360deg); }
// }

