import React, { useEffect, useState } from 'react';
import './Order.css';
import Header from '../Components/Header';
import BackButton from '../Components/BackButton';
import creditcarddots from '../Images/creditcarddots.png';
import cardchip from '../Images/cardchip.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { set } from 'mongoose';

function Order() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const navigateBack = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');
    const [cardNum, setCardNum] = useState('');
    const [cvv, setCvv] = useState('');
    const [expiration, setExpiration] = useState('');
    const [promo, setPromo] = useState('');
    const [promotionInfo, setPromotionInfo] = useState();
    const [promotionNum, setPromotionNum] = useState("None");
    const [promotionName, setPromotionName] = useState("NONE");
    // Here is the array of payment Cards
    const [paymentCards, setPaymentCards] = useState('');
    const loginData = location.state.loginData;
    const movieData = location.state.movieData;
    const bookingData = location.state.bookingData;
    const showing = bookingData.showing;
    const ticketAmounts = bookingData.ticketCounts;
    const adultPrice = showing.adultPrice * ticketAmounts.Adult;
    const childPrice = showing.childPrice * ticketAmounts.Child;
    const seniorPrice = showing.seniorPrice * ticketAmounts.Senior;
    const seats = location.state.selectedSeats;
    const [subtotal, setSubtotal] = useState(adultPrice + childPrice + seniorPrice);
    const bookingFee = 1*showing.bookingFee;
    var taxes = 0.07 * subtotal;
    var total = 0+ 1*subtotal + 1*bookingFee + 1*taxes;
    const dateString = bookingData.showing.showDate.substring(0,3)+' '+bookingData.showing.showDate.substring(3);
    const movieInfoShowtime = dateString + ' at ' + location.state.bookingData.showing.showTime;
    var seatString = seats.join(', ');
    const [selectedCard, setSelectedCard] = useState(null);

    // This needs to be set up to take in addressInfo
    useEffect(() => {
        const fetchAddressData = async () => {
            setEmail(loginData.user.email);
          let route = 'http://localhost:4000/api/addresses/'+location.state.loginData.user._id;
          const Response = await fetch(route, {
              method: 'Get',
              headers: {
                  'Content-Type': 'application/json'
              },
          });
          const Data = await Response.json();
          console.log(Data)
          setStreet(Data.street);
          setCity(Data.city);
          setState(Data.state);
          setZipCode(Data.zipCode);
        }
        fetchAddressData()
        .catch(console.error);
        const fetchCardData = async () => {
            let route = 'http://localhost:4000/api/paymentCards/'+location.state.loginData.user._id;
            const paymentResponse = await fetch(route, {
                method: 'Get',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const paymentData = await paymentResponse.json();
            //console.log(paymentData);
            setPaymentCards(paymentData);

        }
        fetchCardData()
        .catch(console.error)
      }, []);

    
    const handlePromo = async () => {
        console.log(promo);
        let route = 'http://localhost:4000/api/promotions/getPromotion/'+promo;
        const promoResponse = await fetch(route, {
          method: 'Get',
          headers: {
              'Content-Type': 'application/json'
          },
        });
        const promoData = await promoResponse.json();
        if (promoData != null) {
            setErrorMessage('');
            setPromotionInfo(promoData);
            setPromotionNum(promoData._id);
            setPromotionName(promoData.name)
            console.log(promoData);
                setSubtotal(subtotal * promoData.amount);
                taxes = 0.07 * subtotal;
                total = 1*subtotal + 1*bookingFee + 1*taxes;
                total = total.toFixed(2);
                console.log('New total: '+total);
        } else {
            console.error('There is no promotion with that response');
            setErrorMessage('There is no promotion with that response');
        }
    }

    const handlePromoDelete = () => {
        setPromotionInfo(null);
        setSubtotal(subtotal / promotionInfo.amount);
                taxes = 0.07 * subtotal;
                total = 1*subtotal + 1*bookingFee + 1*taxes;
                total = total.toFixed(2);
                console.log('New total: '+total);
    }

    const handlePurchase = async (e) => {
        e.preventDefault()
        // Here is where the booking data will be stored in the data base.
            const bookingInfo = {
                showNum: bookingData.showing._id,
                customerNum: loginData.user._id,
                promotionNum: promotionNum,
                showRoom: bookingData.showing.showRoomNum,
                customerEmail: email,
                cardNum,
                cardName: nameOnCard,
                cardCvv: cvv,
                cardExp: expiration,
                movieTitle: movieData.Title,
                showDateAndTime: movieInfoShowtime,
                finalPrice: total.toFixed(2),
                seats: seatString,
                billingStreet: street,
                billingZipCode: zipCode,
                billingCity: city,
                billingState: state
            }
            console.log(bookingInfo)
            let bookingRoute = 'http://localhost:4000/api/bookings';
            const bookingResponse = await fetch(bookingRoute, {
              method: 'Post',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(bookingInfo)
            });
            const newBookingData = await bookingResponse.json(); 
            console.log(newBookingData);
            if (bookingResponse.status == 200) {
                // update the seats array.
                var seatArray = bookingData.showing.seats
                for (let k = 0; k < seats.length; k++) {
                    var takenSeat = seats[k];
                    var seatNum = 10 * (takenSeat.substring(0,1).charCodeAt(0) - 65) + (1 * takenSeat.substring(1)) - 1;
                    console.log(seatNum);
                    seatArray[seatNum] = false;
                }
                const showingInfo = {
                    seats: seatArray
                }
                let showingsRoute = 'http://localhost:4000/api/showings/'+movieData._id+'/'+bookingData.showing.showDate+'/'+bookingData.showing.showTime;
                const showingResponse = await fetch(showingsRoute, {
                    method: 'Put',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(showingInfo)
                  });
                  const showingData = await showingResponse.json();
                  console.log(showingData);
        // This will send the confirmation email.
        const bookingNumber = newBookingData._id.substring(14)
        const cardNum = "Place Hold"
        var ticketString = '';
        if (bookingData.ticketCounts.Adult != 0) {
            ticketString = ticketString + 'Adults: ' + bookingData.ticketCounts.Adult + ', ';
        }
        if (bookingData.ticketCounts.Child != 0) {
            ticketString = ticketString + 'Children: ' + bookingData.ticketCounts.Child + ', ';
        }
        if (bookingData.ticketCounts.Senior != 0) {
            ticketString = ticketString + 'Seniors: ' + bookingData.ticketCounts.Senior + ', ';
        }
        const emailInfo = {
            emails: [loginData.user.email],
            subject: "Thank you for your purchase. See you in the theater!",
            message: "Movie: " + movieData.Title + "\n"
            + "Showtime: " + movieInfoShowtime + "\n"
            + "Booking Number: " + bookingNumber + "\n"
            + "Tickets: " + ticketString + "\n"
            + "Seats: " + seatString + "\n"
            + "Promotion Used: " + promotionName + "\n"
            + "Order Total: " + (1*total).toFixed(2)
          };
            const emailResponse = await fetch('http://localhost:4000/api/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailInfo)
            });
            const emailData = await emailResponse.json();
            navigate('/confirmation', {state: {movieData, loginData, bookingData, price: total.toFixed(2), seats: seatString, bookingID: bookingNumber, cardNum: cardNum}});
        } else {
            console.log(newBookingData.msg)
        }
    }

    const handleBack = async (e) => {
        e.preventDefault()

        navigateBack(-1);
    }

    const handleCardClick = (index) => {
        setSelectedCard((prevSelected) => (prevSelected === index ? null : index));
        if (selectedCard === null) {
            setNameOnCard(paymentCards[index].nameOnCard);
            setCardNum(paymentCards[index].ending);
            setCvv(paymentCards[index].cvv);
            setExpiration(paymentCards[index].expiration);
        } else {
            setNameOnCard('');
            setCardNum('');
            setCvv('');
            setExpiration('');
        }
        
    };

    const renderSavedCards = () => {
        const savedCreditCards = [];
        if (paymentCards.length === 0) {
            console.log('no saved cards');
        } else {
            savedCreditCards.push (
                <label htmlForm="Saved Cards" id='orderLabel'>Saved Cards</label>
            );
            for (let i = 0; i < paymentCards.length; i++) {
                savedCreditCards.push(
                    <div key={i} className={`creditCard ${selectedCard === i ? 'selectedCard' : ''}`} onClick={() => handleCardClick(i)}>
                        <img className="cardchip" src={cardchip} alt="credit card chip"/>
                        <img className="creditcarddots" src={creditcarddots} alt="credit card dots"/>
                        <p className="lastfourdigits">{extractLastFourDigits(paymentCards[i].ending)}</p>
                        <p className="nameoncreditcard">{paymentCards[i].nameOnCard}</p>
                    </div>
                );
            }
        }
        
        return savedCreditCards;
    };

    const extractLastFourDigits = (creditCardNumber) => {
        const lastFourDigits = creditCardNumber.slice(-4);
        return lastFourDigits;
    };
      
    
  return (
    <div>
      <Header />
      <BackButton />
        <div id='Order'>
            <div class='reviewOrderTitle'>    
                <h1 class='orderPageTitle'>Review Order</h1>
            </div>
            <div class='orderContent'>
                <div class='leftOrderContent'>
                    <h2 class='order-sectionHeader'>Email</h2>
                    <label htmlForm="Email" id='orderLabel'>Email Address</label>
                    <input className="order-input-field" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p class='smallParagraph'>We'll send your tickets via email.</p>
                    <h2 class='order-sectionHeader'>Payment</h2>
                    <div className='creditCardContainer'>
                        {renderSavedCards()}
                    </div>
                    <label htmlForm="Card Name" id='orderLabel'>Name on card</label>
                    <input className="order-input-field" type="text" value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)}/>
                    <label htmlForm="Card Number" id='orderLabel'>Card number</label>
                    <input className="order-input-field" type="text" value={cardNum} onChange={(e) => setCardNum(e.target.value)}/>
                    <div class='twoInputs'>
                        <div class='leftInput'>
                            <label htmlForm="CVC" id='smallLabel'>CVC</label>
                            <input id="small-input-field" type="text" value={cvv} onChange={(e) => setCvv(e.target.value)}/>
                        </div>
                        <div class='rightInput'>   
                            <label htmlForm="Date" id='smallLabel'>Expiration Date</label>
                            <input id="small-input-field" type="text" value={expiration} onChange={(e) => setExpiration(e.target.value)}/>
                        </div>    
                    </div>
                    <h2 class='order-sectionHeader'>Billing Information</h2>
                    <label htmlForm="Street Address" id='orderLabel'>Street Address</label>
                    <input className="order-input-field" type="text" value={street} onChange={(e) => setStreet(e.target.value)}/>
                    <label htmlForm="Apt" id='orderLabel'>Zip Code</label>
                    <input className="order-input-field" type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
                    <div class='twoInputs'>
                        <div class='leftInput'>
                            <label htmlForm="City" id='smallLabel'>City</label>
                            <input id="small-input-field" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div class='rightInput'>   
                            <label htmlForm="State" id='smallLabel'>State</label>
                            <input id="small-input-field" type="text" value={state} onChange={(e) => setState(e.target.value)}/>
                        </div>    
                    </div>
                </div>
                <div class='rightOrderContent'>
                    <div class='rightOrderBox'>
                        <h2 class='order-sectionHeader'>Order Summary</h2>
                        <div class='space'></div>
                        <h2 class='summarySection'>{movieData.Title}</h2>
                        <p class='summaryContent'>{dateString} at {bookingData.showing.showTime}</p>
                        <p className='summaryContent'>Seats: {seatString}</p>
                        <div class='orderLine'></div>
                        {bookingData.ticketCounts.Adult > 0 && 
                        <div class='itemAndPrice'>
                            <h2 class='withPrice'>Adult</h2>
                            <h2 class='price'>${bookingData.showing.adultPrice}</h2>
                            <p class='summaryContent'>Quantity: {bookingData.ticketCounts.Adult}</p>
                        </div>}
                        {bookingData.ticketCounts.Child > 0 && 
                        <div class='itemAndPrice'>
                            <h2 class='withPrice'>Child</h2>
                            <h2 class='price'>${bookingData.showing.childPrice}</h2>
                            <p class='summaryContent'>Quantity: {bookingData.ticketCounts.Child}</p>
                        </div>}
                        {bookingData.ticketCounts.Senior > 0 && 
                        <div class='itemAndPrice'>
                            <h2 class='withPrice'>Senior</h2>
                            <h2 class='price'>${bookingData.showing.seniorPrice}</h2>
                            <p class='summaryContent'>Quantity: {bookingData.ticketCounts.Senior}</p>
                        </div>}
                        <div class='orderLine'></div>
                        <div class='itemAndPrice'>
                            <p class='withPrice'>Subtotal</p>
                            <h2 class='price'>${subtotal.toFixed(2)}</h2>
                            <div class='space'></div>
                            <p class='withPrice'>Booking Fee</p>
                            <h2 class='price'>${bookingFee.toFixed(2)}</h2>
                            <div class='space'></div>
                            <p class='withPrice'>Taxes</p>
                            <h2 class='price'>${taxes.toFixed(2)}</h2>
                        </div>
                        <div class='orderLine'></div>
                        <div class='itemAndPrice'>
                            <p class='totalWithPrice'>Total</p>
                            <h2 class='totalPrice'>${total.toFixed(2)}</h2>
                        </div>
                        <div class='promo'>
                                <label htmlForm="Promo" id='promoLabel'>Promo Code</label>
                                {promotionInfo && <p className="appliedPromotionDetails">Promotion Applied: {promotionName}</p>}
                                {promotionInfo && <button class='applyPromoButton' type="button" onClick={handlePromoDelete}>Remove</button>}
                                {!promotionInfo && <input type="text" class='promoInput' value={promo} onChange={(e) => setPromo(e.target.value)}/>}
                                {!promotionInfo && <button class='applyPromoButton' type="button" onClick={handlePromo}>Apply</button>}
                                {errorMessage && <p className="errorMessageOrder">{errorMessage}</p>}
                        </div>
                        
                        <button class="purchaseButton" type="button" onClick={handlePurchase} >PURCHASE</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
}

export default Order;
