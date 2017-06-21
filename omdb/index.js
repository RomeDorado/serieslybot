'use strict';
const request = require('request');
const createResponse = require('../utils');
const createResponsePerson = require('../person');
const config = require('../config');
const getInfo = data => {
  let intent = data.entities.intent && data.entities.intent[0].value || 'tvInfo';
  let tvshow = data.entities.tvshow && data.entities.tvshow[0].value || null;
  let person = data.entities.person && data.entities.person[0].value || null;
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
    else {
      reject("Entities not found!");
    }
  });
}

module.exports = getInfo;
