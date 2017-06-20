'use strict';

const createBiography = (bio) => {
  if(bio){
    console.log("Umabot siya ng biography packshet yes");

    let{
      name,
      biography,
    } = bio;

    let str = `${name}, ${biography}`;

    return{
      text: str
    }
  }
}
