import R from 'ramda';
import {loaderTypes} from '../../../constants/constants';
import theme from '../../../constants/Theme';

export const getRandomNumber = (min, max, isFloat) => {
    let range = max - min
    let random = Math.random() * range + min
    const number = isFloat ? random : Math.round(random);
    return number;
  }

export const getRandomLoaderType = () => {
  return loaderTypes[getRandomNumber(0, loaderTypes.length-1, false)];
}

export const getThemeColours = () => { 
  const colors = Object.keys(theme.color).map(key => theme.color[key]);
  return  colors[getRandomNumber(0,colors.length-1,false)];
}