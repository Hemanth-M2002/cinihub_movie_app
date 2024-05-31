import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-600 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h5 className="text-white mb-2">Questions? Call 1-800-000-0000</h5>
            <ul>
              <li className="mb-2"><a href="#" className="text-gray-600 hover:underline">FAQ</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600 hover:underline">Help Center</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600 hover:underline">Account</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600 hover:underline">Media Center</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600 hover:underline">Investor Relations</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600 hover:underline">Jobs</a></li>
            </ul>
          </div>
          {/* Add more footer columns as needed */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
