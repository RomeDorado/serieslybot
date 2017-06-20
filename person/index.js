'use strict'
const config = require('../config');
const request = require('request');
const createBiography = require('../bio')
const createResponsePerson = (intent, person) => {
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
      uri: "https://api.themoviedb.org/3/person?api_key=92b2df3080b91d92b31eacb015fc5497",
      qs: {
        person_id: id,
        append_to_response: "images"
      },
      method: "GET"
    }, (error, response, body) => {
      console.log(JSON.parse(body));
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
}

module.exports = createResponsePerson;
