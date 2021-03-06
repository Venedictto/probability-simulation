// @ts-nocheck
import R from 'ramda';
import * as Utils from './utils';
import {doBernoulliExperiment} from './bernoulliUtils';

const flipCoinUntilheader =  [ 'Number of Success', 'Number of experiments', { role: 'style' }];

export const getBinomialExperimentResult = (size, probability, repetitions)  => {
  const sample = getBinomialSample(size, probability, repetitions)
  let results = R.groupWith(R.equals, R.sort((a, b) => a - b, sample))
  .map((value,index) => [`(${Math.ceil((value.length/size)*100)}%) #${index+1}`, value.length, Utils.getRandomThemeColour(1)])
  results.unshift(flipCoinUntilheader);
  return results;
}


const getBinomialSample = (size, probability, repetitions) => {
    return new Array(size).fill(0).map( () => doBinomialExperiment(probability, repetitions));
}
const doBinomialExperiment = (probability, repetitions) => {
  let count = 0;
  for (let i = 0; i < repetitions; i++) {
      if(doBernoulliExperiment(probability)) count++;
  }
  return count;
}
