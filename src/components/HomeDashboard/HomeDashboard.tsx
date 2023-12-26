import HomeDashboardStatsGrid from './HomeDashboardStatsGrid';
import HomeDashboardIncomeExpenseChart from './HomeDashboardIncomeExpenseChart';
import HomeDashboardTransactionCategoryChart from './HomeDashboardTransactionCategoryChart';

function HomeDashboard() {
    return (
        <div className='flex h-full w-full flex-col gap-2 bg-transparent'>
            <HomeDashboardStatsGrid />
            <div className='flex h-[40%] w-full bg-transparent'>
                <div className='h-full w-[75%]'>
                    <HomeDashboardIncomeExpenseChart />
                </div>
                <div className='h-full w-[25%] mr-4 ml-4'>
                    <HomeDashboardTransactionCategoryChart />
                </div>
            </div>
        </div>
    );
}

export default HomeDashboard;
