'use strict';
const request = require('request');
const createResponse = require('../utils');
const createResponsePerson = require('../person');
const config = require('../config');
const createShowingList = (showList) => {
  if(showList){
    console.log("Umabot ng showinglist");
    let{      
        
            name 
        
    } = showList;
    
    console.log(name + "this is the name");
    let str = `List of now showing movies: ${name}`.substring(0,320);

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
}

module.exports = createShowingList;
