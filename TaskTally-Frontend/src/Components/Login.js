import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import host from '../Context/task/config';

const Login = (props) => {
    let navigate = useNavigate();
    const [credential, setCredential] = useState({ email: '', password: '' });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        const json = await response.json();
        if(json.success){
            localStorage.setItem('token', json.authToken);
            props.showAlert('Login successfully', 'success');
            navigate('/');
        }else{
            props.showAlert('Invalid credentials', 'danger');
        }
    }

    const onChange = (event) => {
        setCredential({ ...credential, [event.target.name]: event.target.value });
    }
    return (
        <div className='container my-3'>
            <h1>Please, login to continue...</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={credential.email}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="password" onChange={onChange} value={credential.password}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login