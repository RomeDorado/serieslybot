'use strict'
const createResponsePerson = (intent, person) => {
  if(person){
    console.log("Person mo ito");
    let {      
      name,
      profile_path
    } = person.results;    
    console.log("THIS ARE THE RESULTS" + person.results);
    switch(intent){
        
      case 'personInfo': {
        let str = `${name} is an actor. :)`;
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
