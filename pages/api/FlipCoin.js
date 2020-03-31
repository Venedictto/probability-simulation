import {getSample} from './utils/utils';


export default (req, res) => {
    const size = req.query.size;
    const p = req.query.p;
    if(size === undefined || p === undefined) res.status(400).json('Size is not specify');
    const data = getFlipCoinResults(parseInt(size), 0, 1, p)
    res.status(200).json(data);
}


const MaxNumberOfExperiments = 100000;
const getFlipCoinResults = (size, min, max, p) => {
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