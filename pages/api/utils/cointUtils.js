import R from 'ramda';
import * as Utils from './utils';

const MaxNumberOfExperiments = 100000;


export const getSample = (size, min, max, areFloat) => new Array(size).fill(0).map( () => Utils.getRandomNumber(min, max, areFloat));

export const getFlipCoinResults = (size, min, max, p) => {
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
    const data = 
       [['Sides of the coin', 'Number of successes', { role: 'style' }],
        ['Head', heads, ''], 
        ['Tail', tails, '']]
    
    return data;
}


export const getTailsUntilFace = (p) => {
    let notFace = true;
    let tails = 0;
    while(notFace){
      (Utils.getRandomNumber(0,1,true) < p) ? notFace = false : tails++;
    }
    return tails;
  }