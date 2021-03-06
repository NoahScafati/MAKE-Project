import React, { Component } from 'react';

import './App.css';
import { render } from '@testing-library/react';
import MovieRow from './MovieRow.js'
import PosterInsert from './PosterInsert.js'
import $ from 'jquery'

var sourceLeft = ""
var sourceRight = ""
var sourceMiddle = ""

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    } 

    this.cancel = '';
  }
 
    performSearch(searchTerm) {
      const urlString = "https://api.themoviedb.org/3/search/movie?api_key=0e11dba550c2721f8769af2eb1eec6b5&query=" + searchTerm
      $.ajax({
        url: urlString,
        success: (searchResults) => {
          const results = searchResults.results
          var movieRows = []
          
          if (this.state.loading !== true) {
            this.setState({rows:[]})
            return
          }
          
          results.forEach((movie) => {
            movie.poster_src = "https://image.tmdb.org/t/p/w188_and_h282_bestv2" + movie.poster_path
            console.log(movie.poster_path)
            const movieRow = <MovieRow key={movie.id} movie={movie}/>
            
            movieRows.push(movieRow)

          })
            this.setState({rows:movieRows})
          
        },
        error: (xhr, status, err) => {
          console.error("Failed to fetch data")
        }
      })
    }
  
  searchChangeHandler(event) {
    console.log("TestString "+ event.target.value)
    if (event.target.value === "") {
      this.setState({loading: false})
      this.setState({rows:[]})
      return
    }
    console.log(event.target.value)

    this.setState({loading: true})

    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.performSearch(searchTerm)
  }

  render() {
    return (
      <div> 
        <table className = "titleBar">
          <tbody>
            <tr>
              <h1>
                Obama's Movie Gallery
              </h1>
              <tr>
            <img id = "obamaImage" alt = "background" className = "obamaImage" src = "Obama Final.png"/>
            <img id = "shutterIsland" alt = "left" className = "leftPoster" src = "ShutterIsland.jpg"/>
            <img id = "shutterIsland" alt = "middle" className = "middlePoster" src = "ShutterIsland.jpg"/>
            <img id = "shutterIsland" alt = "right" className = "rightPoster" src = "ShutterIsland.jpg"/>
            <img id = "obamaCutOut" alt = "obamacutout" className = "obamaCutOut" src = "ObamaCutOut.png"/>
            </tr>
            </tr>
            <tr className = "titleBar">
               <input className = "searchBar" onChange={this.searchChangeHandler.bind(this)} placeholder = "Enter movie title..."  /> 
            </tr>
          </tbody>
        </table>
        
        {this.state.rows}
      </div>
    );
  }
}

export default App;
