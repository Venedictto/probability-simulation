import R from 'ramda';
import * as Utils from './utils';

const min = 0;
const max = 1;
const flipCoinHeader =  ['Sides of the coin', 'Number of successes'];
const flipCoinUntilheader =  ['Number of attempts', 'Number of tails', { role: 'style' }];
const colors = Utils.getThemeColours();

export const getFlipCoinResults = (size, p) => {
    let sample = getFlipCoinSample(size, true);
    const grupedSample = R.groupBy((value) => value < p ? 'Head' : 'Tail', sample)
    let results = Object.keys(grupedSample)
                        .map(key => [key, grupedSample[key].length])
    results.unshift(flipCoinHeader);
    return results;
}

export const getFlipCoinUntilResults = (size, p) => {
    let sample = getFlipCoinUntilHeadSample(size, p);
    let results = R.groupWith(R.equals, R.sort((a, b) => a - b,sample))
                   .map((value,index) => [`# ${index}`, value.length, colors[index%3]])
    results.unshift(flipCoinUntilheader);
    return results;
}

const getFlipCoinUntilHeadSample = (size,p) => new Array(size).fill(0).map( () => getTailsUntilHead(p))
const getFlipCoinSample = (size, areFloat) => new Array(size).fill(0).map( () => Utils.getRandomNumber(min, max, areFloat));

const getTailsUntilHead = (p) => {
    let notHead = true;
    let tails = 1;
    while(notHead){
      (Utils.getRandomNumber(0,1,true) < p) ? notHead = false : tails++;
    }
    return tails;
  }