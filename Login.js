import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/loginuser", {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({email: credentials.email, password: credentials.password })
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch');
      }
  
      const json = await response.json();
      console.log(json);
      if (!json.success) {
       
        alert("Enter valid credentials");
      }
      if (json.success) {
        localStorage.setItem("userEmail",credentials.email)
        localStorage.setItem("authToken",json.authToken)
        console.log(localStorage.getItem(json.authToken))
       return navigate("/");
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
  <form onSubmit={handleSubmit}>

      
          <div className="form-group ">
          
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name="email" value={credentials.email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />

          </div>
          <div className="form-group ">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" name="password" value={credentials.password} onChange={onChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>

          <button type="submit" className="m-3 btn btn-sucess">Submit</button>
          <Link to="/Signup" className="m-3 btn btn-danger">I am a new user</Link>
        </form>
      </div>
    
  )
}