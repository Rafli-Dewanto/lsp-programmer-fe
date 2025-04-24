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

const CustomersOrders = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { data, isLoading, error } = useCustomersOrders({ page: Number(searchParams.get("page") || "1") });

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
        <div className="space-y-4">
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
                  <div className="text-right">
                    <p className="text-pink-600 font-bold">
                      {formatCurrency(order.total_price, "id-ID")}
                    </p>
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
                  </div>
                </div>
                {/* cake items */}
                <Show when={order.items.length > 0}>
                  <Separator className="mt-4" />
                  <ScrollArea className="max-h-[200px] pr-2">
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-800">{item.cake.title}</p>
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