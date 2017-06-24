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
          snippet,
          pagemap: {
            cse_thumbnail: [{
              src
            }]
          }                    
        }]
    } = trailer;

    let elements = [];
    let buttons = [];
    let button;
    button = {
					"type": "web_url",
					"title": "Watch trailer",
					"url": link
				}
    buttons.push(button);
    let element = {			
			"title": title,
			"image_url": src,
			"subtitle": snippet,
			"buttons": buttons
		};
		elements.push(element);

      
    //console.log(JSON.stringify(msgdata));

   // let str = `${title} \n ${link}`.substring(0,320);

    return{
      jsonfile: elements,
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
