import {getGeometricExperimentResult} from '../../../utils/geometricUtils';


export default (req, res) => {
    const size = req.query.size;
    const diceFace = req.query.diceFace;
    if (sizeIsValid(size) && diceFaceIsValid(diceFace)) res.status(200).json(getGeometricExperimentResult(parseInt(size), parseInt(diceFace), 0.16667));
    else res.status(400).json({message:'There are problems with the size or the dice face.'});
}

const sizeIsValid = (size) => (size !== '' && !isNaN(size) && size <= 10000000 && size > 0) 
const diceFaceIsValid = (diceFace) => (diceFace !== '' && !isNaN(diceFace) && diceFace >= 1 && diceFace <= 6) 
