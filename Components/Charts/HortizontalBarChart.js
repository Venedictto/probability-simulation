import React, {useState, useEffect} from 'react';
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
const MobileChartWrapper = styled.div`
    display:none;
    @media (max-width: 768px) {
        display:block;
    }
`;
const DefaultChartWrapper = styled.div`
    display:block;
    @media (max-width: 768px) {
        display:none;
    }
`;
const defaultChartOptions = {
    title: '',
    chartArea: { width: '70%' },
    width: 900,
    height: 800,
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

const mobileChartOptions = {
    title: '',
    chartArea: { width: '50%' },
    width: 500,
    height: 500,
    hAxis: {
        title: 'Number of success',
        minValue: 0,
        textStyle : {
            fontSize: 10
        }
    },
    vAxis: {
        title: 'number of experiments',
        textStyle : {
            fontSize: 10
        }
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
                    <MobileChartWrapper>
                        <Chart
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={data}
                            options={mobileChartOptions}
                        />    
                        </MobileChartWrapper>
                    <DefaultChartWrapper>
                    <Chart
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={data}
                        options={defaultChartOptions}
                    />
                    </DefaultChartWrapper>
                </ChartContainer>
            }
        </>)
}
export default HortizontalBarChart;
