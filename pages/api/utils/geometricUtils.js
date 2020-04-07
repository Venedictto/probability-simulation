import R from 'ramda';
import * as Utils from './utils';
import {doBernoulliExperiment} from './bernoulliUtils';

const flipCoinUntilheader =  ['Number of attempts', 'Number of tails', { role: 'style' }];

export const getGeometricExperimentResult = (size, success, p)  => {
  const sample = getGeometricSample(size,p)
  let results = R.groupWith(R.equals, R.sort((a, b) => a - b, sample))
                 .map((value,index) => [`(${Math.ceil((value.length/size)*100)}%)${index+1}`, value.length, Utils.getRandomThemeColour(1)])
  results.unshift(flipCoinUntilheader);
  return results;
}

const getGeometricSample = (size, p) => {
    return new Array(size).fill(0).map( () => doGeometricExperiment(p));
}
const doGeometricExperiment = (p) => {
  let count = 1;
  while(!doBernoulliExperiment(p)) count++;
  return count;
}
