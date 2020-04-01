import {getFlipCoinResults} from './utils/coinUtils';


export default (req, res) => {
    const size = req.query.size;
    const p = req.query.p;
    if (sizeIsValid(size) && probabilityIsValid(p)) 
    {
        const data = getFlipCoinResults(parseInt(size), p)
        res.status(200).json(data);
    }
    else 
    {
        res.status(400).json({message:'There are problems with the size or the probability.'});
    }
}

const sizeIsValid = (size) => {
    return  (size !== '' && !isNaN(size) && size < 10000000 && size > 0) 
}

const probabilityIsValid = (p) => {
    return  (p !== '' && !isNaN(p) && p <= 1 && p >= 0) 
}


