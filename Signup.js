import React, { useState } from 'react'
import { Link } from 'react-router-dom'


export default function Signup() {
  const [credentials, setcredentials] = useState({ name: "", email: "", password: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/cuser", {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
  
      const json = await response.json();
      console.log(json);
      if (!json.success) {
        alert("Enter valid credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Error while creating user");
    }
  };
  
  
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
    
  }
  return (

    <div className="container">


      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group ">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input type="name" name="name" value={credentials.name} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />

          </div>
          <div className="form-group ">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name="email" value={credentials.email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />

          </div>
          <div className="form-group ">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" name="password" value={credentials.password} onChange={onChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>

          <button type="submit" className="m-3 btn btn-sucess">Submit</button>
          <Link to="/Login" className="m-3 btn btn-danger">You are already user</Link>
        </form>
      </div>
    </div>
  )
}
