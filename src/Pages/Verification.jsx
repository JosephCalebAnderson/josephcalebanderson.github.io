import React from "react";
import { useEffect , useState } from "react";
import './Verification.css';
import Squares from "../Components/Squares";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Verification = (props) => {
    const [email, setEmail] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [code, setCode] = useState()
    const [userData, setUserData] = useState();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state != null) {
          setCode(location.state.verificationCode);
          setUserData(location.state.userData);
          setEmail(location.state.userData.email);
        }
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (verificationCode == code) {
            const verifyInfo = {
                userStatus: 'ACTIVE'
            };
            try {
                // Update the user so they are active.
                let id = userData._id;
                let route = 'http://localhost:4000/api/users/id/'+id
                // Set the user as active because they have now verified their email.
                await fetch(route, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(verifyInfo)
                });
                // This will send the user an email confirming their account has been created.
                const userEmail = email;
                const emailInfo = {
                    emails: [userEmail],
                    subject: "Thank you for joining bigscreenbook!",
                    message: "Your account is now active. You may now book tickets for your favorite movies!",
                };
                    const emailResponse = await fetch('http://localhost:4000/api/emails', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(emailInfo)
                    });
                    const emailData = await emailResponse.json();
            } catch (error) {
                // Possibly get rid of this or change it to setErrorMessage
                console.error(error);
            }
            if (userData.admin) {
                navigate('/adminhome' , { state: { loginData: {user: userData}}});
            } else {
                navigate('/homepage', { state: { loginData: {user: userData}}});
            }
        } else if (code == null) {
            setErrorMessage("Verification Code has expired, please request a new one.");
        } else {
            setErrorMessage("Incorrect Verification Code");
        }
    }

    // Possibly have this generate a new code when it is sent if we have time.
    const handleEmailResend = async (e) => {
        e.preventDefault()
        try {
            // This will get the user data from the given email if it was not passed from signup.
            var userFound = true;
            if (userData == null || userData._id == null) {
                userFound = await getUserData();
                console.log(userFound);
            }
            if (userFound) {
                const newVerificationCode = Math.floor(Math.random() * 9000 + 1000);
                setCode(newVerificationCode);
                    const resendEmailInfo = {
                        emails: [email],
                        subject: "Verify Your Email",
                        message: "Use the following code to verify your email address: "+newVerificationCode,
                    };
                const resendEmailResponse = await fetch('http://localhost:4000/api/emails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(resendEmailInfo)
                });
                console.log(userData);
                const resendEmailData = await resendEmailResponse.json();
                setErrorMessage('');
            } else {
                setErrorMessage("No User found with the given email");
            }
        } catch (error) {
            // Possibly get rid of this or change it to setErrorMessage
            console.error(error);
        }
    }

    const getUserData = async () => {
        try {
                let userEmail = email;
                let route = 'http://localhost:4000/api/users/'+email
                const newUserResponse = await fetch(route, {
                    method: 'Get',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const newUserData = await newUserResponse.json();
                // This if statement could be removed if the route is updated to be findOne
                if (newUserData == null) {
                    return false;
                }
                if (newUserData.length>1) {
                    return false
                }
                setUserData(newUserData);
                return true;
        } catch (error) {
            // Possibly get rid of this or change it to setErrorMessage
            console.error(error);
        }
    }
    return (
        <div className="ver-form-container">
            {errorMessage && <p className="ver-error-message">{errorMessage}</p>}
            <h2 className="ver-form-header">Your verification code will be sent to your email</h2> 
            <form className="ver-form" onSubmit={handleSubmit}> 
            <label htmlForm="Email" class='signup-label'>Email Address</label>
                 <input className="signup-input-field" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="JohnDoe@mail.com" />
                <label className="ver-field-head" htmlForm="text">Verification Code</label>
                <input className="ver-input-field" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} type="text" placeholder="Enter your code" />
                <button class= "ver-butt" type="submit">Take me to the movies</button>
               </form>
                <p className="ver-switch-form-text">Don't see your code?{' '} <span class="ver-switch-link"onClick={handleEmailResend}>Re-send email</span> </p>
        </div>
    )
}