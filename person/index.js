'use strict'
const config = require('../config');
const request = require('request');
const createBiography = require('../bio');
const createResponsePerson = (intent, person) => {
  return new Promise((resolve, reject) => {
    if(person.total_results != 0){
      let {
        results: [{
        id
        }]
      } = person;

      request({
        uri: "https://api.themoviedb.org/3/person/"+id,
        qs: {
          api_key: "92b2df3080b91d92b31eacb015fc5497",
        },
        method: "GET"
      }, (error, response, body) => {
        if(!error && response.statusCode === 200){
          resolve(createBiography(JSON.parse(body)));
        } else{
          reject(error);
        }
      });

    } else {
    console.log("umabot dito sa else");
      return {
        text: "I don't seem to understand your question!",
        image: null
      }
    }
  });
}

module.exports = createResponsePerson;