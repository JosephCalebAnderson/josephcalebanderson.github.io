import React, { useEffect } from "react";
import './AdminEditUsers.css';
import AdminHeader from "../Components/AdminHeader";
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import { useParams } from "react-router-dom";
import { set } from "mongoose";
import { useNavigate } from 'react-router-dom';

export const AdminEditUsers = (props) => {
    const [errorMessage, setErrorMessage] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhone] = useState('')
    const [promotions, setSignupForPromotions] = useState(false)
    const [dob, setDob] = useState('')
    const [admin, setAdmin] = useState(false)
    const [fullName, setFullName] = useState('')
    const [userStatus, setUserStatus] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    var [cardId, setCardId] = useState('')
    const [billingId , setBillingId] = useState('')
    const [passwordNew, setPasswordNew] = useState('')
    var [passCorrect, setPassCorrect] = useState(false)

    //Variables for if there is a second card
    var [cardType2, setCardType2] = useState('')
    var [cardName2, setCardName2] = useState('')
    var [cardNumber2, setCardNumber2] = useState('')
    var [cardExpiration2, setCardExp2] = useState('')
    var [cardCvv2, setCardCvv2] = useState('')
    var [cardId2, setCardId2] = useState('')
    //Variables for if there is a third card
    var [cardType3, setCardType3] = useState('')
    var [cardName3, setCardName3] = useState('')
    var [cardNumber3, setCardNumber3] = useState('')
    var [cardExpiration3, setCardExp3] = useState('')
    var [cardCvv3, setCardCvv3] = useState('')
    var [cardId3, setCardId3] = useState('')

    const user = location.state.user;
    console.log(location.state);

    useEffect(() => {
        setUsername(user.username);
        // setPassword(user.password);
        setPhone(user.phoneNumber);
        setSignupForPromotions(user.promotions);
        setDob(user.dob);
        setAdmin(user.admin);
        setFullName(user.fullName);
        setUserStatus(user.userStatus);
        setEmail(user.email);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !phoneNumber || !dob || !fullName || !userStatus || !email) {
           // alert('Please fill out all required fields');
            console.log('Please fill out all required fields')
            setErrorMessage('Please fill out all required fields');
            return;
        }
        const userInfo = {
            email,
            //password,
            username,
            fullName,
            phoneNumber,
            dob,
            admin,
            promotions,
            userStatus
        };
        const userPass = {
            email,
            password
        };
        console.log(userPass);
        console.log(userInfo);
          
            try{
            const res = await fetch(`http://localhost:4000/api/users/id/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(userInfo),
            });
            const data = await res.json();
            console.log(data);
        }
        catch (error) {
            console.error(error);
           // alert(error);
           setErrorMessage(error);
        }

    // Send the new password to the backend
    if(password != ''){  
        try {
            const response = await fetch('http://localhost:4000/api/users/'+email, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userPass)
            });
            const data = await response.json();
            console.log(data);
            // Return to the manage users page
            navigate(-1)
        }
        catch (error) {
            // If the user is not added, alert the user
            console.error(error);
          //  alert(error);
            setErrorMessage(error);
        }
} else {
    // Return to the Manage Users Page
    navigate(-1)
}
    };


    return (
        <div id="AdminEditUsers">
        <AdminHeader />
        <BackButton />
        <form onSubmit={handleSubmit} className="adminEditUsersForm">
            <h3 class="h3-admin">Edit User Info</h3>
            <label className='adminLabel'>
            Username:
            <input type="text" className="textInput" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Password:
            <input type="text" className="textInput" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Phone Number:
            <input type="text" className="textInput" value={phoneNumber} onChange={(e) => setPhone(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Promotions?:
            <input type="checkbox" className="checkboxInput" checked={promotions} onChange={(e) => setSignupForPromotions(e.target.checked)} />
            </label>
            <label className='adminLabel'>
            Date of Birth:
            <input type="text" className="textInput" value={dob} onChange={(e) => setDob(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Admin?:
            <input type="checkbox" className="checkboxInput" checked={admin} onChange={(e) => setAdmin(e.target.checked)} />
            </label>
            <label className='adminLabel'>
            Full Name:
            <input type="text" className="textInput" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </label>
            <label className='adminLabel'>
            User Status:
            <input type="text" className="textInput" value={userStatus} onChange={(e) => setUserStatus(e.target.value)} />
            </label>
            <label className='adminLabel'>
            Email:
            <input type="text" className="textInput" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            
            <button type="submit" className="adminEditSubmitButton">Save</button>
            {errorMessage && <p className="errorMessage-admineditu">{errorMessage}</p>}
        </form>
        </div>
      

    );
};
  