import React, {useState, useCallback} from 'react';
import Card from '../../../Card/Card';
import styled from 'styled-components';
import Input from '../../../Input/Input';
import Button from '../../../Button/Button';
import Chart from 'react-google-charts';
import fetch from 'isomorphic-unfetch';
import Loader from 'react-loader-spinner';
import {getRandomLoaderType} from '../../../../pages/api/utils/utils';

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
const NumberOfExperiments = styled(Input).attrs({placeholder:'1-10000000', type:'number', name:'Experiments'})`
`;
const ExpextedResult = styled(Input).attrs({placeholder:'(min,max)', type:'number', name:'Dice face'})`
`;
const Min = styled(Input).attrs({placeholder:'min value', type:'number', name:'MinValue'})`
`;
const Max = styled(Input).attrs({placeholder:'max value', type:'number', name:'MaxValue'})`
`;

const GenericLayout = () => {
    const [Experiments, setExperiments] = useState('2000');
    const [ExpectedResult, setExpectedResult] = useState('');
    const [MinValue, setMinValue] = useState('0');
    const [MaxValue, setMaxValue] = useState('10');
    const [FieldError, setFieldError] = useState('');
    const [Loading, setLoading] = useState(false);
    const [ExperimentData, setExperimentData] = useState(undefined)

    const inputRangeValidator = useCallback(
        (event,setFuncion) => {
            let { value, min, max } = event.target;
            if (value === '' || Math.max(Number(min), Math.min(Number(max), Number(value))) !== Number(value)){
              setFuncion('');
              setFieldError(`Number of experiments allowed between ${min} and ${max}`);
            }
            else{
              setFieldError('');
              setFuncion(value);
            }
        }, []
    );    
    const getExperimentResults = useCallback(
        (experiments, min, max, expectedResult) => {
            setLoading(true);
            setExperimentData(undefined);
            const url =`api/Bernoulli/Generic?size=${experiments}&min=${min}&max=${max}&expectedResult=${expectedResult}` 
            fetch(url)
            .then(resolve => resolve.json())
            .then(data => {setLoading(false); setExperimentData(data)})
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
                                max="10000001">
                        </NumberOfExperiments>
                        <label>Experiments</label>
                    </InputContainer>
                    <InputContainer>
                        <Min
                                value={MinValue}
                                onBlur={(event)=> inputRangeValidator(event,setMinValue)}
                                onChange={(event) => {setMinValue(event.target.value)}}
                                min="0"
                                max="100"
                            />
                        <label>min value</label>
                    </InputContainer>
                    <InputContainer>
                        <Max
                                value={MaxValue}
                                onBlur={(event)=> inputRangeValidator(event,setMaxValue)}
                                onChange={(event) => {setMaxValue(event.target.value)}}
                                min="0"
                                max="100"
                            />
                        <label>Max value</label>
                    </InputContainer>
                    <InputContainer>
                        <ExpextedResult
                                value={ExpectedResult}
                                onBlur={(event)=> inputRangeValidator(event,setExpectedResult)}
                                onChange={(event) => {setExpectedResult(event.target.value)}}
                                min={(MinValue === '') ? '0' : MinValue }
                                max={(MaxValue === '') ? '100' : MaxValue }
                            />
                        <label>Expected result</label>
                    </InputContainer>
                    <InputContainer>
                        <Button onClick={() => getExperimentResults(Experiments, MinValue, MaxValue, ExpectedResult)} disabled={Loading}>Go!</Button>
                    </InputContainer>
                </VariableContainer>
                {
                    FieldError !== '' ? <ErrorField> ** {FieldError} </ErrorField> : <></>
                }
                    {
                        Loading &&
                            <Loader
                                // @ts-ignore
                                type={getRandomLoaderType()}
                                color="#455a64"
                                height={250}
                                width={250}
                                timeout={5000}/>
                    }
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
                                        0: { color: '#455a64', offset: 0.01 },
                                        1: { color: '#718792', offset: 0.01 },
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