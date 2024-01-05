import HomeDashboardStatsGrid from '../components/HomeDashboard/HomeDashboardStatsGrid';
import HomeDashboardIncomeExpenseChart from '../components/HomeDashboard/HomeDashboardIncomeExpenseChart';
import HomeDashboardTransactionCategoryChart from '../components/HomeDashboard/HomeDashboardTransactionCategoryChart';
import HomeDashboardRecentTransactions from '../components/HomeDashboard/HomeDashboardRecentTransactions';
import HomeDashboardTopMovingInvestments from '../components/HomeDashboard/HomeDashboardTopMovingInvestments';

function HomeDashboard() {
    return (
        <div className='flex h-full w-full flex-col gap-2 bg-transparent'>
            <HomeDashboardStatsGrid />
            <div className='flex h-[40%] w-full bg-transparent'>
                <div className='w-[75.5%]'>
                    <HomeDashboardIncomeExpenseChart />
                </div>
                <div className='ml-4 mr-4 w-[24.5%]'>
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
