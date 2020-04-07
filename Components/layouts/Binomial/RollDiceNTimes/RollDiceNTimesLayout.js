import React, {useState, useCallback} from 'react';
import Card from '../../../Card/Card';
import styled from 'styled-components';
import Input from '../../../Input/Input';
import Button from '../../../Button/Button';
import Chart from 'react-google-charts';
import fetch from 'isomorphic-unfetch';
import Loader from 'react-loader-spinner';
import {getRandomLoaderType, getRandomThemeColour} from '../../../../pages/api/utils/utils';

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
const NumberOfExperimentsInput = styled(Input).attrs({placeholder:'1-10000000', type:'number', name:'Experiments'})``;
const ProbabilityInput = styled(Input).attrs({placeholder:'0.1-1', type:'number', name:'Probability'})``;
const SuccessInput = styled(Input).attrs({placeholder:'1-6', type:'number', name:'DiceFace'})``;
const Repetitions = styled(Input).attrs({placeholder:'1-1000', type:'number', name:'Repetitions'})``;
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

const RollDiceNTimesLayout = () => {

    const [Experiments, setExperiments] = useState('2000');
    const [Success, setSuccess] = useState('1');
    const [NumberOfRepetitions, setNumberOfRepetitions] = useState('100');
    const [FieldError, setFieldError] = useState('');
    const [Loading, setLoading] = useState(false);
    const [ExperimentData, setExperimentData] = useState(undefined)

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
        (experiments, success, Repetitions) => {
            setLoading(true);
            setExperimentData(undefined);
            const url =`api/Binomial/RollDiceNTimes?size=${experiments}&diceFace=${success}&n=${Repetitions}` 
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
                    <Repetitions
                            value={NumberOfRepetitions}
                            onBlur={(event)=> inputRangeValidator(event,setNumberOfRepetitions)}
                            onChange={(event) => {setNumberOfRepetitions(event.target.value)}}
                            min="1"
                            max="100000"/>
                    <label>Repetitions</label>
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
                    <ProbabilityInput
                            value='0.16667'
                            disabled={true}
                        />
                    <label>Probability</label>
                </InputContainer>
                <InputContainer>
                    <Button onClick={() => getExperimentResults(Experiments,Success, NumberOfRepetitions)} disabled={Loading}>Go!</Button>
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
                        color={getRandomThemeColour(1)}
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

export default RollDiceNTimesLayout;
