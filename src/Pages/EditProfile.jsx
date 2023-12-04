import React from "react";
import { useEffect,useState } from "react";
import "./EditProfile.css";
import Header from '../Components/Header';
import BackButton from '../Components/BackButton';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { set } from "mongoose";

export const EditProfile = (props) => {
   
    //Set the inital state of the fields based on the information from the back end
    const [errorMessage, setErrorMessage] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [phoneNumber, setPhone] = useState('')
    var [cardType, setCardType] = useState('')
    var [cardName, setCardName] = useState('')
    var [cardNumber, setCardNumber] = useState('')
    var [cardExpiration, setCardExp] = useState('')
    var [cardCvv, setCardCvv] = useState('')
    const [street, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZip] = useState('')
    const [promotions, setSignupForPromotions] = useState(false)
    const [userCards, setUserCards] = useState([])
    const [userBilling, setUserBilling] = useState([])
    const [dob, setDob] = useState('')
    const [admin, setAdmin] = useState(false)
    const [fullName, setFullName] = useState('')
    const [userStatus, setUserStatus] = useState('')
    const [email, setEmail] = useState('')
    const [hasBilling, setHasBilling] = useState()
    const [hasCard, setHasCard] = useState()
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


    // User information is stored here in loginData.user
    // Start of Calebs change
    var loginData = {user: {_id: "0"}};
    if (location.state == null || location.state.loginData == null) {
        navigate('/login');
    } else {
        loginData = location.state.loginData;
        console.log(loginData);
    }
    //End of Calebs Change

    // Rileys version
    //const loginData = location.state.loginData;
    // End of Rileys version
    const[userId, setUserId] = useState(loginData.user._id)
    
    //Get the user information from the backend
    useEffect(() => {
        const getUserInfo = () => {
            fetch(`http://localhost:4000/api/users/id/${loginData.user._id}`, {
                method: "GET",
            })
            .then((res) => res.json())
            .then((data) => {
            //distribute the data to the different fields
            setEmail(data.email);
            setPassword(data.password);
            setUsername(data.username);
            setFullName(data.fullName);
            setPhone(data.phoneNumber);
            setDob(data.dob);
            setAdmin(data.admin);
            setUserStatus(data.userStatus);
            setSignupForPromotions(data.promotions);
            });
        };
        getUserInfo();
    }, []);

    //Get the user payment information from the backend
    useEffect(() => {
        const getUserPayment = () => {
            fetch(`http://localhost:4000/api/paymentCards/${loginData.user._id}`,{method: "GET"})
            .then((res) => res.json())
            .then((data) => {
                //Data is an array of cards where the format of an array is type: '', nameOnCard: '', cardNum: '', expiration: '', cvv: ''
                //3 different card objects can be stored in the array meaning that the array should have a length of 3

                //If there is something stored in the data base then the user has a card and the length of the array will be greater than 0
                if(data.length > 0){
                    //get the data from the database
                    const cardData = data;
                    //Set up the circumstance for if the user has one card
                    if(data.length == 1){
                        //set the userCards array to the data from the database
                        console.log("One card found")
                        //console.log(cardData)
                        console.log(cardData[0])
                        setUserCards(cardData);
                        //set the hasCard to true
                        setHasCard(true);
                        //set the cardId to the id of the card in the database
                        //Each card has a unique id
                        setCardId(data[0]._id);
                    }
                    else if(data.length == 2){
                        console.log("Two cards found")
                        console.log(cardData)
                        console.log(cardData[0])
                        setUserCards(cardData);
                        setHasCard(true);
                        //set the cardId[0] and the cardId[1] to the id of the two different cards in the database
                        setCardId(data[0]._id, data[1]._id);
                    }
                    else if(data.length == 3){
                        console.log("Three cards found")
                        console.log(cardData)
                        setUserCards(cardData);
                        setHasCard(true);
                        //set the cardId[0], cardId[1], and cardId[2] to the id of the three different cards in the database
                        setCardId(data[0]._id, data[1]._id, data[2]._id);
                    }
                }
                //If the user does not have a card then set the hasCard to false
                else{
                    console.log("No card found")
                    setHasCard(false);
                    console.log(hasCard)
                }
            })
            .catch((err) => {
                console.log(err);
            });
        };
        getUserPayment();
    }, []);
    
    //Get the user billing information from the backend
    useEffect(() => {
        const getUserAddress = () => {
            fetch(`http://localhost:4000/api/addresses/${loginData.user._id}`,{method: "GET"})
            .then((res) => res.json())
            .then((data) => {
                //If the user has an address then set the hasBilling to true
                if(data != null){
                    console.log(data)
                    const addressData = data
                    setUserBilling([addressData]);
                    setHasBilling(true);
                    setBillingId(data._id)
                } 
                //If the user does not have an address then set the hasBilling to false
                else{
                    console.log("No address found")
                    setHasBilling(false);
                }
            //console.log(data)
            //console.log(hasBilling)
            })
            .catch((err) => {
                console.log(err);
            });
        };
        getUserAddress();
    }, []);
            
    //Add the cardInfo to the userCards array
    const addCard = () => {
        //console.log("addCard")
        console.log(userCards.length)
        //If the userCards array is empty then add a new card to the array
        if(userCards.length < 3){
            // console.log("addCard")
            // const newCard = {type: '', nameOnCard: '', cardNum: '', expiration: '', cvv: ''}
            // //add the new card to the userCards array
            // setUserCards([...userCards, newCard])
            // setHasCard(true)
            setUserCards([...userCards, {cardType: '', cardName: '', cardNumber: '', cardExp: '', cardCvv: ''}])
        
        }
    }

    //Add the billingInfo to the userBilling array
    const addBilling = () => {
        if(userBilling.length < 1){
            setUserBilling([...userBilling, {street: '', city: '', state: '', zipCode: ''}])
            setHasBilling(true)
        }
    }

    const removeCard = (index) => {
        const list = [...userCards]
        list.splice(index, 1)
        setUserCards(list)
        if(userCards.length == 0){
            setHasCard(false)
        }
    }

    const removeBilling = (index) => {
        const list = [...userBilling]
        list.splice(index, 1)
        setUserBilling(list)
        if(userBilling.length == 0){
            setHasBilling(false)
        }
     }

    //Update the cardInfo in the userCards array
    const handleCardChange = (e, index) => {
        const {name, value} = e.target
        const list = [...userCards]
        console.log(list)
        list[index][name] = value
        console.log(list)
        setUserCards(list)
    }


    //Update the billingInfo in the userBilling array
    const handleBillingChange = (e, index) => {
        const {name, value} = e.target
        const list = [...userBilling]
        list[index][name] = value
        //console.log(list)
        setUserBilling(list)
    }

    const handlePasswordChange = (e) => {
        setPasswordNew(e.target.value)
    }

    const handleCard = () => {
        //If the card array is not empty then add the values to the card object
        console.log(userCards)
        console.log(userCards.length)
        if(userCards.length  === 1){    
            setCardType(userCards[0].cardType)
            setCardName(userCards[0].cardNumber)
            setCardNumber(userCards[0].cardName)
            setCardExp(userCards[0].cardExp)
            setCardCvv(userCards[0].cardCvv)
        }
        else if(userCards.length === 2){
            setCardType2(userCards[1].cardType)
            setCardName2(userCards[1].cardNumber)
            setCardNumber2(userCards[1].cardName)
            setCardExp2(userCards[1].cardExp)
            setCardCvv2(userCards[1].cardCvv)
        }
        else if(userCards.length === 3){
            setCardType3(userCards[2].cardType)
            setCardName3(userCards[2].cardNumber)
            setCardNumber3(userCards[2].cardName)
            setCardExp3(userCards[2].cardExp)
            setCardCvv3(userCards[2].cardCvv)
        }
    }
    const handleBilling = () => {
        //If the billing array is not empty then add the values to the billing object
        if(userBilling.length > 0){
            setStreetAddress(userBilling[0].street)
            setCity(userBilling[0].city)
            setState(userBilling[0].state)
            setZip(userBilling[0].zipCode)
        }
    }

    //Submit the form
    const handleSubmit = async (e) => { 
        e.preventDefault() 
        //User Info
        const userInfo = {
            email,
            //password,
            username,
            fullName,
            phoneNumber,
            dob,
            admin,
            userStatus,
            promotions
        };
        const passwordInfo = {
            password : passwordNew
        }
        // //Payment Info
        const paymentInfo = {
            userID: userId,
            cardNum: cardNumber,
            expiration: cardExpiration,
            type: cardType,
            nameOnCard: cardName,
            cvv : cardCvv
        };
        const paymentInfo2 = {
            userID: userId,
            cardNum: cardNumber2,
            expiration: cardExpiration2,
            type: cardType2,
            nameOnCard: cardName2,
            cvv : cardCvv2
        };
        const paymentInfo3 = {
            userID: userId,
            cardNum: cardNumber3,
            expiration: cardExpiration3,
            type: cardType3,
            nameOnCard: cardName3,
            cvv : cardCvv3
        };
        // //Billing Info
        const billingInfo = {
            userID: userId,
            street : street,
            city : city,
            state : state,
            zipCode : zipCode
        };
        
        //Send userInfo to backend first
        try{
            console.log(userInfo)
            //password = loginData.user.password;
            const response = await fetch(`http://localhost:4000/api/users/id/${loginData.user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(userInfo)
            });
            const data = await response.json();
            console.log(data);
           
        } catch (error) {
            console.error(error);
        } 
        //Send passwordInfo to backend
        try {
            //Compare the password and verify password fields
            //check if verify password is the same as password stored in the backend

            const logininfo = {
                email,
                password : verifyPassword
            };
            console.log(logininfo)
            //check the backend route to see if the password is correct
            if(verifyPassword !== '') {
                const response = await fetch('http://localhost:4000/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(logininfo)
                });
                const data = await response.json();
                if(response.status === 200){
                    console.log("Password is correct")
                    passCorrect = true;
                }
                else{
                    console.log("Password is incorrect")
                    passCorrect = false;
                    setErrorMessage("Password is incorrect");
                }
                console.log(data);
            }
        
            //If passCorrect is true then update the password in the backend with the newPassword
            if(passCorrect === true){
                console.log("New Password" + passwordNew)
                console.log("Updating Password")
                if(passwordNew === '') {
                    setErrorMessage("Password cannot be empty");
                }
                else {
                    const userResponse = await fetch('http://localhost:4000/api/users/'+email, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(passwordInfo)
            });
            console.log(passwordInfo)
        }
    }
} catch (error) {
    console.error(error);
}   
        //Send paymentInfo to backend
        if(userCards.length > 0){
            if(userCards.length === 1){
                try{
                    handleCard();
                    //console.log(paymentInfo)
                    const response = await fetch('http://localhost:4000/api/paymentCards', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(paymentInfo)
                    });
                    const data = await response.json();
                    console.log(data);
                    cardId = data._id;
                } catch (error) {
                    console.error(error);
                }
            }
            else if(userCards.length === 2){
                try{
                    handleCard();
                    //console.log(paymentInfo)
                    const response = await fetch('http://localhost:4000/api/paymentCards', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(paymentInfo2)
                    });
                    const data = await response.json();
                    console.log(data);
                    cardId = data._id;
                } catch (error) {
                    console.error(error);
                }
            }
            else if(userCards.length === 3){
                try{
                    handleCard();
                    //console.log(paymentInfo)
                    const response = await fetch('http://localhost:4000/api/paymentCards', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(paymentInfo3)
                    });
                    const data = await response.json();
                    console.log(data);
                    cardId = data._id;
                } catch (error) {
                    console.error(error);
                }
            }
        //logic for if card 2 or three was deleted needs to be in here but i am not sure how to do it
            //If the card length is 0 
            //Remove all the cards that were removed
            //if the card length is 1 but it used to be higher
            //Remove all the cards that were removed
            //if the card length is 2 but it used to be higher
            //Remove all the cards that were removed



        else if(userCards.length == 0 && cardId !== ''){
            try{
                const response = await fetch(`http://localhost:4000/api/paymentCards/${cardId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
    }

        // //Send billingInfo to backend
        if(userBilling.length > 0){
            try{
                handleBilling();
                console.log(billingInfo)
                //http://localhost:4000/api/addresses
                const response = await fetch('http://localhost:4000/api/addresses/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(billingInfo)
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }  
        else if(userBilling.length == 0 && billingId !== ''){
            try{
                const response = await fetch(`http://localhost:4000/api/addresses/${billingId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
        //alert('Account information updated successfully')
        setErrorMessage('Account information updated successfully')
    };
    

    return (
        <div>
            <Header />
            <BackButton />
        <div className="edit-form-container">
        {errorMessage && <p className="editprof-error-message">{errorMessage}</p>}
            <h2 className="profile-form-header">Edit Profile</h2> 
            <form className="edit-form" onSubmit={handleSubmit}>
                <div className="column-container">
                <div className="user-info">
                <h3 className="user-subheader">User Info</h3>
                <label htmlForm="Username">Username</label>
                <input className="profile-input-field" value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
                <label htmlForm="new-password">New Password</label>
                <input className="profile-input-field" value={passwordNew} onChange={handlePasswordChange} type="password" />
                <label htmlForm="pswd">Verify Old Password</label>
                <input className="profile-input-field" value={verifyPassword} onChange={(e) => setVerifyPassword(e.target.value)} type="password" />
                <label htmlForm="Phone nr.">Phone Number</label>
                <input className="profile-input-field" value={phoneNumber} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="" />
                <label id="opt-in-to-edit-info-label-promotions">
                Signup for Promotions?
                <input type="checkbox" checked={promotions} onChange={(e) => setSignupForPromotions(e.target.checked)} className="checkboxInputSignup" />
                </label>
                </div>
                
                <div className="card-info">
                <h3 className="card-subheader">Card Info</h3>
                {/* {hasCard &&  */}
            {/* Set up for one card */}
                    {userCards.map((card, index) => (
                    <div key={index}>
                        <label htmlFor={`cardType-${index}`}>Card Type</label>
                        <input 
                        className="profile-input-field" 
                        type="text" name="cardType" 
                        value={userCards[index]?.cardType || card.type} 
                        //value={card.type} 
                        onChange={e => handleCardChange(e, index)} 
                        id={`cardType-${index}`} />

                        <label htmlFor={`cardName-${index}`}>Card Name</label>
                        <input 
                        className="profile-input-field" 
                        type="text" name="cardName" 
                        value={userCards[index]?.cardName  || card.nameOnCard} 
                        onChange={e => handleCardChange(e, index)} 
                        id={`cardName-${index}`} />

                        <label htmlFor={`cardNumber-${index}`}>Card Number</label>
                        <input 
                        className="profile-input-field" 
                        type="text" name="cardNumber" 
                        value={userCards[index]?.cardNumber || card.cardNum} 
                        onChange={e => handleCardChange(e, index)} 
                        id={`cardNumber-${index}`} />

                        <label htmlFor={`cardExp-${index}`}>Card Expiration</label>
                        <input 
                        className="profile-input-field" 
                        type="text" name="cardExp" 
                        value={userCards[index]?.cardExp || card.expiration} 
                        onChange={e => handleCardChange(e, index)} 
                        id={`cardExp-${index}`} />

                        <label htmlFor={`cardCvv-${index}`}>Card CVV</label>
                        <input 
                        className="profile-input-field" 
                        type="text" name="cardCvv" 
                        value={userCards[index]?.cardCvv ||card.cvv} 
                        onChange={e => handleCardChange(e, index)} 
                        id={`cardCvv-${index}`} />
                
                        <button className="remove-card-button" type="button" onClick={() => removeCard(index)}>Remove Card</button>
                    </div>
                ))}
                {(userCards.length < 3 || userCards.length === 0) && (
                    <button className="add-card-button" type="button" onClick={addCard}>Add Card</button>
                )}
                </div>
               
           
                <div className="billing-info">
                <h3 className="billing-subheader">Billing Info</h3>
                {/* {hasBilling ? ( */}
                {userBilling.map((billing, index) => (
                    <div key = {index}>
                        <label htmlFor={`street-${index}`}>Street Address</label>
                        <input className = "profile-input-field" type = "text" name = "street" value = {userBilling[0]?.street || billing.street} onChange = {e => handleBillingChange(e, index)} id = {`street-${index}`} />

                        <label htmlFor={`city-${index}`}>City</label>
                        <input className = "profile-input-field" type = "text" name = "city" value = {userBilling[0]?.city || billing.city} onChange = {e => handleBillingChange(e, index)} id = {`city-${index}`} />

                        <label htmlFor={`state-${index}`}>State</label>
                        <input className = "profile-input-field" type = "text" name = "state" value = {userBilling[0]?.state || billing.state} onChange = {e => handleBillingChange(e, index)} id = {`state-${index}`} />

                        <label htmlFor={`zipCode-${index}`}>Zip</label>
                        <input className = "profile-input-field" type = "text" name = "zipCode" value = {userBilling[0]?.zipCode || billing.zipCode} onChange = {e => handleBillingChange(e, index)} id = {`zipCode-${index}`} />

                        <button className = "remove-billing-button" type = "button" onClick = {() => removeBilling(index)}>Remove Address</button>
                    </div>
                ))}
                {userBilling.length < 1 && (
                <button className = "add-billing-button" type = "button" onClick = {addBilling}>Add Address</button>
                )
}   
                
            
                </div>
                </div>

                <button className="edit-submit-butt" type="submit" onClick={handleSubmit} class='profile-submit-button'>Save Changes</button>
            </form>
        </div>
        </div>
    )
}