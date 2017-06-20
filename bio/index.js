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

    
    let str = `${name}, ${biography}`.substring(0,400);
    

    return{
      text: str
    }
  }
}

module.exports = createBiography;
