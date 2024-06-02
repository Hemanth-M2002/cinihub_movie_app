import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyList = ({ userId }) => {
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const fetchMyList = async () => {
      try {
        const response = await axios.get(`http://localhost:7001/api/user/liked/${userId}`);
        setMyList(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching My List: ", error);
      }
    };

    fetchMyList();
  }, [userId]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">My List</h2>
      <ul>
        {myList.map(movie => (
          <li key={movie._id} className="mb-2">
            <div className="flex items-center">
              <img src={movie.posterUrl || ''} alt={movie.title || ''} className="w-16 h-auto mr-4" />
              <p className="text-lg">{movie.title || 'Unknown Title'}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyList;









// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const MyList = () => {
//   const [myList, setMyList] = useState([]);

//   useEffect(() => {
//     const fetchMyList = async () => {
//       try {
//         const response = await axios.get('http://localhost:7001/mylist'); // Adjust the URL if your backend is hosted elsewhere
//         setMyList(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching My List: ", error);
//       }
//     };

//     fetchMyList();
//   }, []);

//   return (
//     <div className="mt-8">
//       <h2 className="text-2xl font-bold mb-4">My List</h2>
//       <ul>
//         {myList.map(movie => (
//           <li key={movie._id} className="mb-2">
//             <div className="flex items-center">
//               <img src={movie.posterUrl || ''} alt={movie.title || ''} className="w-16 h-auto mr-4" />
//               <p className="text-lg">{movie.title || 'Unknown Title'}</p>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MyList;
