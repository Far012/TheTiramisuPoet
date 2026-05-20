"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  slug: string;
  variant: string;
  customEngraving?: string;
  image: string;
}

export interface DeliveryInfo {
  type: "pickup" | "delivery";
  date: string;
  time: string;
  zipCode: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity" | "id"> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  deliveryInfo: DeliveryInfo;
  setDeliveryInfo: (info: DeliveryInfo) => void;
  toast: string | null;
  showToastMessage: (message: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    type: "pickup",
    date: "",
    time: "",
    zipCode: "",
  });

  // LocalStorage sync
  useEffect(() => {
    const savedCart = localStorage.getItem("tiramisu_poet_cart");
    const savedInfo = localStorage.getItem("tiramisu_poet_delivery");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    }
    if (savedInfo) {
      try {
        setDeliveryInfo(JSON.parse(savedInfo));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("tiramisu_poet_cart", JSON.stringify(newCart));
  };

  const saveDeliveryToStorage = (newInfo: DeliveryInfo) => {
    setDeliveryInfo(newInfo);
    localStorage.setItem("tiramisu_poet_delivery", JSON.stringify(newInfo));
  };

  const showToastMessage = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const addToCart = (item: Omit<CartItem, "quantity" | "id"> & { quantity?: number }) => {
    const quantity = item.quantity || 1;
    // Create unique ID based on slug, variant and engraving to differentiate identical products with different configurations
    const id = `${item.slug}-${item.variant.toLowerCase().replace(/\s+/g, "-")}-${
      item.customEngraving ? item.customEngraving.toLowerCase().trim() : "none"
    }`;

    const existingItemIndex = cart.findIndex((i) => i.id === id);

    if (existingItemIndex > -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += quantity;
      saveCartToStorage(newCart);
    } else {
      saveCartToStorage([...cart, { ...item, id, quantity }]);
    }
    
    showToastMessage(`${item.name} added to cart`);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    const item = cart.find(i => i.id === id);
    const newCart = cart.filter((i) => i.id !== id);
    saveCartToStorage(newCart);
    if (item) {
      showToastMessage(`${item.name} removed`);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    saveCartToStorage(newCart);
  };

  const clearCart = () => {
    saveCartToStorage([]);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        deliveryInfo,
        setDeliveryInfo: saveDeliveryToStorage,
        toast,
        showToastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
