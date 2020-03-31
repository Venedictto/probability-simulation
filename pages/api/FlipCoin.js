import {getSample} from './utils/utils';


export default (req, res) => {
    const size = req.query.size;
    if(size === undefined) res.status(400).json('Size is not specify');
    const sample = getSample(parseInt(size), 0, 1, false);
    const data = [
        ['Sides of the coin', 'Number of successes', { role: 'style' }],
        ['Head', sample.filter(value => value === 0).length, '#455a64'], 
        ['Tail', sample.filter(value => value === 1).length, '#718792']]
    res.status(200).json(data);
}