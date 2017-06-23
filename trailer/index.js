'use strict';
const request = require('request');
const createResponse = require('../utils');
const createResponsePerson = require('../person');
const config = require('../config');
const createTrailer = (trailer) => {
  if(trailer){
    console.log("Umabot ng trailer");
    let{      
        items:[{
          title,
          link
        }]
    } = trailer;
    

    let str = `${title}
    ${link}`.substring(0,320);

    return{
      text: str,
    }
  }
  else{
    return{
      text: "I'm sorry, there must be an error. Please try again.",
      image: null
    }
  }
}//

module.exports = createTrailer;
