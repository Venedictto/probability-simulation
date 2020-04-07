import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import Input from '../../../Input/Input';
import Button from '../../../Button/Button';
import fetch from 'isomorphic-unfetch';
import Spinner from '../../../Spinner/Spinner';
import HortizontalBarChart from '../../../Charts/HortizontalBarChart';
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
const NumberOfExperimentsInput = styled(Input).attrs({placeholder:'1-10000000', type:'number', name:'Experiments'})`
`;
const HeadProbabilityInput = styled(Input).attrs({placeholder:'0.1-1', type:'number', name:'Probability'})`
`;
const SuccessInput = styled(Input).attrs({placeholder:'1-6', type:'number', name:'DiceFace'})`
`;

const RollDiceUntilLayout = () => {

    const [Experiments, setExperiments] = useState('2000');
    const [Success, setSuccess] = useState('1');
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
        (Experiments, Success) => {
            setLoading(true);
            setExperimentData(undefined);
            const url =`api/Geometric/RollDiceUntil?size=${Experiments}&diceFace=${Success}` 
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
                    <SuccessInput
                            value={Success}
                            onBlur={(event)=> inputRangeValidator(event,setSuccess)}
                            onChange={(event) => {setSuccess(event.target.value)}}
                            min="1"
                            max="6"
                        />
                    <label>Success</label>
                </InputContainer>
                <InputContainer>
                    <HeadProbabilityInput
                            value='0.16667'
                            disabled={true}
                        />
                    <label>Probability</label>
                </InputContainer>
                <InputContainer>
                    <Button onClick={() => getExperimentResults(Experiments,Success)} disabled={Loading}>Go!</Button>
                </InputContainer>
            </VariableContainer>
            <ErrorField errorMessage={ErrorMessage} />
            <Spinner loading={Loading} />
            <HortizontalBarChart data={ExperimentData} />
        </div>
    )
}

export default RollDiceUntilLayout;
