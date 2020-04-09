import {getFlipCoinResults, getGenericBernoulliResults} from '../../utils/bernoulliUtils';


export default (req, res) => {
    const type = req.query.type;
    const size = req.query.size;

    switch (type) {
        case 'FlipCoin':
            if (sizeIsValid(size)) res.status(200).json(getFlipCoinResults(parseInt(size), 0.5));
            else  res.status(400).json({message:'The size should be in the following range (1, 10.000.000)'});
            break;
        case 'RollDice':
            const diceFace = req.query.diceFace;
            if (sizeIsValid(size) && successIsValid(diceFace)) res.status(200).json(getGenericBernoulliResults(parseInt(size), 0.16667 ,parseInt(diceFace)));
            else res.status(400).json({message:'There are problems with the size or the dice face.'});
            break;
        case 'Generic':
            const p = req.query.p;
            const success = req.query.success;
            if (sizeIsValid(size) && probabilityIsValid(p)) res.status(200).json(getGenericBernoulliResults(parseInt(size), parseFloat(p), parseInt(success)));
            else res.status(400).json({message:'There are problems with the size or the probability'});
            break;
        default:
            res.status(404).json({message:'Type not found'});
            break;
    }
}

const sizeIsValid        = (size)     => (size !== '' && !isNaN(size) && size <= 10000000 && size > 0) 
const successIsValid     = (success) => (success !== '' && !isNaN(success) && success >= 1 && success <= 6) 
const probabilityIsValid = (p)        => (p !== '' && !isNaN(p) && p <= 1 && p >= 0) 


