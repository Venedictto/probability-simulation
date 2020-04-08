import {getGeometricExperimentResult} from '../../../utils/geometricUtils';


export default (req, res) => {
    const size = req.query.size;
    const p = req.query.p;
    const success = req.query.success;
    if (sizeIsValid(size) && probabilityIsValid(p) && successIsValid(success))
        res.status(200).json(getGeometricExperimentResult(parseInt(size), parseInt(success), parseFloat(p)));
    else res.status(400).json('There are problems with the size or the probability.');
}

const sizeIsValid = (size) => (size !== '' && !isNaN(size) && size <= 10000000 && size > 0) 
const probabilityIsValid = (p) => (p !== '' && !isNaN(p) && p <= 1 && p >= 0.01) 
const successIsValid = (success) => (success !== '' && !isNaN(success)) 
