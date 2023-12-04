import React from 'react';
import './BackButton.css';
import arrowLeft from '../Images/Arrowleft.png';
import { useNavigate } from 'react-router-dom';

function BackButton() {

  let navigate = useNavigate();

  return (
    <div class='backButtonSection'>
        
        <button class="backButton" type="button" onClick={() => navigate(-1)}>
        <img class="arrowLeft" src={arrowLeft} alt="Left Arrow Icon"/>
          Back
        </button>
    </div> 
  );
}

export default BackButton;
