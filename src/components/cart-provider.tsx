"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { calculateTotals, type DeliveryMethodId } from "@/lib/cart";
import { deliveryOptions } from "@/lib/site-data";

type CartState = {
  quantity: number;
  deliveryMethod: DeliveryMethodId;
};

type CartContextValue = {
  state: CartState;
  totals: ReturnType<typeof calculateTotals>;
  hydrated: boolean;
  addToCart: (quantity?: number) => void;
  setQuantity: (quantity: number) => void;
  setDeliveryMethod: (deliveryMethod: DeliveryMethodId) => void;
  clearCart: () => void;
};

const defaultState: CartState = {
  quantity: 0,
  deliveryMethod: deliveryOptions[0].id,
};

const storageKey = "sheen-mode-cart";

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);

      if (stored) {
        const parsed = JSON.parse(stored) as Partial<CartState>;
        setState({
          quantity: Math.max(0, parsed.quantity ?? defaultState.quantity),
          deliveryMethod: parsed.deliveryMethod ?? defaultState.deliveryMethod,
        });
      }
    } catch {
      // Ignore broken storage state and fall back to the defaults.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [hydrated, state]);

  const totals = useMemo(
    () => calculateTotals({ quantity: state.quantity, deliveryMethod: state.deliveryMethod }),
    [state.deliveryMethod, state.quantity],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      state,
      totals,
      hydrated,
      addToCart: (quantity = 1) => {
        setState((current) => ({
          ...current,
          quantity: Math.max(0, current.quantity + quantity),
        }));
      },
      setQuantity: (quantity) => {
        setState((current) => ({
          ...current,
          quantity: Math.max(0, quantity),
        }));
      },
      setDeliveryMethod: (deliveryMethod) => {
        setState((current) => ({
          ...current,
          deliveryMethod,
        }));
      },
      clearCart: () => {
        setState(defaultState);
      },
    }),
    [hydrated, state, totals],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider.");
  }

  return context;
}