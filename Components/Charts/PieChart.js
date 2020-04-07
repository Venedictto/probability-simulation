import React, {useState, useEffect} from 'react';
import {getRandomThemeColour} from '../../pages/api/utils/utils';
import styled from 'styled-components';
import Chart from 'react-google-charts';



const ChartContainer = styled.div`
display:flex;
flex-direction:row;
justify-content:center;
@media (max-width: 768px) {
    overflow: scroll;
}
`;

const PieChart = (props) => 
{
    const [Colours, setColours] = useState(getRandomThemeColour(2));
    const {data} = props;
    
    useEffect(() => {
        console.log('useEffect', data)
        setColours(getRandomThemeColour(2));
      }, [props.data]);


    return (
        <>
            {
                data !== undefined &&
                <ChartContainer>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={data}
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
        </>)
}
export default PieChart;

/*
[["Sides of the coin", "Number of successes"], ["Tail", 1020], ["Head", 980]] 
*/