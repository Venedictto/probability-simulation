import React, {useState, useCallback} from 'react';
import Card from '../Components/Card/Card';
import styled from 'styled-components';
import Input from '../Components/Input/Input';
import Button from '../Components/Button/Button';
import Chart from 'react-google-charts';
import fetch from 'isomorphic-unfetch';
import Loader from 'react-loader-spinner';
import {getRandomLoaderType} from './api/utils/utils';

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
const HeadProbability = styled(Input).attrs({placeholder:'0.1-1', type:'number', name:'Probability'})`
`;
const chartOptions = {
    title: '',
    chartArea: { width: '50%' },
    hAxis: {
        title: 'Number of tails',
        minValue: 0,
    },
    vAxis: {
        title: 'number of thrown',
    },
    bar: { groupWidth: '95%' },
    legend: { position: 'none' },
};

const FlipCoinUntilSimulator = () => {

    const [Experiments, setExperiments] = useState('2000');
    const [Probability, setProbability] = useState('0.50');
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
        (Experiments,Probability) => {
            setLoading(true);
            setExperimentData(undefined);
            const url =`api/FlipCoinUntil?size=${Experiments}&p=${Probability}` 
            fetch(url)
            .then(resolve => resolve.json())
            .then(data => {setLoading(false); setExperimentData(data)})
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
                                max="10000001">
                        </NumberOfExperiments>
                        <label>Experiments</label>
                    </InputContainer>
                    <InputContainer>
                        <HeadProbability
                                value={Probability}
                                onBlur={(event)=> inputRangeValidator(event,setProbability)}
                                onChange={(event) => {setProbability(event.target.value)}}
                                name="Probability"
                                min="0.1"
                                max="1"
                            />
                        <label>Probability</label>
                    </InputContainer>
                    <InputContainer>
                        <Button onClick={() => getExperimentResults(Experiments, Probability)} disabled={Loading}>Go!</Button>
                    </InputContainer>
                </VariableContainer>
                {
                    FieldError !== '' ? <ErrorField> ** {FieldError} </ErrorField> : <></>
                }
                <ChartContainer>
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
                            <Chart
                                width={'800px'}
                                height={'800px'}
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

export default FlipCoinUntilSimulator;
