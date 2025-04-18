"use client";

import { useOrder } from '@/services/order/queries/use-order';
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import React from 'react';
import { formatCurrency } from '@/utils/string';

const OrderHistory = () => {
  const { data, isLoading, error } = useOrder();

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