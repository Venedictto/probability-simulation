import {getGenericBernoulliResults} from '../utils/bernoulliUtils';


export default (req, res) => {
    const size = req.query.size;
    const p = req.query.p;
    const success = req.query.success;
    if (sizeIsValid(size) && probabilityIsValid(p) && successIsValid(success)) 
    {
        const data = getGenericBernoulliResults(parseInt(size), parseFloat(p), parseInt(success))
        res.status(200).json(data);
    }
    else 
    {
        res.status(400).json({message:'There are problems with the size or the probability.'});
    }
}

const sizeIsValid        = (size)     => (size !== '' && !isNaN(size) && size <= 10000000 && size > 0) 
const successIsValid     = (success) => (success !== '' && !isNaN(success) && success >= 1 && success <= 6) 
const probabilityIsValid = (p)        => (p !== '' && !isNaN(p) && p <= 1 && p >= 0) 


