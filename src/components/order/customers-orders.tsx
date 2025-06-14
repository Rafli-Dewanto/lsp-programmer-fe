"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useCustomersOrders } from "@/services/order/mutations/use-customers-orders";
import { formatCurrency, formatDate } from "@/utils/string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Show from "../shared/show";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import InvoicePrint from "./invoice-print";
import { useUpdateOrderStatus } from "@/services/order/mutations/use-update-order-status";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FoodStatus } from "@/services/order/types";
import { cn } from "@/lib/utils";

const foodStatus = ["pending", "delivered", "cancelled", "ready", "cooking"];

const CustomersOrders = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { data, isLoading, error } = useCustomersOrders({ page: Number(searchParams.get("page") || "1") });
  const updateOrderStatusMutation = useUpdateOrderStatus();

  const orders = data?.data || [];
  const meta = data?.meta;

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  }

  function goToPage(page: number) {
    handlePageChange(page);
  }


  return (
    <div className="container mx-auto py-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-pink-700 mb-6">Customer Orders</h1>

      <Show when={isLoading}>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      </Show>

      <Show when={!!error}>
        <p className="text-red-500">Failed to load orders. Please try again later.</p>
      </Show>

      <Show when={orders.length === 0}>
        <p className="text-gray-500">No orders found.</p>
      </Show>

      <Show when={!isLoading && !error && orders.length > 0}>
        <div className="space-y-4 px-8">
          {orders?.map((order) => (
            <Card key={order.id} className="border border-pink-200">
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold text-lg text-pink-700">
                      Order #{order.id} - {order.customer.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDate(order.created_at.toString(), "id-ID")}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      {order.delivery_address}
                    </p>
                  </div>
                  <div className="text-right space-y-6">
                    <p className="text-pink-600 font-bold">
                      {formatCurrency(order.total_price, "id-ID")}
                    </p>
                    <section className="flex justify-start items-center space-x-2">
                      {/* change into select and update the status */}
                      <Select
                        onValueChange={(status) => updateOrderStatusMutation.mutate({ orderId: order.id, status: status as FoodStatus })}
                        value={
                          order.food_status
                        }
                      >
                        <SelectTrigger className={cn(``, {
                          "bg-green-100 text-green-800": order.food_status === "delivered",
                          "bg-yellow-100 text-yellow-800": order.food_status === "pending",
                          "bg-gray-200 text-gray-700": order.food_status === "cancelled",
                          "bg-cyan-200 text-cyan-800": order.food_status === "ready",
                          "bg-pink-100 text-pink-600": order.food_status === "cooking",
                        })}>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {foodStatus.map((foodOrderStatus) => (
                            <SelectItem key={foodOrderStatus} value={foodOrderStatus} className={`my-2`}>
                              {foodOrderStatus}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-200 text-gray-700"
                          }`}
                      >
                        {order.status}
                      </span>
                    </section>
                    <div className="flex items-center gap-3 my-2">
                      <InvoicePrint order={order} />
                    </div>
                  </div>
                </div>
                {/* cake items */}
                <Show when={order.items.length > 0}>
                  <Separator className="my-3" />
                  <ScrollArea className="max-h-[200px] pr-2">
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-800">{item.menu.title}</p>
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
                </Show>
              </CardContent>
            </Card>
          ))}
        </div>
      </Show>

      {/* ShadCN Pagination */}
      {meta && meta.last_page > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => goToPage(- 1)}
                className={meta.has_prev_page ? "" : "pointer-events-none opacity-50"}
              />
            </PaginationItem>

            {Array.from({ length: meta.last_page }, (_, i) => i + 1).map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={searchParams.get("page") === p.toString()}
                  onClick={() => goToPage(p)}
                  className={p === Number(searchParams.get("page")) ? "font-bold" : ""}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => goToPage(Number(searchParams.get("page")) + 1)}
                className={meta.has_next_page ? "" : "pointer-events-none opacity-50"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default CustomersOrders;