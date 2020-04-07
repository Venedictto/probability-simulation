import {getPascalExperimentResult} from '../utils/pascalUtils';


export default (req, res) => {
    const size = req.query.size;
    const successes = req.query.successes;
    if (sizeIsValid(size) && successesIsValid(successes)) res.status(200).json(getPascalExperimentResult(parseInt(size), 0.16667, successes));
    else res.status(400).json({message:'The size should be in the following range (1, 10.000.000)'});
}

const sizeIsValid = (size) => (size !== '' && !isNaN(size) && size <= 10000000 && size > 0) 
const successesIsValid = (successes) => (successes !== '' && !isNaN(successes) && successes <= 20 && successes > 0) 
