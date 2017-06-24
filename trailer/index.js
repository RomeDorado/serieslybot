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
          link,
          pagemap: {
            cse_thumbnail: [{
              src
            }]
          }
        }]
    } = trailer;

    var msgdata = {
        attachment: {
            type: template,
            payload: {
              template_type:open_graph,
              elements:[{
                url: src
              }]
            }
          }
        }
      
    console.log(JSON.stringify(msgdata));

   // let str = `${title} \n ${link}`.substring(0,320);

    return{
      text: msgdata,
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
