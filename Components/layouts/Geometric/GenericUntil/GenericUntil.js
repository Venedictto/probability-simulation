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
const NumberOfExperimentsInput = styled(Input).attrs({placeholder:'1-10000000', type:'number', name:'Experiments'})`
`;
const HeadProbabilityInput = styled(Input).attrs({placeholder:'0.1-1', type:'number', name:'Probability'})`
`;
const SuccessInput = styled(Input).attrs({placeholder:'1-6', type:'number', name:'DsiceFace'})`
`;
const MinInput = styled(Input).attrs({placeholder:'min value', type:'number', name:'MinValue'})`
`;
const MaxInput = styled(Input).attrs({placeholder:'max value', type:'number', name:'MaxValue'})`
`;
const CenterLoader = styled(Loader)`
    display:flex !important;
    justify-content:center !important;
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

const RollDiceUntil = () => {

    const [Experiments, setExperiments] = useState('2000');
    const [Probability, setProbability] = useState('0.1666');
    const [Success, setSuccess] = useState('1');
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
        (Experiments, Probability, Success, min, max) => {
            setLoading(true);
            setExperimentData(undefined);
            const url =`api/Geometric/GenericUntil?size=${Experiments}&p=${Probability}&success=${Success}&min=${min}&max=${max}` 
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
                            max="10000001">
                    </NumberOfExperimentsInput>
                    <label>Experiments</label>
                </InputContainer>
                <InputContainer>
                    <MinInput
                            value={MinValue}
                            onBlur={(event)=> inputRangeValidator(event,setMinValue)}
                            onChange={(event) => {setMinValue(event.target.value)}}
                            min="0"
                            max="100"
                        />
                    <label>min value</label>
                </InputContainer>
                <InputContainer>
                    <MaxInput
                            value={MaxValue}
                            onBlur={(event)=> inputRangeValidator(event,setMaxValue)}
                            onChange={(event) => {setMaxValue(event.target.value)}}
                            min="0"
                            max="100"
                        />
                    <label>Max value</label>
                </InputContainer>
                <InputContainer>
                    <SuccessInput
                            value={Success}
                            onBlur={(event)=> inputRangeValidator(event,setSuccess)}
                            onChange={(event) => {setSuccess(event.target.value)}}
                            min="0.1"
                            max="1"
                        />
                    <label>Success</label>
                </InputContainer>
                <InputContainer>
                    <HeadProbabilityInput
                            value={Probability}
                            onBlur={(event)=> inputRangeValidator(event,setProbability)}
                            onChange={(event) => {setProbability(event.target.value)}}
                            min="0.1"
                            max="1"
                        />
                    <label>Probability</label>
                </InputContainer>
                <InputContainer>
                    <Button onClick={() => getExperimentResults(Experiments, Probability, Success, MinValue, MaxValue)} disabled={Loading}>Go!</Button>
                </InputContainer>
            </VariableContainer>
            {
                FieldError !== '' ? <ErrorField> ** {FieldError} </ErrorField> : <></>
            }
            {
                Loading &&
                    <CenterLoader
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
                        width={'800px'}
                        height={'800px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={ExperimentData}
                        options={chartOptions}
                    />
                </ChartContainer>
            }
        </div>
    )
}

export default RollDiceUntil;
