import React, {useState, useCallback} from 'react';
import Card from '../../../Card/Card';
import styled from 'styled-components';
import Input from '../../../Input/Input';
import Button from '../../../Button/Button';
import Chart from 'react-google-charts';
import fetch from 'isomorphic-unfetch';
import {getRandomThemeColour} from '../../../../pages/api/utils/utils';
import Spinner from '../../../Spinner/Spinner';

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
const SuccessInput = styled(Input).attrs({placeholder:'1-6', type:'number', name:'Dice face'})``;
const ProbabilityInput = styled(Input).attrs({placeholder:'0-1', type:'number', name:'ProbabilityInput'})``;

const RollDiceLayout = () => {
    const [Experiments, setExperiments] = useState('2000');
    const [DiceFace, setDiceFace] = useState('6');
    const [FieldError, setFieldError] = useState('');
    const [Loading, setLoading] = useState(false);
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
        (Experiments,DiceFace) => {
            setLoading(true);
            setExperimentData(undefined);
            setColours(getRandomThemeColour(2));
            const url =`api/Bernoulli/RollDice?size=${Experiments}&diceFace=${DiceFace}` 
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
                                value={DiceFace}
                                onBlur={(event)=> inputRangeValidator(event,setDiceFace)}
                                onChange={(event) => {setDiceFace(event.target.value)}}
                                min="1"
                                max="6"
                            />
                        <label>Dice face</label>
                    </InputContainer>
                    <InputContainer>
                        <ProbabilityInput
                                value='0.16667'
                                disabled={true}
                            />
                        <label>Probability</label>
                    </InputContainer>
                    <InputContainer>
                        <Button onClick={() => getExperimentResults(Experiments, DiceFace)} disabled={Loading}>Go!</Button>
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


export default RollDiceLayout;