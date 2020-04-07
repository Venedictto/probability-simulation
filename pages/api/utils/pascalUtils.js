import R from 'ramda';
import * as Utils from './utils';
import {doBernoulliExperiment} from './bernoulliUtils';

const flipCoinUntilheader =  ['Number of attempts', 'Number of tails', { role: 'style' }];

export const getPascalExperimentResult = (size, probability, numberOfSuccess)  => {
  const sample = getPascalSample(size, probability, numberOfSuccess)
  let results = R.groupWith(R.equals, R.sort((a, b) => a - b, sample))
                 .map((value,index) => [`(${value.length/size}) # ${index+1}`, value.length, Utils.getRandomThemeColour(1)])
  results.unshift(flipCoinUntilheader);
  return results;
}

const getPascalSample = (size, probability, numberOfSuccess) => {
    return new Array(size).fill(0).map( () => doPascalExperiment(probability, numberOfSuccess));
}
const doPascalExperiment = (probability, numberOfSuccess) => {
  let count = 0;
  let n = 0;
  while(n < numberOfSuccess) {
    count++;
    if(doBernoulliExperiment(probability)) n++;
  }
  return count;
}
