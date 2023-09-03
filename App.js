import './App.css';
import React from 'react';
import Signup from './screens/Signup';
import Home from './screens/Home';
import Login from './screens/Login';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { CartProvider } from './components/contextReducer';
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
// import '../node_modules/bootstrap/js/bootstrap.bundle';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/myOrder" element={<myOrder />} />
          
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;
