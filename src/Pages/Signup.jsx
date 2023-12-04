import React from "react"
import { useState } from "react"
import { Verification } from "../Pages/Verification"
import "./Signup.css";
import LoginHeader from "../Components/LoginHeader";
import Squares from "../Components/Squares";
import { Link, useNavigate } from "react-router-dom";

export const Signup = (props) => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [addPaymentInfo, setAddPaymentInfo] = useState(false)
  const [addAddressInfo, setAddAddressInfo] = useState(false)
  const [cardName, setCardName] = useState('')
  const [cardType, setCardType] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExp, setCardExp] = useState('')
  const [cardCVV, setCardCVV] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [stateOR, setStateOR] = useState('')
  const [zip, setZip] = useState('')
  const [signupForPromotions, setSignupForPromotions] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    setErrorMessage('');
    e.preventDefault()
    var processFailed = false;
    var successes = 0;
    const signupInfo = {
      username,
      password,
      fullName,
      email,
      phoneNumber,
      dob,
      promotions: signupForPromotions,
      admin: false,
    };
    try {
      const userResponse = await fetch('http://localhost:4000/api/users/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(signupInfo)
      });
      var userData = await userResponse.json();
      if (userResponse.status == 200) {
        successes = 1;
        // This will add a payment card if desired
        if (addPaymentInfo) {
          const cardInfo = {
            userID: userData._id,
            type: cardType,
            cardNum: cardNumber,
            expiration: cardExp,
            nameOnCard: cardName,
            cvv: cardCVV,
          };
          const cardResponse = await fetch('http://localhost:4000/api/paymentCards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardInfo)
          });
          var cardData = await cardResponse.json();
          if (cardResponse.status == 200) {
            successes = 2;
          } else {
            processFailed = true;
            setErrorMessage(cardData.msg);
          }
        }
        // This will add an address if desired
        if (addAddressInfo && !processFailed) {
          const addressInfo = {
            userID: userData._id,
            street,
            city,
            state: stateOR,
            zipCode: zip,
          };
          const addressResponse = await fetch('http://localhost:4000/api/addresses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addressInfo)
          });
          var addressData = await addressResponse.json();
          if (addressResponse.status == 200) {
          } else {
            processFailed = true;
            setErrorMessage(addressData.msg);
          }
        }
      } else {
          // Will need to send this to the screen somehow
          setErrorMessage(userData.msg);
          processFailed = true;
      }
      if (processFailed) {
        // Only the user was created. It now needs to be deleted.
        if (successes == 1) {
          let id = userData._id;
          let route = 'http://localhost:4000/api/users/id/'+id;
          await fetch(route, {
            method: 'DELETE',
          });
        }
        // The user and the card were created. They now need to be 
        if (successes == 2) {
          let paymentId = cardData._id;
          let paymentRoute = 'http://localhost:4000/api/paymentCards/'+paymentId;
          await fetch(paymentRoute, {
            method: 'DELETE',
          });
          let userId = userData._id;
          let userRoute = 'http://localhost:4000/api/users/id/'+userId;
          await fetch(userRoute, {
            method: 'DELETE',
          });
        }
      } else {
        const verificationCode = Math.floor(Math.random() * 9000 + 1000);
        const emailInfo = {
          emails: [email],
          subject: "Verify Your Email",
          message: "Use the following code to verify your email address: "+verificationCode,
        };
          const emailResponse = await fetch('http://localhost:4000/api/emails', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(emailInfo)
          });
          const emailData = await emailResponse.json();
          navigate('/verification' , {state: {userData: userData, verificationCode: verificationCode}}); 
      }
    } catch (error) {
      // Possibly get rid of this or change it to setErrorMessage
      console.error(error);
    }

  }

  return (
      <div className="signup-auth-form-container">
        {errorMessage && <p className="signup-error-message">{errorMessage}</p>}
        <LoginHeader />
        <Squares />
      <h2 className="signup-form-header">Create your account</h2> 
      <form className="signup-form" onSubmit={handleSubmit}> 
        <div className="signup-column-container">
          <div className="signup-user-info">
          <h3 className="signup-user-subheader">User Info</h3>
          <label htmlForm="Full name" class='signup-label'>Full Name</label>
          <input className="signup-input-field" value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" placeholder="John Doe" />
          <label htmlForm="Email" class='signup-label'>Email Address</label>
          <input className="signup-input-field" value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="JohnDoe@mail.com" />
          <div class='signupTwoInputs'>
            <div class="signupTwoInputs-input">
              <label htmlForm="Username" class='signup-label'>Username</label>
              <input className="signup-input-field signupinputsmall" value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="JohnDoe123" />    
            </div>
            <div class="signupTwoInputs-input">
              <label htmlForm="pswd" class='signup-label'>Password</label>
              <input className="signup-input-field signupinputsmall" value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="*********" /> 
            </div>
          </div>
          
          <div class='signupTwoInputs'>
            <div class="signupTwoInputs-input">
              <label htmlForm="Phone nr." class='signup-label'>Phone Number</label>
              <input className="signup-input-field signupinputsmall" value={phoneNumber} onChange={(e) => setPhone(e.target.value)} type="text" placeholder="123-456-7890" />
            </div>
            <div class="signupTwoInputs-input">
              <label htmlForm="DOB" class='signup-label'>Date of Birth</label>
              <input className="signup-input-field signupinputsmall" value={dob} onChange={(e) => setDob(e.target.value)} type="text" placeholder="MM/DD/YYYY" />
            </div>
          </div>
          </div>

        <div className="opt-in-to-add-info">
          <label id='opt-in-to-add-info-label'>
            Add Payment Info?
            <input type="checkbox" checked={addPaymentInfo} onChange={(e) => setAddPaymentInfo(e.target.checked)} className="checkboxInputOpt" />
          </label>
        </div>
          {addPaymentInfo && (
          <div className="signup-card-info">
          <h3 className="signup-card-subheader">Card Info</h3>
          <label htmlForm="Card name" class='signup-label'>Name on Card</label>
          <input className="signup-input-field" value={cardName} onChange={(e) => setCardName(e.target.value)} type="text" placeholder="John Doe" />
          <label htmlForm="Card nr." class='signup-label'>Card Number</label>
          <input className="signup-input-field" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} type="text" placeholder="1234 5678 9012 3456" />
          <label htmlForm="Card type" class='signup-label'>Card Type</label>
                <input className="signup-input-field" value={cardType} onChange={(e) => setCardType(e.target.value)} type="text" placeholder="Visa" />
            <div class='signupTwoInputs'>
              <div class="signupTwoInputs-input">
              <label htmlForm="Card exp." class='signup-label'>Card Expiration</label>
                <input className="signup-input-field signupinputsmall" value={cardExp} onChange={(e) => setCardExp(e.target.value)} type="text" placeholder="MM/YY" />
              </div>
              <div class="signupTwoInputs-input">
                <label htmlForm="Card cvv" class='signup-label'>Card CVV</label>
                <input className="signup-input-field signupinputsmall" value={cardCVV} onChange={(e) => setCardCVV(e.target.value)} type="text" placeholder="123" />
              </div>
            </div>
          </div>
          )}
        <div className="opt-in-to-add-info">
          <label id='opt-in-to-add-info-label'>
            Add Address?
            <input type="checkbox" checked={addAddressInfo} onChange={(e) => setAddAddressInfo(e.target.checked)} className="checkboxInputOpt" />
          </label>
        </div>
          {addAddressInfo && (
          <div className="signup-address-info">
          <h3 className="signup-address-subheader">Address</h3>

          <label htmlForm="Street" class='signup-label'>Street Address</label>
          <input className="signup-input-field" value={street} onChange={(e) => setStreet(e.target.value)} type="text" placeholder="123 Main St." />
          <label htmlForm="City" class='signup-label'>City</label>
              <input className="signup-input-field" value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="New York" />
          <div class='signupTwoInputs'>
            <div class="signupTwoInputs-input">
              <label htmlForm="State" class='signup-label'>State</label>
              <input className="signup-input-field signupinputsmall" value={stateOR} onChange={(e) => setStateOR(e.target.value)} type="text" placeholder="New York" />
              </div>
            <div class="signupTwoInputs-input">
              <label htmlForm="Zip" class='signup-label'>Zip Code</label>
              <input className="signup-input-field signupinputsmall" value={zip} onChange={(e) => setZip(e.target.value)} type="text" placeholder="12345" />
            </div>
          </div>
        
          </div>
          )}
          </div>  
          <div class='signupSubmitContainer'>
            <label id="opt-in-to-add-info-label-promotions">
              Signup for Promotions?
              <input type="checkbox" checked={signupForPromotions} onChange={(e) => setSignupForPromotions(e.target.checked)} className="checkboxInputSignup" />
            </label>
            <button type="submit" className='signup-submit-button' onClick={handleSubmit}>Sign up</button>
          </div>
          </form>
          <p class="signup-before-switch-text">Already have an account?</p>
          <Link to="/login" className="signup-switch-form-text">Log in here</Link>
          
      </div>  
    )
}


