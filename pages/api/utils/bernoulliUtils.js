import R from 'ramda';
import * as Utils from './utils';

const flipCoinHeader =  ['Sides of the coin', 'Number of successes'];

export const getFlipCoinResults = (size, p) => {
    let sample = getRandomSample(size, 0, 1,true);
    const grupedSample = R.groupBy((value) => value < p ? 'Head' : 'Tail', sample)
    let results = Object.keys(grupedSample)
                        .map(key => [key, grupedSample[key].length])
    results.unshift(flipCoinHeader);
    return results;
}

export const getRollDiceResults = (size, diceFace) => {
    let sample = getRandomSample(size, 1, 6, false);
    const grupedSample = R.groupBy((value) => value === diceFace ? `is ${diceFace}` : `is not ${diceFace}`, sample)
    let results = Object.keys(grupedSample)
                        .map(key => [key, grupedSample[key].length])
    results.unshift(flipCoinHeader);
    return results;
}

export const getGenericResults = (size, min, max, expectedResult) => {
    let sample = getRandomSample(size, min, max, false);
    const grupedSample = R.groupBy((value) => value == expectedResult ? `is ${expectedResult}` : `is not ${expectedResult}`, sample)
    let results = Object.keys(grupedSample)
                        .map(key => [key, grupedSample[key].length])
    results.unshift(flipCoinHeader);
    return results;
}



const getRandomSample = (size, min, max, areFloat) => new Array(size).fill(0).map( () => Utils.getRandomNumber(min, max, areFloat));