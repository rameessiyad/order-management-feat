"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { MenuItem } from "@/lib/types";

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];

  addToCart: (item: MenuItem) => void;
  removeFromCart: (menuItemId: number) => void;

  increaseQuantity: (menuItemId: number) => void;
  decreaseQuantity: (menuItemId: number) => void;

  clearCart: () => void;

  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (cartItem) => cartItem.menuItem.id === item.id
      );

      if (existing) {
        return prev.map((cartItem) =>
          cartItem.menuItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [...prev, { menuItem: item, quantity: 1 }];
    });
  };

  const removeFromCart = (menuItemId: number) => {
    setCart((prev) =>
      prev.filter((item) => item.menuItem.id !== menuItemId)
    );
  };

  const increaseQuantity = (menuItemId: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.menuItem.id === menuItemId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (menuItemId: number) => {
    setCart((prev) =>
      prev.flatMap((item) => {
        if (item.menuItem.id !== menuItemId) {
          return item;
        }

        if (item.quantity === 1) {
          return [];
        }

        return {
          ...item,
          quantity: item.quantity - 1,
        };
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = useMemo(
    () =>
      cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (total, item) =>
          total +
          Number(item.menuItem.price) * item.quantity,
        0
      ),
    [cart]
  );

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}