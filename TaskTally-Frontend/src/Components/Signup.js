import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
const host = "http://localhost:5000";

const Signup = (props) => {
  let navigate = useNavigate();
  const [credential, setCredential] = useState({ name: '', email: '', password: '', cpassword: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      props.showAlert('Signup successfully', 'success');
      navigate('/');
    } else {
      props.showAlert('Invalid credentials', 'danger');
    }
  }

  const onChange = (event) => {
    setCredential({ ...credential, [event.target.name]: event.target.value });
  }

  return (
    <div className='container'>
      <h1>Create account to continue...</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onChange} value={credential.name} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={onChange} name='email' value={credential.email} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={credential.password} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} value={credential.cpassword} />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  )
}

export default Signup