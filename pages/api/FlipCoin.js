import {getSample} from './utils/utils';


export default (req, res) => {
    const size = req.query.size;
    const p = req.query.p;
    if(size === undefined || p === undefined) res.status(400).json('Size is not specify');
    const data = getFlipCoinResults(parseInt(size), 0, 1, p)
    res.status(200).json(data);
}


const getFlipCoinResults = (size, min, max, p) => {
    let heads = 0;
    let tails = 0;
    let haveExperiments = true;
    let repetitions = size;
    while (haveExperiments){
        let sample = [];
        if(repetitions > 1000000)
        {
            sample = getSample(1000000, min, max, true);
            repetitions -= 1000000
        } 
        else 
        {
            sample = getSample(repetitions, min, max, true);
            haveExperiments = false;
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