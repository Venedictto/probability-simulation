import R from 'ramda';
import * as Utils from './utils';

const flipCoinUntilheader =  ['Number of attempts', 'Number of tails', { role: 'style' }];

// Flip coin
export const getFlipCoinUntilResults = (size, p) => {
    return getExperimentResult( size, 0, 1/2, 0, 1);
}

export const getRollDiceUntilResults = (size, diceFace, p) => {
  return getExperimentResult(size, diceFace, 1/6, 1, 6);
}

export const getGenericUntilExperimentResults = (size, success, successProbability, min, max) => {
    return getExperimentResult(size, success, successProbability, min, max);
}


const getExperimentResult = (size, success, p, min, max)  => {
  const sample = new Array(size).fill(0).map( () => getExperimentsUntilExpected(success, p, min, max));
  let results = R.groupWith(R.equals, R.sort((a, b) => a - b, sample))
                 .map((value,index) => [`(${value.length/size}) # ${index+1}`, value.length, Utils.getThemeColours()])
  results.unshift(flipCoinUntilheader);
  return results;
}



const getExperimentsUntilExpected = (success, successProbability, min, max) => {
    let notHead = true;
    let tails = 1;
    while(notHead) (Utils.getRandomWithoutEquiprobability(success, successProbability, min, max) == success) ? notHead = false : tails++;
    return tails;
  }

