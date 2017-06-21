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
    var s ='';
    //console.log(biography.length + "this is the length of chars");
    var biog = [] = biography.split(".");
    //let str = `${name}, ${biography}`.substring(0,400);
   let str = `${name},`;
    for (var i=1; i <= 3; i++){

     s += biog[i] + ".";

   }

   if(s.length > 500){


     s = biog[2] + ".";


 }

   console.log(s.length + "test print");
    return{
      text: str + s
   }
  }
}

module.exports = createBiography;
