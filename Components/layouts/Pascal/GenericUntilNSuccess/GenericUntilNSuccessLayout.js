import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import Input from '../../../Input/Input';
import Button from '../../../Button/Button';
import fetch from 'isomorphic-unfetch';
import Spinner from '../../../Spinner/Spinner';
import VerticalBarChart from '../../../Charts/VerticalBarChart';
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
const NumberOfExperimentsInput = styled(Input).attrs({placeholder:'1-10000000', type:'number', name:'Experiments'})``;
const ProbabilityInput = styled(Input).attrs({placeholder:'0.1-1', type:'number', name:'Probability'})``;
const SuccessesInput = styled(Input).attrs({placeholder:'1-1000', type:'number', name:'Successes'})``;

const GenericUntilNSuccessLayout = () => {

    const [Experiments, setExperiments] = useState('2000');
    const [Probability, setProbability] = useState('0.1');
    const [Successes, setSuccesses] = useState('10');
    const [ErrorMessage, setErrorMessage] = useState('');
    const [Loading, setLoading] = useState(false);
    const [ExperimentData, setExperimentData] = useState(undefined)

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
        (experiments, probability, successes ) => {
            setLoading(true);
            setExperimentData(undefined);
            const url =`api/Pascal/GenericUntilNSuccesses?size=${experiments}&p=${probability}&successes=${successes}` 
            fetch(url)
            .then(resolve => resolve.json())
            .then(data => {setLoading(false); setExperimentData(data)})
            .catch(err => setLoading(false));
        }, []
    );   

    return (
        <div>
            <VariableContainer>
                <InputContainer>
                    <NumberOfExperimentsInput
                            value={Experiments}
                            onBlur={(event)=> inputRangeValidator(event,setExperiments)}
                            onChange={(event) => {setExperiments(event.target.value)}}
                            min="1"
                            max="10000000">
                    </NumberOfExperimentsInput>
                    <label>Experiments</label>
                </InputContainer>
                <InputContainer>
                    <SuccessesInput
                            value={Successes}
                            onBlur={(event)=> inputRangeValidator(event,setSuccesses)}
                            onChange={(event) => {setSuccesses(event.target.value)}}
                            min="1"
                            max="20"/>
                    <label>Successes</label>
                </InputContainer>
                <InputContainer>
                    <ProbabilityInput
                            value={Probability}
                            onBlur={(event)=> inputRangeValidator(event,setProbability)}
                            onChange={(event) => {setProbability(event.target.value)}}
                            min="0.01"
                            max="1"
                        />
                    <label>Probability</label>
                </InputContainer>
                <InputContainer>
                    <Button onClick={() => getExperimentResults(Experiments, Probability, Successes)} disabled={Loading}>Go!</Button>
                </InputContainer>
            </VariableContainer>
            <ErrorField errorMessage={ErrorMessage} />
            <Spinner loading={Loading} />
            <VerticalBarChart data={ExperimentData}/>
        </div>
    )
}

export default GenericUntilNSuccessLayout;
