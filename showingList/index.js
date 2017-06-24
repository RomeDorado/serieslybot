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
    
/*
     var cont = listitem.map(function(obj) { 
				var contextObj = {};
				if(obj.name === name){

					let emailaddress = obj.parameters['userEmail'];
					readDirectory(sender, emailaddress);
					console.log(emailaddress + "EMAIL ITO");
				}						
			return contextObj;
		});
*/
    //console.log(name + "this is the name");
    //console.log("listitem",JSON.parse(pagemap));
    //for(var i = 0; i <= listitem.length; i++){
      
    //let str = `List of now showing movies: `;
    console.log(listitem.name);

    var str = '';
    str += name;
    //}
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

module.exports = createShowingList;
