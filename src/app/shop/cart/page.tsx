import ShoppingCart from "@/components/cart/shopping-cart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart | CakeVille Bakery",
  description: "View your shopping cart and proceed to checkout.",
};

const CartPage = () => {

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Your Cart</h1>
      <ShoppingCart />
    </div>
  );
};

export default CartPage;