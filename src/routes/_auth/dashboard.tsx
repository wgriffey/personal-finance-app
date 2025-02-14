import DashboardIncomeExpenseChart from '@dashboard/components/DashboardIncomeExpenseChart'
import DashboardRecentTransactions from '@dashboard/components/DashboardRecentTransactions'
import DashboardStatsGrid from '@dashboard/components/DashboardStatsGrid'
import DashboardTopMovingInvestments from '@dashboard/components/DashboardTopMovingInvestments'
import DashboardTransactionCategoryChart from '@dashboard/components/DashboardTransactionCategoryChart'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="flex max-h-full w-full flex-col gap-2 bg-transparent">
      <DashboardStatsGrid />
      <div className="flex h-[40%] w-full bg-transparent">
        <div className="w-[75.5%]">
          <DashboardIncomeExpenseChart />
        </div>
        <div className="ml-4 mr-4 w-[24.5%]">
          <DashboardTransactionCategoryChart />
        </div>
      </div>
      <div className="flex h-[50%] max-w-full">
        <DashboardRecentTransactions />
        <DashboardTopMovingInvestments />
      </div>
    </div>
  )
}
