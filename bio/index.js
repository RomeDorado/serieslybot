'use strict';
const request = require('request');
const createResponse = require('../utils');
const createResponsePerson = require('../person');
const config = require('../config');
const createBiography = (bio) => {
  if(bio.total_results == 0){ 

    let str = `I can't seem to find the person you are looking for. Please try again.`;

    return{
      text: str,
      image: null
    }
  }   

  else if(bio.total_results != 0){
    let{
      name,
      biography,
      profile_path
    } = bio;
    var s ='';
    var imageURL = "http://image.tmdb.org/t/p/w185" + profile_path;
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
    return{
      text: str + s,
      image: imageURL
   }
  }
  
}

module.exports = createBiography;