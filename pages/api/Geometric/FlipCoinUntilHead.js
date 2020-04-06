import {getGeometricExperimentResult} from '../utils/geometricUtils';


export default (req, res) => {
    const size = req.query.size;
    if (sizeIsValid(size)) res.status(200).json(getGeometricExperimentResult(parseInt(size), 0, 0.5));
    else res.status(400).json({message:'The size should be in the following range (1, 10.000.000)'});
}

const sizeIsValid = (size) => (size !== '' && !isNaN(size) && size <= 10000000 && size > 0) 
