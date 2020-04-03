import R from 'ramda';
import * as Utils from './utils';

const flipCoinUntilheader =  ['Number of attempts', 'Number of tails', { role: 'style' }];


export const getFlipCoinUntilResults = (size, p) => {
    let sample = getFlipCoinUntilHeadSample(size, p);
    let results = R.groupWith(R.equals, R.sort((a, b) => a - b,sample))
                   .map((value,index) => [`# ${index+1}`, value.length, Utils.getThemeColours()])
    results.unshift(flipCoinUntilheader);
    return results;
}

export const getRollDiceUntilResults = (size, diceFace) => {
    let sample = getRollDiceUntilDiceFaceSample(size, diceFace);
    let results = R.groupWith(R.equals, R.sort((a, b) => a - b,sample))
                   .map((value,index) => [`# ${index+1}`, value.length, Utils.getThemeColours()])
    results.unshift(flipCoinUntilheader);
    return results;
}

const getFlipCoinUntilHeadSample = (size,p) => new Array(size).fill(0).map( () => getTailsUntilHead(p))
const getRollDiceUntilDiceFaceSample = (size,diceFace) => new Array(size).fill(0).map( () => getExperimentsUntilExpected(1, 6, diceFace))

const getTailsUntilHead = (p) => {
    let notHead = true;
    let tails = 1;
    while(notHead){
      (Utils.getRandomNumber(0,1,true) < p) ? notHead = false : tails++;
    }
    return tails;
  }

  const getExperimentsUntilExpected = (min, max, expected) => {
      let notHead = true;
      let tails = 1;
      while(notHead){
        (Utils.getRandomNumber(min,max,false) == expected) ? notHead = false : tails++;
      }
      return tails;
    }