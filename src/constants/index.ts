// ====================================================================================================================
// time
export const FIVE_SECONDS = 5 * 1000;
export const TEN_SECONDS = 15 * 1000;
// ====================================================================================================================

// ====================================================================================================================
// local storage
export const LS_TOKEN = "__cakestore_tkn";
// ====================================================================================================================

// ====================================================================================================================
// routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  ABOUT: "/about",
  SHOP: "/shop",
  CART: "/shop/cart",
  ORDER: "/orders",
  RESERVATION: "/reservations",
  PROFILE: "/profile",
};
// ====================================================================================================================
// tanstack query keys
export const QK_CUSTOMER = "customers";
export const QK_MENUS = "menus";
export const QK_CARTS = "carts";
export const QK_ORDERS = "orders";
export const QK_WISHLIST = "wishlist";
export const QK_INVENTORIES = "inventories";
export const QK_RESERVATIONS = "reservations";
export const QK_TABLES = "tables";
export const QK_PAYMENTS = "payments";
// ====================================================================================================================
// others
export type EMPLOYEE_ROLES = "admin" | "kitchen_staff" | "waitress" | "cashier";
export const roles = [
  { value: "admin", label: "Admin", color: "bg-pink-100 text-pink-800" },
  {
    value: "kitchen_staff",
    label: "Kitchen Staff",
    color: "bg-orange-100 text-orange-800",
  },
  { value: "waitress", label: "Waitress", color: "bg-blue-100 text-blue-800" },
  { value: "cashier", label: "Cashier", color: "bg-green-100 text-green-800" },
];
// ====================================================================================================================
