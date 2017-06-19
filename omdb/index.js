'use strict';
const request = require('request');
const createResponse = require('../utils');
const config = require('../config');
const getInfo = data => {
  let intent = data.entities.intent && data.entities.intent[0].value || 'tvInfo';
  let tvshow = data.entities.tvshow && data.entities.tvshow[0].value || null;
  let person = data.entities.person && data.entities.person[0].value || null;
  return new Promise((resolve, reject) => {
    if(tvshow != null) {
      // Fetch data from OMDB
      request({
        uri: "https://www.omdbapi.com",
        qs: {
          t: tvshow,
          plot: 'full',
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
    else if(person != null){
      //Fetch data from TMDB
      request({
        uri: "https://api.themoviedb.org/3/search/person?api_key=92b2df3080b91d92b31eacb015fc5497",
        qs: {
          query: person
        },
        method: 'GET'
      }, (error, response, body) => {
        console.log(JSON.parse(results));
        if(!error && response.statusCode === 200){
          resolve(createResponse(intent, JSON.parse(results)));
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
