import React, {useState, useCallback} from 'react';
import Card from '../Components/Card/Card';
import styled from 'styled-components';
import Input from '../Components/Input/Input';
import Button from '../Components/Button/Button';
import Chart from 'react-google-charts';
import fetch from 'isomorphic-unfetch';

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
`;

const NumberOfExperiments = styled(Input).attrs({placeholder:'1-1000000', type:'number', name:'Experiments'})`
`;
const HeadProbability = styled(Input).attrs({placeholder:'0-1', type:'number', name:'Probability'})`
`;
const chartOptions = {
    title: 'omega',
    chartArea: { width: '50%' },
    hAxis: {
        title: 'Number of success',
        minValue: 0,
    },
    vAxis: {
        title: 'Omega',
    },
};

const FlipCoinSimulator = () => {
    const [Experiments, setExperiments] = useState('2000');
    const [Probability, setProbability] = useState('0.50');
    const [FieldError, setFieldError] = useState('');
    const [ExperimentData, setExperimentData] = useState(undefined)

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
    const getExperimentResults = useCallback(
        (Experiments) => {
            const url =`api/FlipCoin?size=${Experiments}` 
            fetch(url)
            .then(resolve => resolve.json())
            .then(data => setExperimentData(data));
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
                                max="10000000">
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
                        <Button onClick={() => getExperimentResults(Experiments)}>Go!</Button>
                    </InputContainer>
                </VariableContainer>
                <ChartContainer>
                    {
                        ExperimentData !== undefined 
                            &&
                                <Chart
                                    width={'500px'}
                                    height={'300px'}
                                    chartType="BarChart"
                                    loader={<div>Loading Chart</div>}
                                    data={ExperimentData}
                                    options={chartOptions}
                                />
                    }
                </ChartContainer>
            </Card>
        </div>
    )
}


export default FlipCoinSimulator;