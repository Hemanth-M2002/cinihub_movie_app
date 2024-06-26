import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Home1 from './components/dashboard/Home1';
import MyList from './components/dashboard/MyList';
import SearchResults from './components/dashboard/SearchResults';
import MovieDetails from './components/dashboard/MovieDetails';



const Main = () => {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/dashboard' element={<Home1 />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path='/mylist' element={<MyList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

export default App;
