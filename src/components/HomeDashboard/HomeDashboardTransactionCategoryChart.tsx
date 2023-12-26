import React, { ReactElement, useEffect } from 'react';
import Chart from '../shared/Chart';
import { TransactionCategoryChartData } from '../../interfaces/TransactionCategoryChartData';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { render } from 'react-dom';

function HomeDashboardTransactionCategoryChart() {
    const RADIAN = Math.PI / 180;
    const COLORS = ['#00C49F', '#FFBB28', 'FF8O42'];

    const transactionCategoryChartData: TransactionCategoryChartData[] = [
        { name: 'Restaurant', total: 11 },
        { name: 'Groceries', total: 2 },
        { name: 'Entertainment', total: 2 },
        { name: 'Rent', total: 6 },
        { name: 'Electronics', total: 7 },
    ];

    function renderCustomizedLabels({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
    }: any): ReactElement<any, any> {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill='white'
                textAnchor={x > cx ? 'start' : 'end'}
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    }

    return (
        <div className='ml-2 mr-2 flex h-full w-full flex-1 flex-col rounded-sm border border-textColor-primary bg-backgroundColor-primary'>
            <strong className='p-1 font-medium text-textColor-secondary'>
                Transaction Categories
            </strong>
            <div className='h-full w-full'>
                <ResponsiveContainer width='100%' height='100%'>
                    <PieChart
                        width={100}
                        height={100}
                        margin={{ top: 40, right: 10, left: -10, bottom: 0 }}
                    >
                        <Pie
                            dataKey='total'
                            data={transactionCategoryChartData}
                            cx='50%'
                            cy='50%'
                            outerRadius={80}
                            fill='#8884d8'
                            labelLine={false}
                            label={renderCustomizedLabels}
                        >
                            {transactionCategoryChartData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default HomeDashboardTransactionCategoryChart;
