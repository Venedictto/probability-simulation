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
`;

const NumberOfExperiments = styled(Input).attrs({placeholder:'1-1000000', type:'number', name:'Experiments'})`
`;
const HeadProbability = styled(Input).attrs({placeholder:'0-1', type:'number', name:'Probability'})`
`;

const FlipCoinSimulator = () => {
    const [Experiments, setExperiments] = useState('2000');
    const [Probability, setProbability] = useState('0.50');
    const [FieldError, setFieldError] = useState('');
    const [Loading, setLoading] = useState(false);
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
        (Experiments,Probability) => {
            setLoading(true);
            setExperimentData(undefined);
            const url =`api/FlipCoin?size=${Experiments}&p=${Probability}` 
            fetch(url)
            .then(resolve => resolve.json())
            .then(data => {setLoading(false); setExperimentData(data)});
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
                                max="100000001">
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
                        <Button onClick={() => getExperimentResults(Experiments, Probability)} disabled={Loading}>Go!</Button>
                    </InputContainer>
                </VariableContainer>

                <ChartContainer>
                    {
                        Loading &&
                            <Loader
                                type={getRandomLoaderType()}
                                color="#455a64"
                                height={250}
                                width={250}
                                timeout={3000}/>
                    }
                    {

                        ExperimentData !== undefined 
                            &&
                            <Chart
                                width={'500px'}
                                height={'500px'}
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
                    }
                    
                </ChartContainer>
            </Card>
        </div>
    )
}


export default FlipCoinSimulator;