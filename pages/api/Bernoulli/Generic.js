import {getGenericResults} from '../utils/bernoulliUtils';


export default (req, res) => {
    const size = req.query.size;
    const expectedResult = req.query.expectedResult;
    const min = req.query.min;
    const max = req.query.max;
    if (sizeIsValid(size, res) && minAndMaxAreValid(min,max) &&expectedResultIsValid(expectedResult)) 
    {
        const data = getGenericResults(parseInt(size), min, max, expectedResult)
        res.status(200).json(data);
    }
}

const sizeIsValid = (size, res) => {
    if(size === '' || isNaN(size) || size > 10000000 || size < 0) {
        res.status(400).json({message: 'Error with size.'});
        return false;
    }
    return true;
}
const minAndMaxAreValid = (min, max, res) => {
    if  (min === '' || isNaN(min) || max === '' || isNaN(max) || min > max)  {
        res.status(400).json({message: 'Error with min-max.'});
        return false;
    }
    return true;
}

const expectedResultIsValid = (expectedResult, min, max, res) => {
    if  (expectedResult === '' || isNaN(expectedResult) || expectedResult >= max || expectedResult <= min)  {
        res.status(400).json({message: 'Error with expected result.'});
        return false;
    }
    return true;
}


