import {getFlipCoinUntilResults} from './utils/coinUtils';


export default (req, res) => {
    const size = req.query.size;
    const p = req.query.p;
    if(size === '' || p === '') res.status(400).json('Size is not specify');
    res.status(200).json(getFlipCoinUntilResults(parseInt(size), parseFloat(p)));
}

