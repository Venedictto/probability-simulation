import {getGenericUntilExperimentResults} from '../utils/geometricUtils';


export default (req, res) => {
    const size = req.query.size;
    const p = req.query.p;
    const success = req.query.success;
    const min = req.query.min;
    const max = req.query.max;
    if (sizeIsValid(size) && probabilityIsValid(p) && minAndMaxAreValid(min ,max) && successIsValid(success)) 
    {
        res.status(400).json('There are problems with the size or the probability.');
    }
    else
    {
        res.status(200).json(getGenericUntilExperimentResults(parseInt(size), parseInt(success), parseFloat(p), parseInt(min), parseInt(max)));
    }
}

const sizeIsValid = (size) => {
    return  (size !== '' && isNaN(size) && size < 10000000 && size > 0) 
}
const minAndMaxAreValid = (min, max) => {
    return (min !== '' && !isNaN(min) && max !== '' && !isNaN(max) && min < max)
}
const probabilityIsValid = (p) => {
    return  (p !== '' && isNaN(p) && p <= 1 && p >= 0.1) 
}
const successIsValid = (success) => {
    return  (success !== '' && isNaN(success) && success > 1 && success < 6) 
}
