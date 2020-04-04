import R from 'ramda';
import {loaderTypes} from '../../../constants/constants';
import theme from '../../../constants/Theme';

export const getRandomNumber = (min, max, isFloat) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const random = Math.random() * (max - min + 1);
    return (isFloat) ? random + min : Math.floor(random) + min; 
}
export const getRandomWithoutEquiprobability = (success, successProbability, min, max) => {
  const range = max-min;
  const random = Math.random();
  const number = (random < successProbability) ? success : Math.round((random * range) + min);
  return number;
}

export const getRandomLoaderType = () => {
  return loaderTypes[getRandomNumber(0, loaderTypes.length-1, false)];
}

export const getThemeColours = () => { 
  const colors = Object.keys(theme.color).map(key => theme.color[key]);
  return  colors[getRandomNumber(0,colors.length-1,false)];
}