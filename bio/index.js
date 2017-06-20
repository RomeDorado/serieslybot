'use strict';
const request = require('request');
const createResponse = require('../utils');
const createResponsePerson = require('../person');
const config = require('../config');
const createBiography = (bio) => {
  if(bio){
    console.log("Umabot siya ng biography packshet yes");
    let{
      name,
      biography,
    } = bio;

    var biog = [] = biography.split(".");
    //let str = `${name}, ${biography}`.substring(0,400);    
    let str = `${name},`;
    for (var i=1; i <= 5; i++){
      var s =''; 
      s = biog[i];
      var v = '';
      v.concat(s);
      console.log(v);
    }

    return{
      text: str + v      
    }
  }
}

module.exports = createBiography;
