'use strict';
const request = require('request');
const createResponse = require('../utils');
const createResponsePerson = require('../person');
const config = require('../config');
const createShowingList = (showList) => {
  if(showList){
    console.log("Umabot ng showinglist");
    let{      
        items:[{
          pagemap: {
            listitem: [{
            name
              }]
            }
        }]
    } = showList;
    
    console.log(name + "this is the name");
    console.log(listitem);
    for(var i = 0; i <= listitem.length; i++){
      
    let str = `List of now showing movies: `;
    str +=  listitem[i];
    }
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
