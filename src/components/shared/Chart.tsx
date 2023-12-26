import React from 'react';
import { ChartProps } from '../../interfaces/GoogleChartProps';
import { Bar, BarChart, CartesianGrid, Legend, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function Chart(chartProps: ChartProps) {
    function renderChart(): any {
        switch (chartProps.chartType) {
            case 'PieChart':
                return <PieChart></PieChart>;
            case 'BarChart':
                return (
                    <BarChart
                        width={500}
                        height={300}
                        data={chartProps.data}
                        margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='name' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey='pv' fill='#8884d8' />
                        <Bar dataKey='uv' fill='#82ca9d' />
                    </BarChart>
                );
            default:
                <div></div>
        }
    }

    return (
        <ResponsiveContainer width='100%' height='100%'>
            {renderChart()}
        </ResponsiveContainer>
        // <Chart
        //     chartType={chartProps.chartType}
        //     data={chartProps.data}
        //     options={chartProps.options}
        //     width='100%'
        //     height='400px'
        // />
    );
}

export default Chart;
