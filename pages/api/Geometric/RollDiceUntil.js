import {getRollDiceUntilResults} from '../utils/geometricUtils';


export default (req, res) => {
    const size = req.query.size;
    const p = req.query.p;
    const diceFace = req.query.diceFace;
    if (sizeIsValid(size) && probabilityIsValid(p) && diceFaceIsValid(diceFace)) 
    {
        res.status(400).json('There are problems with the size or the probability.');
    }
    else
    {
        res.status(200).json(getRollDiceUntilResults(parseInt(size), parseInt(diceFace), parseFloat(p)));
    }
}

const sizeIsValid = (size) => {
    return  (size !== '' && isNaN(size) && size < 10000000 && size > 0) 
}
const probabilityIsValid = (p) => {
    return  (p !== '' && isNaN(p) && p <= 1 && p >= 0.1) 
}
const diceFaceIsValid = (diceFace) => {
    return  (diceFace !== '' && isNaN(diceFace) && diceFace > 1 && diceFace < 6) 
}
