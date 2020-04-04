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
const DiceFaceInput = styled(Input).attrs({placeholder:'1-6', type:'number', name:'DsiceFace'})`
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
    const [DiceFace, setDiceFace] = useState('1');
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
        (Experiments,Probability, diceFace) => {
            setLoading(true);
            setExperimentData(undefined);
            const url =`api/Geometric/RollDiceUntil?size=${Experiments}&p=${Probability}&diceFace=${diceFace}` 
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
                    <DiceFaceInput
                            value={DiceFace}
                            onBlur={(event)=> inputRangeValidator(event,setDiceFace)}
                            onChange={(event) => {setDiceFace(event.target.value)}}
                            min="0.1"
                            max="1"
                        />
                    <label>Dice face</label>
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
                    <Button onClick={() => getExperimentResults(Experiments, Probability, DiceFace)} disabled={Loading}>Go!</Button>
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
