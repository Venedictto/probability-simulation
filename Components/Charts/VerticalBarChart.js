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
    width:900,
    height:700,
    hAxis: {
        title: 'Number of successes',
        minValue: 0,
    },
    vAxis: {
        title: 'Number of experiments',
    },
    bar: { groupWidth: '95%' },
    legend: { position: 'none' },
};
const mobileChartOptions = {
    title: '',
    chartArea: { width: '45%' },
    width:500,
    height:600,
    hAxis: {
        title: 'Number of successes',
        minValue: 0,
        textStyle : {
            fontSize: 10
        }
    },
    vAxis: {
        title: 'Number of experiments',
        textStyle : {
            fontSize: 10
        }
    },
    bar: { groupWidth: '95%' },
    legend: { position: 'none' },
};

const VerticalBarChart = (props) => 
{
    const {data} = props;
    
    return (
        <>
            {

                data !== undefined &&
                <ChartContainer>
                    <MobileChartWrapper>
                        <Chart
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={data}
                            options={mobileChartOptions}
                        />
                        </MobileChartWrapper>
                    <DefaultChartWrapper>
                        <Chart
                            chartType="ColumnChart"
                            loader={<div>Loading Chart</div>}
                            data={data}
                            options={defaultChartOptions}
                        />
                    </DefaultChartWrapper>
                </ChartContainer>
            }
        </>)
}
export default VerticalBarChart;
