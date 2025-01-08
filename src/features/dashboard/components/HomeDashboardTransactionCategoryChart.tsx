import React, { ReactElement, useEffect } from 'react';
import { TransactionCategoryChartData } from '@interfaces/TransactionCategoryChartData';
import { Cell, LabelList, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HomeDashboardTransactionCategoryChart() {
    const RADIAN = Math.PI / 180;
    const COLORS = ['#00C49F', '#FFBB28', '#ef4444'];

    const transactionCategoryChartData: TransactionCategoryChartData[] = [
        { name: 'Restaurant', total: 11 },
        { name: 'Groceries', total: 9 },
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
        const radius = innerRadius + (outerRadius - innerRadius) * 1.18;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;

        return (
            <text
                x={x}
                y={y}
                className='fill-textColor-secondary'
                textAnchor={x > cx ? 'start' : 'end'}
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    }

    return (
        <div className='ml-2 mr-2 flex h-full w-full flex-1 flex-col rounded-sm border border-textColor-primary bg-backgroundColor-primary'>
            <strong className='p-1 font-medium text-textColor-secondary'>
                Transaction Categories Chart
            </strong>
            <ResponsiveContainer width='99%' height='100%'>
                <PieChart>
                    <Pie
                        dataKey='total'
                        data={transactionCategoryChartData}
                        cx='52%'
                        cy='50%'
                        outerRadius='80%'
                        fill='#8884d8'
                        labelLine={true}
                        label={renderCustomizedLabels}
                        style={{ zIndex: 0 }}
                    >
                        <LabelList dataKey='name' position='right' style={{ fontSize: '12px' }} />
                        {transactionCategoryChartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default HomeDashboardTransactionCategoryChart;
