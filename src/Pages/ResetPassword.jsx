import React from 'react'
import { useState } from 'react'
import './ResetPassword.css';
import LoginHeader from '../Components/LoginHeader';
import Squares from '../Components/Squares';
import { Link, useNavigate } from 'react-router-dom';


  
export const ResetPassword = (props) => {
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('') 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault() 
        const newPassword = "" + Math.floor(Math.random() * 900000 + 100000);
        const resetInfo = {
            password: newPassword,
        };
        try {
            const userResponse = await fetch('http://localhost:4000/api/users/'+email, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(resetInfo)
            });
            var userData = await userResponse.json();
            if (userResponse.status == 200) {
                const emailInfo = {
                    emails: [email],
                    subject: "Password Reset Successful",
                    // Later we will generate a code based on the user and pass it as a prop
                    message: "Here is your new generated password: "+newPassword+" , you may change your password at any time in the editProfile menu."
                };
                const emailResponse = await fetch('http://localhost:4000/api/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailInfo)
                });
                const emailData = await emailResponse.json();
                navigate('/login');
            } else {
                setErrorMessage("There is no user with this given email.");
            }
        } catch (error) {
            setErrorMessage("Please enter your email.")
        }
    }

    return (
        <div>
            {errorMessage && <p className="reset-error-message">{errorMessage}</p>}
            <LoginHeader />
            <Squares />
        <div className="login-auth-form-container">
            <h2 className="login-form-header">Password Reset</h2> 
            <p className="password-reset-description">Enter your email and we will send you instructions to reset your password</p>
            <form className='login-form' onSubmit={handleSubmit}> 
                <label htmlForm="text" class='login-label'>Email</label>
                <input  className="login-input-field" value={email} onChange={(e) => setEmail(e.target.value)} type="text" />    

                    <button className="login-button" type="submit">
                        <p class="login-button-text">Send Reset Email</p>
                    </button>

            </form>
            <Link to="/login" className="login-switch-form-text">Cancel</Link>
        </div>  
        </div>
    )
}