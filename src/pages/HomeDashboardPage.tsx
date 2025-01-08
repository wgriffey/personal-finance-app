import HomeDashboardStatsGrid from '@dashboard/components/HomeDashboardStatsGrid';
import HomeDashboardIncomeExpenseChart from '@dashboard/components/HomeDashboardIncomeExpenseChart';
import HomeDashboardTransactionCategoryChart from '@dashboard/components/HomeDashboardTransactionCategoryChart';
import HomeDashboardRecentTransactions from '@dashboard/components/HomeDashboardRecentTransactions';
import HomeDashboardTopMovingInvestments from '@dashboard/components/HomeDashboardTopMovingInvestments';

function HomeDashboardPage() {
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

export default HomeDashboardPage;
