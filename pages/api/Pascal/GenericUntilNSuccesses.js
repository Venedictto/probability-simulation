import {getPascalExperimentResult} from '../../../utils/pascalUtils';


export default (req, res) => {
    const size = req.query.size;
    const successes = req.query.successes;
    const p = req.query.p;
    if (sizeIsValid(size) && successesIsValid(successes) && probabilityIsValid(p)) res.status(200).json(getPascalExperimentResult(parseInt(size), p, successes));
    else res.status(400).json({message:'The size should be in the following range (1, 10.000.000)'});
}

const sizeIsValid           = (size) => (size !== '' && !isNaN(size) && size <= 10000000 && size > 0) 
const successesIsValid      = (successes)    => (successes !== '' && !isNaN(successes) && successes <= 20 && successes > 0) 
const probabilityIsValid    = (p)    => (p !== '' && !isNaN(p) && p <= 1 && p >= 0.01) 
