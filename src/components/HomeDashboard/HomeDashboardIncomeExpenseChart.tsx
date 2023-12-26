import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { IncomeExpenseChartData } from '../../interfaces/IncomeExpenseChartData';

function HomeDashboardIncomeExpenseChart() {
    const incomeExpenseChartData: IncomeExpenseChartData[] = [
        { date: 'January 2023', Income: 8000, Expense: -3000 },
        { date: 'February 2023', Income: 10000, Expense: -5000 },
        { date: 'March 2023', Income: 9000, Expense: -6000 },
        { date: 'April 2023', Income: 7000, Expense: -3000 },
        { date: 'May 2023', Income: 5000, Expense: -2000 },
        { date: 'June 2023', Income: 10000, Expense: -2000 },
        { date: 'July 2023', Income: 8000, Expense: -1000 },
        { date: 'August 2023', Income: 8000, Expense: -5000 },
        { date: 'September 2023', Income: 7000, Expense: -5000 },
        { date: 'October 2023', Income: 11000, Expense: -4000 },
        { date: 'November 2023', Income: 7000, Expense: -6000 },
        { date: 'December 2023', Income: 10000, Expense: -2000 },
    ];

    return (
        <div className='ml-2 flex h-full w-full flex-1 flex-col rounded-sm border border-textColor-primary bg-backgroundColor-primary'>
            <strong className='p-1 font-medium text-textColor-secondary'>
                Transaction Categories
            </strong>
            <div className='mt-3 h-full w-full text-xs'>
                <ResponsiveContainer width='100%' height='100%'>
                    <BarChart
                        width={500}
                        height={500}
                        data={incomeExpenseChartData}
                        margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray='3 3 0 0' vertical={false} />
                        <XAxis dataKey='date' />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey='Income' fill='#22c55e' />
                        <Bar dataKey='Expense' fill='#ef4444' />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default HomeDashboardIncomeExpenseChart;
