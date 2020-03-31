import R from 'ramda';

const getRandomNumber = (min, max, isFloat) => {
    let range = max - min
    let random = Math.random() * range + min
    const number = isFloat ? random : Math.round(random);
    return number;
  }

export const getSample = (size, min, max, areFloat) => {
    return  new Array(size).fill(0).map( () =>  getRandomNumber(min, max, false));
}


