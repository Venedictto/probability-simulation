import {getBinomialExperimentResult} from '../../../utils/binomialUtils';


export default (req, res) => {
    const size = req.query.size;
    const n = req.query.n;
    if (sizeIsValid(size) && repetitionIsValid(n)) res.status(200).json(getBinomialExperimentResult(parseInt(size), 0.16667, n));
    else res.status(400).json({message:'The size should be in the following range (1, 10.000.000)'});
}

const sizeIsValid = (size) => (size !== '' && !isNaN(size) && size <= 10000000 && size > 0) 
const repetitionIsValid = (n) => (n !== '' && !isNaN(n) && n <= 1000000 && n > 0) 
