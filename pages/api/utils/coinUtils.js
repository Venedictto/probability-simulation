import R from 'ramda';
import * as Utils from './utils';


const MaxNumberOfExperiments = 100000;
const min = 0;
const max = 1;
const flipCoinHeader =  ['Sides of the coin', 'Number of successes'];
const flipCoinUntilheader =  ['Number of trys', 'Number of tails', { role: 'style' }];
const colors = Utils.getThemeColours();

export const getFlipCoinResults = (size, p) => {
    let heads = 0;
    let tails = 0;
    let HaveMoreExperiments = true;
    let repetitions = size;
    while (HaveMoreExperiments){
        let sample = [];
        if(repetitions > MaxNumberOfExperiments)
        {
            sample = getSample(MaxNumberOfExperiments, min, max, true);
            repetitions -= MaxNumberOfExperiments
        } 
        else 
        {
            sample = getSample(repetitions, min, max, true);
            HaveMoreExperiments = false;
        }
        heads += sample.filter(value => value > p).length;
        tails += sample.filter(value => value < p).length;
    }
    const result = 
       [['Head', heads, ''], 
        ['Tail', tails, '']]
    result.unshift(flipCoinHeader);
    return result;
}

export const getFlipCoinUntilResults = (size, p) => {
    let tails = new Array(200).fill(0);
    for(let i = 0; i <= size; i++){
        let tailsUntilHead = getTailsUntilHead(p);
        tails[tailsUntilHead]++;
    }
    let lastZeroIndex = getLastZeroIndex(tails);
    let results = tails.map((value,index) => [index.toString(), value, colors[index%3]]).slice(0,lastZeroIndex+1);
    results.unshift(flipCoinUntilheader);2
    return results;
}

const getLastZeroIndex = (arr) => {
    let lastZeroIndex = arr.length-1;
    let lastZeroNotFound = true
    let index = arr.length
    while(lastZeroNotFound){
        index--;
        if( arr[index] !== 0){
            lastZeroIndex = index + 1;
            lastZeroNotFound = false;
        }
    }
    return lastZeroIndex;
} 
const getTailsUntilHead = (p) => {
    let notHead = true;
    let tails = 1;
    while(notHead){
      (Utils.getRandomNumber(0,1,true) < p) ? notHead = false : tails++;
    }
    return tails;
  }

const getSample = (size, min, max, areFloat) => new Array(size).fill(0).map( () => Utils.getRandomNumber(min, max, areFloat));