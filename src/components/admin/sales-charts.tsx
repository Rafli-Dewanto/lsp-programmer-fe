import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GetOrderResponse } from '@/services/order/types';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

interface SalesChartsProps {
  filteredOrders: GetOrderResponse[];
  popularItems: { title: string; quantity: number; revenue: number }[];
}

const SalesCharts = ({ filteredOrders, popularItems }: SalesChartsProps) => {
  const dailySales = useMemo(() => {
    const salesByDay = new Map<string, number>();
    filteredOrders.forEach((order) => {
      const date = new Date(order.created_at).toLocaleDateString();
      salesByDay.set(date, (salesByDay.get(date) || 0) + order.total_price);
    });
    return Array.from(salesByDay.entries())
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filteredOrders]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Daily Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <LineChart
              width={500}
              height={300}
              data={dailySales}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#FF1493"
                name="Sales (IDR)"
              />
            </LineChart>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Selling Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <BarChart
              width={500}
              height={300}
              data={popularItems}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#FF1493" name="Revenue (IDR)" />
              <Bar dataKey="quantity" fill="#FF69B4" name="Quantity" />
            </BarChart>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesCharts;