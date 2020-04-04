import {getRollDiceResults} from '../utils/bernoulliUtils';


export default (req, res) => {
    const size = req.query.size;
    const diceFace = req.query.diceFace;
    if (sizeIsValid(size) && diceFaceIsValid(diceFace)) 
    {
        const data = getRollDiceResults(parseInt(size), parseInt(diceFace))
        res.status(200).json(data);
    }
    else 
    {
        res.status(400).json({message:'There are problems with the size or the probability.'});
    }
}

const sizeIsValid = (size) => {
    return  (size !== '' && !isNaN(size) && size <= 10000000 && size > 0) 
}

const diceFaceIsValid = (diceFace) => {
    return  (diceFace !== '' && !isNaN(diceFace) && diceFace >= 1 && diceFace <= 6) 
}


