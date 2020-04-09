import {getGeometricExperimentResult} from '../../utils/geometricUtils';


export default (req, res) => {
    const type = req.query.type;
    const size = req.query.size;

    switch (type) {
        case 'FlipCoin':
            if (sizeIsValid(size)) res.status(200).json(getGeometricExperimentResult(parseInt(size), 0, 0.5));
            else res.status(400).json({message:'The size should be in the following range (1, 10.000.000)'});
            break;
        case 'RollDice':
            const diceFace = req.query.diceFace;
            if (sizeIsValid(size) && successIsValid(diceFace)) res.status(200).json(getGeometricExperimentResult(parseInt(size), parseInt(diceFace), 0.16667));
            else res.status(400).json({message:'There are problems with the size or the dice face.'});
            break;
        case 'Generic':
            const p = req.query.p;
            const success = req.query.success;
            if (sizeIsValid(size) && probabilityIsValid(p) && successIsValid(success))
                res.status(200).json(getGeometricExperimentResult(parseInt(size), parseInt(success), parseFloat(p)));
            else res.status(400).json('There are problems with the size or the probability.');
            break;
        default:
            res.status(404).json({message:'Type not found'});
            break;
    }
}
const sizeIsValid = (size) => (size !== '' && !isNaN(size) && size <= 10000000 && size > 0) 
const probabilityIsValid = (p) => (p !== '' && !isNaN(p) && p <= 1 && p >= 0.01) 
const successIsValid = (success) => (success !== '' && !isNaN(success)) 

