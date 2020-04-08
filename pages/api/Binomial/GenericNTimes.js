import {getBinomialExperimentResult} from '../../../utils/binomialUtils';


export default (req, res) => {
    const size = req.query.size;
    const n = req.query.n;
    const p = req.query.p;
    if (sizeIsValid(size) && repetitionIsValid(n) && probabilityIsValid(p)) res.status(200).json(getBinomialExperimentResult(parseInt(size), p, n));
    else res.status(400).json({message:'The size should be in the following range (1, 10.000.000)'});
}

const sizeIsValid = (size) => (size !== '' && !isNaN(size) && size <= 10000000 && size > 0) 
const repetitionIsValid = (n) => (n !== '' && !isNaN(n) && n <= 1000000 && n > 0) 
const probabilityIsValid = (p) => (p !== '' && !isNaN(p) && p <= 1 && p >= 0.01) 
