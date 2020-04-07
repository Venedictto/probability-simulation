import React, {useState, useCallback} from 'react';
import Card from '../../../Card/Card';
import styled from 'styled-components';
import Input from '../../../Input/Input';
import Button from '../../../Button/Button';
import Chart from 'react-google-charts';
import fetch from 'isomorphic-unfetch';
import Spinner from '../../../Spinner/Spinner';
import {getRandomThemeColour} from '../../../../pages/api/utils/utils';

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
const ChartContainer = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    @media (max-width: 768px) {
        overflow: scroll;
    }
`;
const ErrorField = styled.div`
    color: red;
    border-radius:10px;
    height: 2rem;
    font-weight: ${props => props.theme.font.weight.bold};
`;
const ExperimentsInput = styled(Input).attrs({placeholder:'1-10000000', type:'number', name:'Experiments'})``;
const SuccessInput = styled(Input).attrs({placeholder:'Success', type:'number', name:'Success'})``;
const ProbabilityInput = styled(Input).attrs({placeholder:'0-1', type:'number', name:'Probability'})``;

const GenericLayout = () => {
    const [Experiments, setExperiments] = useState('2000');
    const [ExpectedResult, setExpectedResult] = useState('5');
    const [FieldError, setFieldError] = useState('');
    const [Loading, setLoading] = useState(false);
    const [Probability, setProbability] = useState('0.50');
    const [ExperimentData, setExperimentData] = useState(undefined);
    const [Colours, setColours] = useState(getRandomThemeColour(2));

    const inputRangeValidator = useCallback(
        (event,setFuncion) => {
            let { value, min, max } = event.target;
            if (value === '' || Math.max(Number(min), Math.min(Number(max), Number(value))) !== Number(value)){
                setFuncion(max);
                setFieldError(`Number of experiments allowed between ${min} and ${max}`);
            }
            else{
              setFieldError('');
              setFuncion(value);
            }
        }, []
    );    
    const getExperimentResults = useCallback(
        (experiments, expectedResult, Probability) => {
            setLoading(true);
            setExperimentData(undefined);
            setColours(getRandomThemeColour(2));
            const url =`api/Bernoulli/Generic?size=${experiments}&success=${expectedResult}&p=${Probability}` 
            fetch(url)
            .then(resolve => resolve.json())
            .then(data => {setLoading(false); setExperimentData(data); setFieldError('')})
            .catch(err => setLoading(false));
        }, []
    );    

    return (
        <div>
            <VariableContainer>
                <InputContainer>
                    <ExperimentsInput
                            value={Experiments}
                            onBlur={(event)=> inputRangeValidator(event,setExperiments)}
                            onChange={(event) => {setExperiments(event.target.value)}}
                            min="1"
                            max="10000000">
                    </ExperimentsInput>
                    <label>Experiments</label>
                </InputContainer>
                <InputContainer>
                    <SuccessInput
                            value={ExpectedResult}
                            onChange={(event) => {setExpectedResult(event.target.value)}}
                        />
                    <label>Success</label>
                </InputContainer>
                    <InputContainer>
                        <ProbabilityInput
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
                    <Button onClick={() => getExperimentResults(Experiments, ExpectedResult, Probability)} disabled={Loading}>Go!</Button>
                </InputContainer>
            </VariableContainer>
            {
                FieldError !== '' ? <ErrorField> ** {FieldError} </ErrorField> : <></>
            }
            <Spinner loading={Loading}/>
            {
                ExperimentData !== undefined &&
                <ChartContainer>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={ExperimentData}
                        options={{
                            is3D: true,
                            slices: {
                                0: { color: Colours[0], offset: 0.01 },
                                1: { color: Colours[1], offset: 0.01 }
                            }
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </ChartContainer>
            }   
        </div>
    )
}


export default GenericLayout;