import React from 'react';
import './Squares.css';
import square from '../Images/greySquare.png'

function Squares() {

    return (
        <div class='squaresContainer'>
            <img class="square square1" src={square} alt="square"/>
            <img class="square square2" src={square} alt="square"/>
            <img class="square square3" src={square} alt="square"/>
            <img class="square square4" src={square} alt="square"/>
            <img class="square square5" src={square} alt="square"/>
            <img class="square square6" src={square} alt="square"/>
            <img class="square square7" src={square} alt="square"/>
            <img class="square square8" src={square} alt="square"/>
            <img class="square square9" src={square} alt="square"/>
            <img class="square square10" src={square} alt="square"/>
            <img class="square square11" src={square} alt="square"/>
        </div> 
    );
  }
  
  export default Squares;
