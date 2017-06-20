'use strict'
const config = require('../config');
const request = require('request');
const createBiography = require('../bio')
const createResponsePerson = (intent, person) => {
  return new Promise((resolve, reject) => {
    if(person){
      console.log("Person mo ito");

      let {
        results: [{
        name,
        id,
        known_for:[{
          title,
          original_name
        }]
        }]

      } = person;

      request({
        uri: "https://api.themoviedb.org/3/person",
        qs: {
          person_id: id,
          api_key: config.TMDB_API_KEY,
          append_to_response: "images"
        },
        method: "GET"
      }, (error, response, body) => {
        console.log(JSON.parse(body) +"umabot ng request");
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
