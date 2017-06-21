'use strict';
const request = require('request');
const createResponse = require('../utils');
const createResponsePerson = require('../person');
const createMovieList = require('../movieList');
const config = require('../config');
const getInfo = data => {
  let intent = data.entities.intent && data.entities.intent[0].value || 'tvInfo';
  let tvshow = data.entities.tvshow && data.entities.tvshow[0].value || null;
  let person = data.entities.person && data.entities.person[0].value || null;
  let genre = data.entities.genre && data.entities.genre[0].value || null;
  let year = data.entities.year && data.entities.year[0].value || null;
  var genreID = "";

  //Get the Genre ID
  switch(genre){
      case "Action":
      genreID = 28;
      break;

      case "Adventure":
      genreID = 12;
      break;

      case "Animation":
      genreID = 16;
      break;

      case "Comedy":
      genreID = 35;
      break;

      case "Drama":
      genreID = 18;
      break;

      case "Horror":
      genreID = 27;
      break;

      case "Fantasy":
      genreID = 14;
      break;

      case "Music":
      genreID = 10402;
      break;

      case "Romance":
      genreID = 10749;
      break;

      case "Science Fiction":
      genreID = 878;
      break;
  }

  return new Promise((resolve, reject) => {
    console.log(intent + " " + tvshow + " " + person);
    if(tvshow != null) {
      // Fetch data from OMDB
      request({
        uri: "https://www.omdbapi.com",
        qs: {
          t: tvshow,
          plot: 'short',
          r: 'json',
          apiKey: config.OMDB_API_KEY
        },
        method: 'GET'
      }, (error, response, body) => {
        console.log(response);
        if(!error && response.statusCode === 200) {
          resolve(createResponse(intent, JSON.parse(body)));
        } else {
          reject(error);
        }
      });
    }
    else if(person != null){
      //Fetch data from TMDB
      request({
        uri: "https://api.themoviedb.org/3/search/person?api_key=92b2df3080b91d92b31eacb015fc5497",
        qs: {
          query: person,
          page: '1'
        },
        method: 'GET'
      }, (error, response, body) => {
        console.log(JSON.parse(body));
        if(!error && response.statusCode === 200){
          resolve(createResponsePerson(intent, JSON.parse(body)));
        } else{
          reject(error);
        }
      });
    }
    else if(year != null || genre != null){
      request({
        uri: "https://api.themoviedb.org/3/discover/tv",
        qs: {
          api_key: config.TMDB_API_KEY,
          language: en-US,
          sort_by: popularity.desc,
          page: '1',
          // with_genres: genreID,
          primary_release_year: year
        },
        method: 'GET'
      }, (error, response, body) => {
        console.log(JSON.parse(body));
        if(!error && response.statusCode === 200){
          resolve(createMovieList(JSON.parse(body)));
        } else{
          reject(error);
        }
      });
    }
    else {
      reject("Entities not found!");
    }
  });
}

module.exports = getInfo;
