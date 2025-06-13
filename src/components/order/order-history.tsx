"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from '@/contexts/auth-context';
import { useOrder } from '@/services/order/queries/use-order';
import { usePaymentURL } from '@/services/payments/queries/use-payment-url';
import { formatCurrency } from '@/utils/string';
import { useState } from 'react';
import Show from '../shared/show';
import { Button } from '../ui/button';
import { toast } from "sonner";

const OrderHistory = () => {
  const { data, isLoading, error } = useOrder();
  const { email } = useAuth();
  const [selectedPendingOrder, setSelectedPendingOrder] = useState<string | null>(null);
  const { data: paymentData } = usePaymentURL(selectedPendingOrder ?? "");

  if (!email) {
    return <p className="text-center mt-8">Please log in to view your order history.</p>;
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-24 w-full rounded-xl" />
      </div>
    );
  }

  if (error || data == null) {
    return <p className="text-red-500 text-center mt-8">Failed to load orders.</p>;
  }

  if (!data || data.data?.length === 0) {
    return <p className="text-center mt-8 text-gray-500">You have no order history yet.</p>;
  }

  const handlePayment = (orderID: string) => {
    // this will trigger the payment hook and returns the payment URL
    setSelectedPendingOrder(orderID);
    if (!paymentData || !paymentData?.data) {
      toast.error("Failed to load payment URL.");
      return;
    }
    window.location.href = paymentData.data as string;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-4">Order History</h1>
      {data?.data?.map((order) => (
        <Card key={order.id} className="rounded-2xl shadow-md border border-gray-200">
          <CardContent className="py-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-lg font-semibold text-gray-800">Order #{order.id}</p>
                <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleString()}</p>
              </div>
              <div className='flex flex-col items-center justify-center space-y-3.5'>
                <section className="flex justify-start items-center space-x-2">
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${order.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {order.status}
                  </span>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${order.food_status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.food_status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {order.food_status}
                  </span>
                </section>
                <Show when={order.status === "pending"}>
                  <Button onClick={() => handlePayment(order.id.toString())}
                    variant="outline"
                    className="text-pink-600 border-pink-200 hover:bg-pink-50">
                    Pay
                  </Button>
                </Show>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm text-gray-600 mb-1 font-medium">Delivery Address:</p>
              <p className="text-sm text-gray-800">{order.delivery_address}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1 font-medium">Customer:</p>
              <p className="text-sm text-gray-800">{order.customer.name} ({order.customer.email})</p>
            </div>

            <Separator />

            <ScrollArea className="max-h-[200px] pr-2">
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.cake.title}</p>
                      <p className="text-xs text-gray-500">
                        {item.quantity} × {formatCurrency(item.price, 'id-ID')}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-pink-600">
                      {formatCurrency(item.price * item.quantity, "id-ID")}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex justify-between items-center pt-4 border-t">
              <p className="text-md font-medium text-gray-700">Total:</p>
              <p className="text-md font-bold text-pink-600">
                {formatCurrency(order.total_price, "id-ID")}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderHistory;