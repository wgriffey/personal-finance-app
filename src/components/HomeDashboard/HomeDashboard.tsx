import HomeDashboardStatsGrid from './HomeDashboardStatsGrid';
import HomeDashboardIncomeExpenseChart from './HomeDashboardIncomeExpenseChart';
import HomeDashboardTransactionCategoryChart from './HomeDashboardTransactionCategoryChart';
import HomeDashboardRecentTransactions from './HomeDashboardRecentTransactions';
import HomeDashboardTopMovingInvestments from './HomeDashboardTopMovingInvestments';

function HomeDashboard() {
    return (
        <div className='flex h-full w-full flex-col gap-2 bg-transparent'>
            <HomeDashboardStatsGrid />
            <div className='flex h-[40%] w-full bg-transparent'>
                <div className='w-[75%]'>
                    <HomeDashboardIncomeExpenseChart />
                </div>
                <div className='ml-4 mr-4 w-[25%]'>
                    <HomeDashboardTransactionCategoryChart />
                </div>
            </div>
            <div className='flex h-[50%] w-full'>
                <HomeDashboardRecentTransactions />
                <HomeDashboardTopMovingInvestments />
            </div>
        </div>
    );
}

export default HomeDashboard;
