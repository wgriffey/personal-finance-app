import React from 'react';
import { BoxWrapperProps } from '../../interfaces/BoxWrapperProps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHandHoldingDollar,
    faMoneyBillTrendUp,
    faSackDollar,
} from '@fortawesome/free-solid-svg-icons';

function HomeDashboardStatsGrid() {
    return (
        <div className='mt-2 flex w-full gap-4 overflow-auto px-2'>
            <BoxWrapper>
                <div className='mt-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 md:h-10 md:w-10'>
                    <FontAwesomeIcon
                        icon={faSackDollar}
                        className='h-4 w-4 text-textColor-secondary md:h-6 md:w-6'
                    />
                </div>
                <div className='ml-4'>
                    <span className='text-sm font-light text-textColor-secondary'>Income</span>
                    <div className='flex items-center'>
                        <strong className='text-md font-semibold text-textColor-secondary'>
                            $1000.00
                        </strong>
                        <span className='pl-2 text-sm text-green-500'>
                            +$200.00 from last month
                        </span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className='mt-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 md:h-10 md:w-10'>
                    <FontAwesomeIcon
                        icon={faHandHoldingDollar}
                        className='h-4 w-4 text-textColor-secondary md:h-6 md:w-6'
                    />
                </div>
                <div className='ml-4'>
                    <span className='text-sm font-light text-textColor-secondary'>Expense</span>
                    <div className='flex items-center'>
                        <strong className='text-md font-semibold text-textColor-secondary'>
                            $300.00
                        </strong>
                        <span className='pl-2 text-sm text-red-500'>+$150.00 from last month</span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className='mt-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 md:h-10 md:w-10'>
                    <FontAwesomeIcon
                        icon={faMoneyBillTrendUp}
                        className='h-4 w-4 text-textColor-secondary md:h-6 md:w-6'
                    />
                </div>
                <div className='ml-4'>
                    <span className='text-sm font-light text-textColor-secondary'>Investments</span>
                    <div className='flex items-center'>
                        <strong className='text-md font-semibold text-textColor-secondary'>
                            $20,000
                        </strong>
                        <span className='pl-2 text-sm text-green-500'>
                            +$15,000.00 from last month
                        </span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className='mt-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 md:h-10 md:w-10'>
                    <FontAwesomeIcon
                        icon={faSackDollar}
                        className='h-4 w-4 text-textColor-secondary md:h-6 md:w-6'
                    />
                </div>
                <div className='ml-4'>
                    <span className='text-sm font-light text-textColor-secondary'>Net Worth</span>
                    <div className='flex items-center'>
                        <strong className='text-md font-semibold text-textColor-secondary'>
                            $1000.00
                        </strong>
                        <span className='pl-2 text-sm text-green-500'>
                            +$200.00 from last month
                        </span>
                    </div>
                </div>
            </BoxWrapper>
        </div>
    );
}

export default HomeDashboardStatsGrid;

function BoxWrapper(wrapperProps: BoxWrapperProps) {
    return (
        <div className='flex flex-1 rounded-md border border-textColor-primary bg-backgroundColor-primary p-4'>
            {wrapperProps.children}
        </div>
    );
}
