import React from 'react';
import { BoxWrapperProps } from '@interfaces/BoxWrapperProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHandHoldingDollar,
    faMoneyBill,
    faMoneyBillTrendUp,
    faSackDollar,
} from '@fortawesome/free-solid-svg-icons';

function DashboardStatsGrid() {
    return (
        <div
            id='home-dashboard-stats-grid'
            className='mt-2 flex w-full gap-4 overflow-x-auto overflow-y-hidden px-2'
        >
            <BoxWrapper>
                <div className='mt-1.5 flex h-7 w-14 items-center justify-center rounded-full bg-green-500 md:h-10 md:w-10'>
                    <FontAwesomeIcon
                        icon={faMoneyBill}
                        className='h-4 w-4 text-textColor-secondary md:h-6 md:w-6'
                    />
                </div>
                <div className='ml-4 flex flex-col'>
                    <span className='text-sm font-light text-textColor-secondary'>Income</span>
                    <strong className='text-md font-semibold text-textColor-secondary'>
                        $1000.00
                    </strong>
                </div>
                <div className='flex'>
                    <span className='pl-2 text-sm text-green-500 md:mt-5'>
                        +$200.00 from last month
                    </span>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className='mt-1.5 flex h-7 w-12 items-center justify-center rounded-full bg-red-500 md:h-10 md:w-10'>
                    <FontAwesomeIcon
                        icon={faHandHoldingDollar}
                        className='h-4 w-4 text-textColor-secondary md:h-6 md:w-6'
                    />
                </div>
                <div className='ml-4 flex flex-col'>
                    <span className='text-sm font-light text-textColor-secondary'>Expense</span>
                    <strong className='text-md font-semibold text-textColor-secondary'>
                        $300.00
                    </strong>
                </div>
                <div className='flex items-center'>
                    <span className='pl-2 text-sm text-red-500 md:mt-5'>
                        +$150.00 from last month
                    </span>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className='mt-1.5 flex h-7 w-12 items-center justify-center rounded-full bg-blue-500 md:h-10 md:w-10'>
                    <FontAwesomeIcon
                        icon={faMoneyBillTrendUp}
                        className='h-4 w-4 text-textColor-secondary md:h-6 md:w-6'
                    />
                </div>
                <div className='ml-4 flex flex-col'>
                    <span className='text-sm font-light text-textColor-secondary'>Investments</span>
                    <strong className='text-md font-semibold text-textColor-secondary'>
                        $20,000
                    </strong>
                </div>
                <div className='flex items-center'>
                    <span className='pl-2 text-sm text-green-500 md:mt-5'>
                        +$15,000.00 from last month
                    </span>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className='mt-1.5 flex h-7 w-12 items-center justify-center rounded-full bg-green-500 md:h-10 md:w-10'>
                    <FontAwesomeIcon
                        icon={faSackDollar}
                        className='h-4 w-4 text-textColor-secondary md:h-6 md:w-6'
                    />
                </div>
                <div className='ml-4 flex flex-col'>
                    <span className='text-sm font-light text-textColor-secondary'>Net Worth</span>
                    <strong className='text-md font-semibold text-textColor-secondary'>
                        $1000.00
                    </strong>
                </div>
                <div className='flex items-center'>
                    <span className='pl-2 text-sm text-green-500 md:mt-4'>
                        +$200.00 from last month
                    </span>
                </div>
            </BoxWrapper>
        </div>
    );
}

export default DashboardStatsGrid;

function BoxWrapper(wrapperProps: BoxWrapperProps) {
    return (
        <div className='flex flex-1 items-center rounded-md border border-textColor-primary bg-backgroundColor-primary p-4 text-start'>
            {wrapperProps.children}
        </div>
    );
}
