import React from 'react';
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
const chartOptions = {
    title: '',
    chartArea: { width: '50%' },
    hAxis: {
        title: 'Number of success',
        minValue: 0,
    },
    vAxis: {
        title: 'number of experiments',
    },
    bar: { groupWidth: '95%' },
    legend: { position: 'none' },
};

const HortizontalBarChart = (props) => 
{
    const {data} = props;
    
    return (
        <>
            {

                data !== undefined &&
                <ChartContainer>
                    <Chart
                    
                        width={'800px'}
                        height={'800px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={data}
                        options={chartOptions}
                    />
                </ChartContainer>
            }
        </>)
}
export default HortizontalBarChart;
