import React from 'react'
import { useState } from 'react'
import './Login.css';
import LoginHeader from '../Components/LoginHeader';
import Squares from '../Components/Squares';
import { Link, useNavigate } from 'react-router-dom';


  
export const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('') 
    const navigate = useNavigate();

    const handleSubmit = async (e) => { 
        e.preventDefault() 
        const loginInfo = {
            email,
            password
        };
        try {
            const response = await fetch('http://localhost:4000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            //Stores the important data that needs to be passed as a prop.
            const data = await response.json();
            if (response.status == 200) {
                // If the user has verified their email they are sent to the correct homepage.
                if (data.user.userStatus == 'ACTIVE') {
                    if (data.user.admin) {
                        navigate('/adminhome' , { state: { loginData: data } });
                    } else {
                        navigate('/homepage' , { state: { loginData: data } });

                    }
                } 
                if (data.user.userStatus == 'INACTIVE') {
                    const userData = {
                        email,
                    }
                    navigate('/verification' , {state: {userData: userData}});
                }
                if (data.user.userStatus == 'SUSPENDED') {
                    setErrorMessage('Your account has been suspended. Contact an administrator for more information.')
                }
            } else {
                setErrorMessage(data.msg);
            }
        } catch (error) {
            // Possibly get rid of this or change it to setErrorMessage
            console.error(error);
        }
    }

    return (
        <div>
            {errorMessage && <p className="login-error-message">{errorMessage}</p>}
            <LoginHeader />
            <Squares />
        <div className="login-auth-form-container">
            <h2 className="login-form-header">Log in</h2> 
            <form className='login-form' onSubmit={handleSubmit}> 
                <label htmlForm="text" class='login-label'>Email</label>
                <input  className="login-input-field" value={email} onChange={(e) => setEmail(e.target.value)} type="text" />    
                <div class="resetalign-container">
                    <label htmlForm="text" class='login-label'>Password</label>
                    <Link to="/resetpassword" className="forgotpasslink">Forgot password</Link>
                </div>
                <input  className="login-input-field" value={password} onChange={(e) => setPassword(e.target.value)} type="password" /> 
                    <button className="login-button" type="submit">
                        <p class="login-button-text">Log in</p>
                    </button>
            </form>
            <p class="login-before-switch-text">Don't have an account?</p>
            <Link to="/signup" className="login-switch-form-text">Sign up here</Link>


        </div>  
        </div>
    )
}