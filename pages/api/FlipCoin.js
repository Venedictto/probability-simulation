import {getFlipCoinResults} from './utils/cointUtils';


export default (req, res) => {
    const size = req.query.size;
    const p = req.query.p;
    if (size === '' || p === '') 
    {
        res.status(400).json({message:'Size or Probability are not specify'});
    } 
    else{
        const data = getFlipCoinResults(parseInt(size), 0, 1, p)
        res.status(200).json(data);
    }
}


