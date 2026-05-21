"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setIsCartOpen(false);
    router.push("/checkout");
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${isCartOpen ? styles.overlayActive : ""}`}
        onClick={() => setIsCartOpen(false)}
      />

      <div className={`${styles.drawer} ${isCartOpen ? styles.drawerActive : ""}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>Your Cart</h2>
          <button className={styles.closeBtn} onClick={() => setIsCartOpen(false)}>
            Close
          </button>
        </div>

        <div className={styles.content}>
          {cart.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>Your cart is empty...</p>
              <p>Add layers of poetry to begin your story.</p>
              <button
                className="btn btn-primary"
                style={{ marginTop: "1rem" }}
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/shop");
                }}
              >
                Go to Shop
              </button>
            </div>
          ) : (
            <ul className={styles.itemList}>
              {cart.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div style={{ position: "relative", width: "80px", height: "80px" }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      className={styles.itemImg}
                      fill
                      sizes="80px"
                    />
                  </div>
                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemName}>{item.name}</h3>
                    <p className={styles.itemVariant}>Variant: {item.variant}</p>
                    {item.customEngraving && (
                      <p className={styles.itemEngraving}>
                        Lettering: &ldquo;{item.customEngraving}&rdquo;
                      </p>
                    )}
                    <div className={styles.itemQtyRow}>
                      <div className={styles.qtySelector}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          &minus;
                        </button>
                        <span className={styles.qtyVal}>{item.quantity}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className={styles.price}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Subtotal</span>
              <span className={styles.totalVal}>${cartTotal.toFixed(2)}</span>
            </div>
            <button
              className={`btn btn-primary ${styles.checkoutBtn}`}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
            <p className={styles.checkoutNote}>
              Taxes and shipping calculated at checkout.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
