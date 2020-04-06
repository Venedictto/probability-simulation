import {getGenericBernoulliResults} from '../utils/bernoulliUtils';


export default (req, res) => {
    const size = req.query.size;
    const diceFace = req.query.diceFace;
    if (sizeIsValid(size) && diceFaceIsValid(diceFace)) res.status(200).json(getGenericBernoulliResults(parseInt(size), 0.16667 ,parseInt(diceFace)));
    else res.status(400).json({message:'There are problems with the size or the dice face.'});
}

const sizeIsValid        = (size)     => (size !== '' && !isNaN(size) && size <= 10000000 && size > 0) 
const diceFaceIsValid    = (diceFace) => (diceFace !== '' && !isNaN(diceFace) && diceFace >= 1 && diceFace <= 6) 


