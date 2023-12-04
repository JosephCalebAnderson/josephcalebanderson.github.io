import React, { useEffect, useState } from 'react';
import './OrderHistory.css';
import Header from '../Components/Header';
import BackButton from '../Components/BackButton';
import BasicTable from '../Components/BasicTable';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

function OrderHistory() {

  const [bookingArray, setBookingArray] = useState([]);
  const [showingArray, setShowingData] = useState();
  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      let route = 'http://localhost:4000/api/bookings/'+location.state.loginData.user._id;
      const Response = await fetch(route, {
          method: 'Get',
          headers: {
              'Content-Type': 'application/json'
          },
      });
      const Data = await Response.json();
      console.log(Data);
      setBookingArray(Data);
    }
    fetchData()
    .catch(console.error);
  }, []);
  console.log(bookingArray);

  return (
    <div>
      <Header />
      <BackButton />
      <div class='orderHistoryTitle'>    
                <h1 class='orderHistoryH1'>Order History</h1>
            </div>
        <div className='historyTableDiv'>
          <BasicTable data={bookingArray} />
        </div>
    </div>
  );
}

export default OrderHistory;