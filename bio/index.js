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

    var bio = [] = biography.split(".");
    //let str = `${name}, ${biography}`.substring(0,320);
    let str = `${name}`, bio = [3];

    return{
      text: str
    }
  }
}

module.exports = createBiography;
