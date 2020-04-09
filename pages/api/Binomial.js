import {getBinomialExperimentResult} from '../../utils/binomialUtils';

export default (req, res) => {
    const type = req.query.type;
    const size = req.query.size;
    const n = req.query.n;

    switch (type) {
        case 'FlipCoin':
            if (sizeIsValid(size) && repetitionIsValid(n)) 
                res.status(200).json(getBinomialExperimentResult(parseInt(size), 0.5, parseInt(n)));
            else res.status(400).json({message:'The size should be in the following range (1, 10.000.000)'});
            break;
        case 'RollDice':
            if (sizeIsValid(size) && repetitionIsValid(n)) res.status(200).json(getBinomialExperimentResult(parseInt(size), 0.16667, n));
            else res.status(400).json({message:'The size should be in the following range (1, 10.000.000)'});
            break;
        case 'Generic':
            const p = req.query.p;
            if (sizeIsValid(size) && repetitionIsValid(n) && probabilityIsValid(p)) 
                res.status(200).json(getBinomialExperimentResult(parseInt(size), parseFloat(p), parseInt(n)));
            else res.status(400).json({message:'The size should be in the following range (1, 10.000.000)'});
            break;
        default:
            res.status(404).json({message:'Type not found'});
            break;
    }
}

const sizeIsValid = (size) => (size !== '' && !isNaN(size) && size <= 10000000 && size > 0) 
const repetitionIsValid = (n) => (n !== '' && !isNaN(n) && n <= 1000000 && n > 0) 
const probabilityIsValid = (p) => (p !== '' && !isNaN(p) && p <= 1 && p >= 0.01) 



