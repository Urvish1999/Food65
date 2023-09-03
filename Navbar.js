import React, { useState } from 'react';
import Badge from 'react-bootstrap/Badge'
import Cart from '../screens/Cart';
import Modal from '../Modal'
import {useCart} from './contextReducer'

import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [cartView, setCartView] = useState(false)
  let data = useCart();
  const navigate = useNavigate();
  const handleLogout = ()=>{
  localStorage.removeItem("authToken");
 navigate("/login")
  }
  const [searchQuery, setSearchQuery] = useState('');
  
  // This function is called when the search button is clicked
  const handleSearch = () => {
    // Implement your search logic here
    // You can use the searchQuery state to get the user's input
    // You might fetch data from an API and set it in another state for search results
    // For this example, let's just log the search query
    console.log('Search query:', searchQuery);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-sucess" >

        <div className="container-fluid">
          <Link className="navbar-brand fw-bold fs-1 helvetica neue,Helvetica,Arial,sans-serif" to="/">
            Food65
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active fw-bold fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {(localStorage.getItem("authToken"))?
              <li className="nav-item">
              <Link className="nav-link active fw-bold  fs-5" aria-current="page" to="/myOrder">
              My Orders
              </Link>
            </li>
            :" "}
  
              </ul> 
              {(!localStorage.getItem("authToken"))?
              <div className = "d-flex">

                <Link className="btn bg-black text-white mx-1" to="/Signup">
                  SignUP</Link>
           
              <Link className="btn bg-black text-white mx-1  " to="/Login">
                  Login
                </Link>

                </div>
              :

              <>
            <div className = "btn bg-black text-white mx-2 " onClick={()=>{setCartView(true)}}>My Cart {" "} <Badge pill bg = "danger">{data.length}</Badge></div>
            {cartView? <Modal onClose = {()=>setCartView(false)} ><Cart/></Modal>:null}
              <div className = "btn bg-black text-white mx-2"  onClick={handleLogout} >Logout</div>
  
  </> }
            <div className="d-flex justify-content-center ms-auto btn text-white mx-2" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn bg-black text-white mx-2" type="button" onClick={handleSearch}>
          Search
        </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
