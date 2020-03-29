import React, {useState, useCallback} from 'react';
import Card from '../Components/Card/Card';
import styled from 'styled-components';
import Input from '../Components/Input/Input';
import Button from '../Components/Button/Button';

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


const NumberOfExperiments = styled(Input).attrs({placeholder:'1-1000000', type:'number', name:'Experiments'})`
`;
const HeadProbability = styled(Input).attrs({placeholder:'0-1', type:'number', name:'Probability'})`
`;

const FlipCoinSimulator = () => {
    const [Experiments, setExperiments] = useState('20000');
    const [Probability, setProbability] = useState('0.50')
    const [FieldError, setFieldError] = useState('');

    const inputRangeValidator = useCallback(
        (event,setFuncion) => {
            let { value, min, max } = event.target;
            if (Math.max(Number(min), Math.min(Number(max), Number(value))) !== Number(value)){
              setFuncion('');
              setFieldError(`Number of experiments allowed between ${min} and ${min}`);
            }
            else{
              setFieldError('');
              setFuncion(value);
            }
        }, []
    );

    return (
        <div>
            <Card>
                <VariableContainer>
                    <InputContainer>
                        <NumberOfExperiments
                                value={Experiments}
                                onBlur={(event)=> inputRangeValidator(event,setExperiments)}
                                onChange={(event) => {setExperiments(event.target.value)}}
                                name="Experiments"
                                min="1"
                                max="1000000">
                        </NumberOfExperiments>
                        <label>Experiments</label>
                    </InputContainer>
                    <InputContainer>
                        <HeadProbability
                                value={Probability}
                                onBlur={(event)=> inputRangeValidator(event,setProbability)}
                                onChange={(event) => {setProbability(event.target.value)}}
                                name="Probability"
                                min="0"
                                max="1"
                            />
                        <label>Probability</label>
                    </InputContainer>
                    <InputContainer>
                        <Button onClick={()=> {console.log('Experiments: ', Experiments); console.log('Probability: ', Probability)}}>Go!</Button>
                    </InputContainer>
                </VariableContainer>
            </Card>
        </div>
    )
}


export default FlipCoinSimulator;