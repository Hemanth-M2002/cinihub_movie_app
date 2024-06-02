import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './components/Home';
import Home1 from './components/dashboard/Home1';
import MyList from './components/dashboard/MyList';
import SearchResults from './components/dashboard/SearchResults';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path='/signup' element={<Register/>}/>
      <Route path='/dashboard' element={<Home1/>}/>
      <Route path="/search" element={<SearchResults />} />
      <Route path='/mylist' element={<MyList/>}/>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
