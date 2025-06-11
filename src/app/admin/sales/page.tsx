import SalesReport from '@/components/admin/sales-report'

export const metadata = {
  title: 'Sales Report',
  description: 'View sales statistics and trends',
}

const SalesReportPage = () => {
  return (
    <div>
      <SalesReport />
    </div>
  )
}

export default SalesReportPage