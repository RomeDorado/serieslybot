'use strict';
const request = require('request');
const createResponse = require('../utils');
const createResponsePerson = require('../person');
const config = require('../config');
const createMovieList = (movieList) => {
  if(movieList){
    console.log("Umabot ng createMovieList pagkshet");
    let{
      results: [{
        title,
        poster_path,
        overview
      }]
    } = movieList;
    var imageURL = "http://image.tmdb.org/t/p/w185" + poster_path;

    let str = `${title}, ${overview}`;

    return{
      for(ctr = results.length; ctr <= 5; ctr++){
        text: str,
      }
    }
  }
}

module.exports = createMovieList;
