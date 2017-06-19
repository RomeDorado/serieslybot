'use strict';
const createResponse = (intent, tvshow) => {
  if(tvshow.Response === 'True') {
    let {
      Title,
      Year,
      Plot,
      Director,
      Actors,
      Poster,
      Released,
      Writer
    } = tvshow;

    switch(intent) {
      case 'tvInfo' : {
        let str = `${Title} (${Year}). This film was directed by ${Director} and starred ${Actors}. ${Plot}`;
        return {
          text: str,
          image: Poster
        }
      }

      case 'director' : {
        let str = `${Title} (${Year}) was directed by ${Director} and written by ${Writer}.`;
        return {
          text: str,
          image: null
        }
      }

      case 'cast': {
        let str = `The main cast of ${Title} (${Year}) are ${Actors}.`;
        return{
          text: str,
          image: null
        }
      }

      case 'releaseYear': {
        let str = `${Title} was released on ${Released}.`;
        return{
          text: str,
          image: null
        }
      }

      // default: {
      //   return {
      //     text: "Always at your service :)",
      //     image: null
      //   }
      // }
    }
  } else {
    return {
      text: "I don't seem to understand your question!",
      image: null
    }
  }
}
module.exports = createResponse;
