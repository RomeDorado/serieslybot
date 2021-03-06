'use strict';
const request = require('request');
const createResponse = require('../utils');
const createResponsePerson = require('../person');
const config = require('../config');
const createMovieList = (movieList) => {
  if(movieList){
    let{
      results: [{
        title,
        poster_path,
        overview
      }]
    } = movieList;
    var imageURL = "http://image.tmdb.org/t/p/w185" + poster_path;

    let str = `Try asking me about these movies: \n`
    for(var i= 0; i < movieList.results.length; i++){
      var movieTitle = movieList.results[i].title;
      str += movieTitle + '\n';
    }

    return{
      text: str,
    }
  }
  else{
    return{
      text: "I'm sorry, there must be an error. Please try again.",
      image: null
    }
  }
}

module.exports = createMovieList;
