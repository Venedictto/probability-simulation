import {getSample} from './utils/utils';


export default (req, res) => {
    const size = req.query.size;
    const sample = getSample(parseInt(size), 0, 1, false);
    const data = [['Head', sample.filter(value => value === 0).length, '#455a64'], ['Tail', sample.filter(value => value === 1).length, '#718792']]
    res.status(200).json(data);
}
