import {loaderTypes} from '../../../constants/constants';
import theme from '../../../constants/Theme';

export const getRandomNumber = (min, max, isFloat) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const random = Math.random() * (max - min + 1);
    return (isFloat) ? random + min : Math.floor(random) + min; 
}

export const getRandomLoaderType = () => {
  return loaderTypes[getRandomNumber(0, loaderTypes.length-1, false)];
}

export const getRandomThemeColour = (number) => { 
  const themeColors = Object.keys(theme.color).map(key => theme.color[key]);
  let colors = [];
  for (let i = 0; i < number; i++) {
    let newColor = themeColors[getRandomNumber(0,themeColors.length-1,false)];
    while (i !== 0 && newColor === colors[i-1]) {
      newColor = themeColors[getRandomNumber(0,themeColors.length-1,false)];
    }
    colors.push(newColor);
  }
  return (number === 1) ? colors[0] : colors;
}