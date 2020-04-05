import R from 'ramda';
import * as Utils from './utils';

const flipCoinHeader =  ['Sides of the coin', 'Number of successes'];


export const getFlipCoinResults = (size, p) => {
    let sample = getBeroulliSample(size, p);
    const grupedSample = R.groupBy((value) => value < p ? 'Head' : 'Tail', sample)
    let results = Object.keys(grupedSample).map(key => [key, grupedSample[key].length]);
    results.unshift(flipCoinHeader);
    return results;
}

export const getRollDiceResults = (size, success) => {
    return getGenericBernoulliResults(size, 1/6, success);
}

export const getGenericBernoulliResults = (size, p, success) => {
    let sample = getBeroulliSample(size, p);
    const grupedSample = R.groupBy((value) => value < p ? `Is ${success}` : `Is not ${success}`, sample)
    let results = Object.keys(grupedSample).map(key => [key, grupedSample[key].length]);
    results.unshift(flipCoinHeader);
    return results;
}

const getBeroulliSample = (size, p) => {
    return new Array(size).fill(0).map( () => doBernoulliExperiment(p));
}
const doBernoulliExperiment = (p) => {
    return (Math.random() <= p)
}
