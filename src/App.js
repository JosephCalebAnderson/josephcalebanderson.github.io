import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { Login } from './Pages/Login';
import { Signup } from './Pages/Signup';
import { Verification } from './Pages/Verification';
import HomePage from './Pages/HomePage';
import Movieview from './Pages/Movieview';
import Tickets from './Pages/Tickets';
import SeatBooking  from './Pages/SeatBooking';  
import Order from './Pages/Order';
import Confirmation from './Pages/Confirmation';
import { EditProfile } from './Pages/EditProfile';
import { AdminHome } from './Pages/AdminHome';
import { ManagePromos } from './Pages/ManangePromos';
import { AdminAddMovies } from './Pages/AdminAddMovies';
import { ResetPassword } from './Pages/ResetPassword';
import { ManageMovies } from './Pages/ManageMovies';
import { ManageUsers } from './Pages/ManageUsers';
import { EditMovie } from './Pages/EditMovie';
import { EditShowtimes } from './Pages/EditShowtimes';
import { AdminEditUsers } from './Pages/AdminEditUsers';
import { ManageShowtimes } from './Pages/ManageShowtimes';
import OrderHistory from './Pages/OrderHistory';





function App() {
  /*
  const [currentForm, setCurrentForm] = useState('signup'); // set initial state to signup
  const toggleForm = (formName) => { // function to toggle between login and signup forms
    setCurrentForm(formName)
  }
  const renderComponent = () => {
    switch (currentForm) {
      case 'login':
        return <Login onFormSwitch={toggleForm} />;
      case 'signup':
        return <Signup onFormSwitch={toggleForm} />;
    }
  };
  
 const [searchResults, setSearchResults] = React.useState([]);
*/
  return (

    <BrowserRouter>
    <Routes>  
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/homepage" element={<HomePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/verification" element={<Verification />} />
    <Route path="/movieview" element={<Movieview />} />
    <Route path="/tickets" element={<Tickets />} />
    <Route path="/seatbooking" element={<SeatBooking />} />
    <Route path="/order" element={<Order />} />
    <Route path="/confirmation" element={<Confirmation />} />
    <Route path="/editprofile" element={<EditProfile />} />
    <Route path="/adminhome" element={<AdminHome />} />
    <Route path="/managemovies" element={<ManageMovies  />} />
    <Route path="/addmovies" element={<AdminAddMovies />} />
    <Route path="/managepromos" element={<ManagePromos />} />
    <Route path="/resetpassword" element={<ResetPassword />} />
    <Route path="/manageusers" element={<ManageUsers />} />
    <Route path="/editmovie" element={<EditMovie />} />
    <Route path="/editshowtimes" element={<EditShowtimes />} />
    <Route path="/admineditusers" element={<AdminEditUsers />} />
    <Route path="/manageshowtimes" element={<ManageShowtimes />} />
    <Route path="/orderhistory" element={<OrderHistory />} />
      </Routes>
      </BrowserRouter>
       );
  
    {/*<div className="App"> */}
      {/* <AdminAddMovies /> */}
     { /* <HomePage /> */}
     { /* <}
      {Confirmation /> */}
    {/*  <Login /> */}
    {/*</div> */}
   { /* <Signup /> */}
    {/*<div className="App">*/}
    {/*</div>*/}
    
    }

export default App;