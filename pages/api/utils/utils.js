import R from 'ramda';
import {loaderTypes} from '../../../constants/constants';
export const getRandomNumber = (min, max, isFloat) => {
    let range = max - min
    let random = Math.random() * range + min
    const number = isFloat ? random : Math.round(random);
    return number;
  }

export const getSample = (size, min, max, areFloat) => {
    return  new Array(size).fill(0).map( () => getRandomNumber(min, max, areFloat));
}

export const getRandomLoaderType = () => {
  return loaderTypes[getRandomNumber(0, loaderTypes.length-1, false)]
}

