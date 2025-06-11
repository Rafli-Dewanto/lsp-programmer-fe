'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useMemo, useState } from 'react';
import { addDays } from 'date-fns';
import SalesCharts from './sales-charts';
import { useCustomersOrders } from '@/services/order/mutations/use-customers-orders';
import DatePickerWithRange from '../ui/date-picker-with-range';
import { formatCurrency } from '@/utils/string';

const SalesReport = () => {
  const [page] = useState(1);
  const { data: ordersData } = useCustomersOrders({ page });
  const [date, setDate] = useState<{
    from: Date;
    to: Date;
  }>({ from: addDays(new Date(), -30), to: new Date() });

  const filteredOrders = useMemo(() => {
    if (!ordersData?.data) return [];
    return ordersData.data.filter((order) => {
      const orderDate = new Date(order.created_at);
      return orderDate >= date.from && orderDate <= date.to;
    });
  }, [ordersData?.data, date]);

  const totalSales = useMemo(() => {
    return filteredOrders.reduce((acc, order) => acc + order.total_price, 0);
  }, [filteredOrders]);

  const totalOrders = filteredOrders.length;

  const popularItems = useMemo(() => {
    const itemMap = new Map<string, { quantity: number; revenue: number }>();
    filteredOrders.forEach((order) => {
      order.items.forEach((item) => {
        const existing = itemMap.get(item.cake.title) || { quantity: 0, revenue: 0 };
        itemMap.set(item.cake.title, {
          quantity: existing.quantity + item.quantity,
          revenue: existing.revenue + item.price * item.quantity,
        });
      });
    });
    return Array.from(itemMap.entries())
      .map(([title, stats]) => ({ title, ...stats }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [filteredOrders]);

  const exportToCSV = () => {
    const headers = ['Order ID,Date,Customer,Total Price,Items'];
    const rows = filteredOrders.map((order) => {
      const items = order.items
        .map((item) => `${item.quantity}x ${item.cake.title}`)
        .join('; ');
      return [
        order.id,
        new Date(order.created_at).toLocaleDateString(),
        order.customer.name,
        order.total_price,
        `"${items}"`,
      ].join(',');
    });
    const csv = [...headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales-report-${date.from.toLocaleDateString()}-${date.to.toLocaleDateString()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sales Report</h1>
        <div className="flex items-center gap-4">
          <DatePickerWithRange date={date} setDate={setDate} />
          <Button onClick={exportToCSV} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSales, 'id-ID')}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              Rp{totalOrders > 0 ? (totalSales / totalOrders).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0,00'}
            </div>
          </CardContent>
        </Card>
      </div>

      <SalesCharts filteredOrders={filteredOrders} popularItems={popularItems} />
    </div>
  );
};

export default SalesReport;