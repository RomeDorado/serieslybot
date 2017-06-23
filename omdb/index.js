'use strict';
const request = require('request');
const createResponse = require('../utils');
const createResponsePerson = require('../person');
const createMovieList = require('../movieList');
const createTrailer = require('../trailer');
const createShowingList = require('../showingList');
const config = require('../config');
const getInfo = data => {
  let intent = data.entities.intent && data.entities.intent[0].value || 'tvInfo';
  let tvshow = data.entities.tvshow && data.entities.tvshow[0].value || null;
  let person = data.entities.person && data.entities.person[0].value || null;
  let genre = data.entities.genre && data.entities.genre[0].value || null;
  let year = data.entities.year && data.entities.year[0].value || null;
  let showing = data.entities.showing && data.entities.showing[0].value || null;
  let trailer = data.entities.trailer && data.entities.trailer[0].value || null;
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
    console.log(intent + " " + tvshow + " " + person + " " + showing + " " + trailer);
    if(intent == 'tvInfo' && tvshow != null) {
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
        uri: "https://api.themoviedb.org/3/discover/movie?api_key=92b2df3080b91d92b31eacb015fc5497",
        qs: {
          language: "en-US",
          sort_by: "popularity.desc",
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
    else if(showing != null){
      request({
        uri: "https://www.googleapis.com/customsearch/v1?",
        qs: {
          q: "showing " + showing,
          cx: `011868887043149504159:-5-5cnusvca`,
          siteSearch: `https://www.clickthecity.com/`,
          fields: 'items/pagemap',
          key: `AIzaSyCOdpES79O2cqWNdxNaLs_6g68cNdWBsWw`,          
        },
        method: 'GET'
      }, (error, response, body) => {
        //console.log(response);
        console.log(JSON.parse(body));
        var items = JSON.parse(body);
        //console.log(JSON.parse(items.pagemap[0]));
        if(!error && response.statusCode === 200){
          resolve(createShowingList(JSON.parse(body)));
        } else{
          reject(error);
        }
      });
    }
    else if(intent == 'trailerInfo' && trailer!= null){
      request({
        uri: "https://www.googleapis.com/customsearch/v1?",
        qs: {
          q: tvshow + " trailer",
          cx: `011868887043149504159:-5-5cnusvca`,
          siteSearch: `https://www.youtube.com/`,
          fields: 'items',
          key: `AIzaSyCOdpES79O2cqWNdxNaLs_6g68cNdWBsWw`,          
        },
        method: 'GET'
      }, (error, response, body) => {
        //console.log(response);
        console.log(JSON.parse(body));
        var items = JSON.parse(body);
        //console.log(JSON.parse(items.pagemap[0]));
        if(!error && response.statusCode === 200){
          resolve(createTrailer(items));
        } else{
          reject(error);
        }
      });
    }

//dito lalagay else if


    else {
      reject("Entities not found!");
    }
  });
}

module.exports = getInfo;
