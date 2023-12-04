import React from "react";
import { useState } from "react";
import './Search.css';
import logo from '../Images/logo.png';
import searchIcon from '../Images/searchIconPhoto.png'
import menuButton from '../Images/menuButton.png'

function Search() {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleSearch = async () => {
        try {
            const title = search;
            const response = await fetch(`http://localhost:4000/api/movies/getMovieTitle/${title}`, {
                method: "GET",
        })
            //Response Based on async
            const data = await response.json();
            //Store the Search Results
            setSearchResults([data]);
    } catch (error) {
      // Possibly get rid of this or change it to setErrorMessage
        console.error(error);
    }
    };

    const handleSelectMovie = (index) => {
        //Set Search Results to be able to get the different pieces of the searched movie information
        //To access the info below use searchResults[index].Title, searchResults[index].Image, searchResults[index].Trailer
        setSelectedMovie(searchResults[index]);
    };
  
    return (
        <div class='search-header'>
        <div class='search-head1'>
        <img class="search-headerLogo" src={logo} alt="Movie Logo"/>
        <h1 class='search-webName'>BigScreenBook</h1>
      </div>
      <div class='search-head2'>
        <div class='search-searchContainer'>
          <input id='search-searchbar' type="text" placeholder="What do you want to watch?" value={search} onChange={(e) => setSearch(e.target.value)}/>
          <img id="search-searchIcon" src={searchIcon} alt="Search Icon" onClick= {handleSearch}/>
        </div>
        {searchResults.length > 0 && (
          <div class="search-results">"
          <h2 class ="h2-search-results">Search Results</h2>
          <ul className="results-ul-list">
            {searchResults.map((result,index) => (
              <li key={index}>
                <img class="search-results-image" src={result.Image} alt="Movie Image"/>
                <h3 class="search-results-title">{result.Title}</h3>
                <button class="search-results-button" type="button" onClick={() => window.open(result.Trailer)}>Watch Trailer</button>
              </li>
            ))}
          </ul>
      </div>
      )}
      </div>
      <div class='search-head3'>
        <h2 class='search-hello'>Hello, Jenna.</h2>
        <button class="search-menuButton" type="button">
            <img class="search-menuButtonImage" src={menuButton} alt="Menu Button"/>
        </button>
      </div>
    </div>
    );
}
    export default Search;
    