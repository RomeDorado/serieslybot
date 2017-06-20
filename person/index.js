'use strict'
const createResponsePerson = (intent, person) => {
  if(person){
    console.log("Person mo ito");

    let {
      results: [{
      name,
      profile_path,
      known_for:[{
        title,
        original_name
      }]
      }]

    } = person;
    switch(intent){

      case 'personInfo': {
        if(title == null){
          let str = `${name} is know for ${original_name}`;
        }
        else{
          let str = `${name} is know for ${title}`;
        }

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
