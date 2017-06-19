'use strict';
const request = require('request');
const createResponse = require('../utils');
const config = require('../config');
const getInfo = data => {
  let intent = data.entities.intent && data.entities.intent[0].value || 'tvInfo';
  let tvshow = data.entities.tvshow && data.entities.tvshow[0].value || null;
  let person = data.entities.person & data.entities.person[0].value || null;
  return new Promise((resolve, reject) => {
    if(tvshow) {
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
        console.log(JSON.parse(body));
        if(!error && response.statusCode === 200) {
          resolve(createResponse(intent, JSON.parse(body)));
        } else {
          reject(error);
        }
      });
    }
    else if(person){
      //Fetch from TMDB
      request({
        uri: "https://api.themoviedb.org/3/search/person",
        qs:{
          query: person
        },
        method: 'GET'
      }, (error, response, body) => {
        console.log(JSON.parse(body[0]));
        if(!error && response.statusCode === 200){
          resolve(createResponse(intent, JSON.parse(body[0])));
        } else{
          reject(error);
        }
      });
    }
    else {
      reject("Entities not found!");
      console.log(intent);
    }
  });
}

module.exports = getInfo;
