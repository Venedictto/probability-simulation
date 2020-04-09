import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import Input from '../../../Input/Input';
import Button from '../../../Button/Button';
import fetch from 'isomorphic-unfetch';
import Spinner from '../../../Spinner/Spinner';
import PieChart from '../../../Charts/PieChart';
import ErrorField from '../../../ErrorField/ErrorField';

const VariableContainer = styled.div`
    display:flex;
    flex-direction: row;
    justify-content:center;
    flex-wrap:wrap;
`;
const InputContainer = styled.div`
    display:flex;
    flex-direction:column;
    margin:1rem;
    font-family: ${props => props.theme.font.family};
    font-size: ${props => props.theme.font.size.text};
    font-weight: ${props => props.theme.font.weight.bold};
`;
const NumberOfExperiments = styled(Input).attrs({placeholder:'1-10000000', type:'number', name:'Experiments'})``;
const HeadProbability = styled(Input).attrs({placeholder:'0-1', type:'number', name:'Probability'})``;

const FlipCoinLayout = () => {
    const [Experiments, setExperiments] = useState('2000');
    const [ErrorMessage, setErrorMessage] = useState('');
    const [Loading, setLoading] = useState(false);
    const [ExperimentData, setExperimentData] = useState(undefined);

    const inputRangeValidator = useCallback(
        (event,setFuncion) => {
            let { value, min, max } = event.target;
            if (value === '' || Math.max(Number(min), Math.min(Number(max), Number(value))) !== Number(value)){
                setFuncion(max);
                setErrorMessage(`Number of experiments allowed between ${min} and ${max}`);
            }
            else{
              setErrorMessage('');
              setFuncion(value);
            }
        }, []
    );    
    const getExperimentResults = useCallback(
        (Experiments) => {
            setLoading(true);
            setExperimentData(undefined);
            const url =`api/Bernoulli?type=FlipCoin&size=${Experiments}` 
            fetch(url)
            .then(resolve => resolve.json())
            .then(data => {setLoading(false); setExperimentData(data); setErrorMessage('')})
            .catch(err => setLoading(false));
        }, []
    );    

    return (
        <div>
            <VariableContainer>
                <InputContainer>
                    <NumberOfExperiments
                            value={Experiments}
                            onBlur={(event)=> inputRangeValidator(event,setExperiments)}
                            onChange={(event) => {setExperiments(event.target.value)}}
                            min="1"
                            max="10000000">
                    </NumberOfExperiments>
                    <label>Experiments</label>
                </InputContainer>
                <InputContainer>
                    <HeadProbability
                            value='0.5'
                            disabled={true}
                        />
                    <label>Probability</label>
                </InputContainer>
                <InputContainer>
                    <Button onClick={() => getExperimentResults(Experiments)} disabled={Loading}>Go!</Button>
                </InputContainer>
            </VariableContainer>
            <ErrorField errorMessage={ErrorMessage}/>
            <Spinner loading={Loading}/>
            <PieChart data={ExperimentData}/>
        </div>
    )
}


export default FlipCoinLayout;