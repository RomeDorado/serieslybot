'use strict'
const createResponsePerson = (intent, person) => {
  if(person){
    console.log("Person mo ito");

    let {
      results: [{
      name,
      profile_path,
      known_for{
        title
      }
      }]

    } = person;
    switch(intent){

      case 'personInfo': {
        let str = `${name} is an actor. and he is know for the movie ${title}`;
        return{
          text: str,
          image: profile_path
        }
      }

    }

  } else {
    return {
      text: "I don't seem to understand your question!",
      image: null
    }
  }
}

module.exports = createResponsePerson;
