'use strict'
const config = require('../config');
const request = require('request');
const createBiography = require('../bio');
const createResponsePerson = (intent, person) => {
  return new Promise((resolve, reject) => {
    if(person){
      console.log("Person mo ito");

      let {
        results: [{
        id
        }]

      } = person;

      request({
        uri: "https://api.themoviedb.org/3/person/?",
        qs: {
          person_id: `${id}`,
          api_key: config.TMDB_API_KEY,
        },
        method: "GET"
      }, (error, response, body) => {
        console.log(response);
        if(!error && response.statusCode === 200){
          resolve(createBiography(JSON.parse(body)));
        } else{
          reject(error);
        }
      });

    } else {
      return {
        text: "I don't seem to understand your question!",
        image: null
      }
    }
  });
}

module.exports = createResponsePerson;
