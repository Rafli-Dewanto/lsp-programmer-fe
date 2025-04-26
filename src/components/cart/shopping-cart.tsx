"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAddCart } from '@/services/cart/mutations/use-add-cart';
import { useRemoveCart } from '@/services/cart/mutations/use-remove-cart';
import { useCarts } from '@/services/cart/queries/use-carts';
import { usePlaceOrder } from '@/services/order/mutations/use-place-order';
import { formatCurrency } from '@/utils/string';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight, ShoppingCart as CartIcon, Package } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import Show from '../shared/show';

const ShoppingCart = () => {
  const { data: cart, isLoading } = useCarts();
  const addCartMutation = useAddCart();
  const removeCartMutation = useRemoveCart();
  const orderMutation = usePlaceOrder();
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart?.data?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const totalItems = cart?.data?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  function handleCheckout() {
    setIsProcessing(true);
    orderMutation.mutate({
      items: cart?.data?.map((item) => ({
        cake_id: item.id,
        quantity: item.quantity,
        price: item.price,
      })) || [],
    }, {
      onSuccess: (data) => {
        if (data.data?.redirect_url) {
          window.location.href = data.data.redirect_url;
        } else {
          toast(`Order Placed Successfully`);
        }
        setIsProcessing(false);
      },
      onError: (error) => {
        toast(`Error Processing Order ${error.message}`);
        setIsProcessing(false);
      },
    });
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-pink-200 border-t-pink-600 animate-spin" />
        <p className="text-gray-500 font-medium">Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <CartIcon className="text-pink-600" size={24} />
          Your Cart {totalItems > 0 && (
            <span className="ml-2 bg-pink-100 text-pink-700 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
          )}
        </h2>
      </div>

      <Show when={!cart?.data?.length}>
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="bg-pink-50 p-6 rounded-full">
            <Package size={64} className="text-pink-400" />
          </div>
          <p className="text-xl font-medium text-gray-800">Your cart is empty</p>
          <p className="text-gray-500 text-center max-w-md">
            Looks like you haven&apos;t added any delicious cakes to your cart yet.
          </p>
          <Button
            variant="outline"
            className="mt-4 border-pink-200 text-pink-700 hover:bg-pink-50"
            onClick={() => window.location.href = '/cakes'}
          >
            Browse Cakes
          </Button>
        </div>
      </Show>

      <Show when={!!cart?.data?.length}>
        <ScrollArea className="max-h-[400px] pr-3 -mr-3">
          <div className="space-y-4">
            {cart?.data?.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border border-gray-100 rounded-2xl hover:shadow-md transition-all duration-200">
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <div className="relative bg-pink-50 rounded-xl w-16 h-16 flex items-center justify-center mr-4 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="object-cover"
                        />
                        <div className="absolute top-0 right-0 bg-pink-600 text-white rounded-bl-lg px-1.5 py-0.5 text-xs font-bold">
                          {item.quantity}×
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 mb-1">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatCurrency(item.price, "id-ID")} each
                        </p>
                      </div>
                      <div className="text-right space-y-4">
                        <p className="text-lg font-bold text-pink-600">
                          {formatCurrency(item.price * item.quantity, "id-ID")}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              removeCartMutation.mutate(item.id);
                            }}
                          >
                            -
                          </Button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              addCartMutation.mutate({
                                cake_id: item.id,
                                quantity: item.quantity + 1,
                              });
                            }}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        <Separator className="my-6 bg-gray-100" />

        <div className="space-y-3">
          <div className="flex justify-between items-center text-gray-600">
            <p>Subtotal</p>
            <p>{formatCurrency(total, 'id-ID')}</p>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <p>Shipping</p>
            <p className="text-green-600">Free</p>
          </div>
          <Separator className="my-3 bg-gray-100" />
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold text-gray-800">Total</p>
            <p className="text-xl font-bold text-pink-600">{formatCurrency(total, 'id-ID')}</p>
          </div>
        </div>

        <Button
          onClick={handleCheckout}
          disabled={isProcessing || !cart?.data?.length}
          className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white text-lg py-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin mr-2" />
              Processing...
            </>
          ) : (
            <>
              Proceed to Checkout
              <ArrowRight size={20} />
            </>
          )}
        </Button>

        <p className="text-center text-gray-500 text-sm mt-4 flex items-center justify-center gap-1">
          <AlertCircle size={14} />
          Secure checkout powered by our payment processor
        </p>
      </Show>
    </div>
  );
};

export default ShoppingCart;