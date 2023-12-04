import React from "react";
import { useEffect,useState } from "react";
import "./ManagePromos.css"; 
import AdminHeader from "../Components/AdminHeader";
import BackButton from "../Components/BackButton";
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";


export const ManagePromos = () => {
  /*const [promotions, setPromotions] = useState([
    {
      id: 1,
      name: "Summer Sale",
      description: "Get 20% off on all tickets!",
    },
    {
      id: 2,
      name: "Holiday Special",
      description: "Buy one ticket, get one free!",
    },
    {
      id: 3,
      name: "Early Bird Discount",
      description: "Book your tickets in advance and save 15%!",
    },
  ]);
  */
  const [promotions, setPromotions] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [amount, setAmount] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  var loginData;

  if (location.state != null) {
    loginData = location.state.loginData;
  } else {
    navigate('/login');
  }

  useEffect(() => {
    const fetchData = async () => {
      let route = 'http://localhost:4000/api/promotions/'
      const Response = await fetch(route, {
          method: 'Get',
          headers: {
              'Content-Type': 'application/json'
          },
      });
      const Data = await Response.json();
      console.log(Data);
      setPromotions(Data);
    }
    fetchData()
    .catch(console.error);
  }, []);

  // Currently unused
  /*
  const inputFields = [
    { id: "promotionName", label: "Promotion Name", placeholder: "Enter promotion name" },
    { id: "promotionDescription", label: "Description", placeholder: "Enter promotion description" },
    { id: "promotionAmount", label: "Amount", placeholder: "Enter amount" },
    { id: "promotionCode", label: "Code", placeholder: "Enter promotion code" },
  ];
  */

  const addPromotion = async (e) => {
    e.preventDefault()
    let route = 'http://localhost:4000/api/promotions/addPromotion'
    const promotionInfo = {
      name,
      description,
      amount,
      code
    }
    try {
      const Response = await fetch(route, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(promotionInfo)
      });
      const Data = await Response.json();
      console.log(Data);
      if (Response.status == 200) {
      //setPromotions(Data);
      let emailRoute = 'http://localhost:4000/api/users/promotions/'
      const usersResponse = await fetch(emailRoute, {
          method: 'Get',
          headers: {
              'Content-Type': 'application/json'
          },
      });
      const userData = await usersResponse.json();
      const emailInfo = {
        emails: [userData],
          subject: "Use Our New " + name + " Promo Code: " + code,
          message: "We have a new promotion code! " + description
      };
      const emailResponse = await fetch('http://localhost:4000/api/emails', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(emailInfo)
          });
          const emailData = await emailResponse.json();
          window.location.reload();
      } else {
        setErrorMessage(Data.msg);
      }
    } catch (error) {
      // Possibly get rid of this or change it to setErrorMessage
      setErrorMessage('Fill in all fields');
      console.error(error);
    }
  }

  return (
    <div>
      <AdminHeader/>
      <BackButton />
    <div className="manage-promotions">
      <h2 className="managePromotionsTitle">Manage Promotions</h2>
      <div className="promotion-list">
        <h3 class='promotionListHeading'>Promotions List</h3>
        <ul class='managePromotionsList'>
          {promotions.map((promotion) => (
            <li key={promotion.id}>
              <div className="promotion-item">
                <span className="promotion-name">Name: {promotion.name}</span><br></br>
                <span className="promotion-description">Description: {promotion.description}</span><br></br>
                <span className="promotion-code">Code: {promotion.code}</span><br></br>
                <span className="promotion-amount">Amount: {promotion.amount}</span><br></br>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <h3 class='promotionListHeading'>Add New Promotion</h3>
      <div className="add-promotion">
        
        <form onSubmit={addPromotion}>
          <label key="promotionName" htmlFor="promotionName" class='managePromosLabel'>
            Promotion Name
            <input type="text" id="promotionName" name="promotionName" placeholder="Enter promotion name" value={name} onChange={(e) => setName(e.target.value)}/>
          </label>
          <label key="promotionDescription" htmlFor="promotionDescription" class='managePromosLabel'>
            Description
            <input type="text" id="promotionDescription" name="promotionDescription" placeholder="Enter promotion description" value={description} onChange={(e) => setDescription(e.target.value)}/>
          </label>
          <label key="promotionAmount" htmlFor="promotionAmount" class='managePromosLabel'>
            Amount (as a decimal Eg. .80 = 80%)
            <input type="text" id="promotionAmount" name="promotionAmount" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)}/>
          </label>
          <label key="promotionCode" htmlFor="promotionCode" class='managePromosLabel'>
            Code
            <input type="text" id="promotionCode" name="promotionCode" placeholder="Enter promotion code" value={code} onChange={(e) => setCode(e.target.value)}/>
          </label>
          <button className="addPromo-button" >Add Promotion</button>
          {errorMessage && <p className="error-message-adminAddNewPromo">{errorMessage}</p>}
        </form>
      </div>
    </div>
    </div>
  );
};
