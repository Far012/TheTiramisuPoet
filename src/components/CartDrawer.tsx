"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
    deliveryInfo,
    setDeliveryInfo,
    clearCart,
  } = useCart();

  const [zipCode, setZipCode] = useState(deliveryInfo.zipCode);
  const [zipCheck, setZipCheck] = useState<{ status: "idle" | "success" | "error"; message: string }>({
    status: "idle",
    message: "",
  });
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setZipCode(deliveryInfo.zipCode);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [deliveryInfo.zipCode]);

  // Disable background scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  // Get date 48h (2 days) from now
  const getMinDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date.toISOString().split("T")[0];
  };

  const handleZipCheck = () => {
    if (!zipCode) {
      setZipCheck({ status: "error", message: "Please enter a postal code." });
      return;
    }
    const cleanCode = zipCode.trim().toUpperCase().replace(/\s+/g, "");
    if (!/^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(cleanCode)) {
      setZipCheck({ status: "error", message: "Invalid postal code format (e.g. L3Z 0W4)." });
      return;
    }

    if (cleanCode.startsWith("L3Z")) {
      setZipCheck({
        status: "success",
        message: "Delivery area verified! Chilled delivery is available in Bradford.",
      });
      setDeliveryInfo({ ...deliveryInfo, zipCode: cleanCode });
    } else if (cleanCode.startsWith("L") || cleanCode.startsWith("M")) {
      setZipCheck({
        status: "success",
        message: "Extended delivery area! Delivery is available in GTA / Simcoe County.",
      });
      setDeliveryInfo({ ...deliveryInfo, zipCode: cleanCode });
    } else {
      setZipCheck({
        status: "error",
        message: "Outside delivery area. Only studio pickup is available at 73 Algeo Wy.",
      });
    }
  };

  const handleDeliveryTypeChange = (type: "pickup" | "delivery") => {
    setDeliveryInfo({ ...deliveryInfo, type });
    if (type === "pickup") {
      setZipCheck({ status: "idle", message: "" });
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDeliveryInfo({ ...deliveryInfo, date: selectedDate });
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeliveryInfo({ ...deliveryInfo, time: e.target.value });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Validate delivery date and time
    if (!deliveryInfo.date) {
      alert("Please select a delivery or pickup date (minimum 48h lead time).");
      return;
    }
    if (!deliveryInfo.time) {
      alert("Please select a time window.");
      return;
    }
    if (deliveryInfo.type === "delivery" && (!deliveryInfo.zipCode || zipCheck.status === "error")) {
      alert("Please verify your zip code for a valid delivery.");
      return;
    }

    setShowCheckoutSuccess(true);
  };

  const finishSimulatedCheckout = () => {
    setShowCheckoutSuccess(false);
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        className={`${styles.overlay} ${isCartOpen ? styles.overlayActive : ""}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out Drawer */}
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
                onClick={() => setIsCartOpen(false)}
              >
                Go to Shop
              </button>
            </div>
          ) : (
            <>
              {/* Cart Item List */}
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

              {/* Delivery and Pickup Options */}
              <div className={styles.deliveryForm}>
                <h3 className={styles.sectionTitle}>Collection &amp; Timing</h3>
                
                <div className={styles.toggleGroup}>
                  <button
                    className={`${styles.toggleBtn} ${
                      deliveryInfo.type === "pickup" ? styles.toggleBtnActive : ""
                    }`}
                    onClick={() => handleDeliveryTypeChange("pickup")}
                  >
                    Studio Pickup
                  </button>
                  <button
                    className={`${styles.toggleBtn} ${
                      deliveryInfo.type === "delivery" ? styles.toggleBtnActive : ""
                    }`}
                    onClick={() => handleDeliveryTypeChange("delivery")}
                  >
                    Chilled Delivery
                  </button>
                </div>

                {deliveryInfo.type === "delivery" && (
                  <div className="form-group">
                    <label className="form-label" htmlFor="zipcode-input">Verify Zip Code</label>
                    <div className={styles.zipRow}>
                      <input
                        id="zipcode-input"
                        type="text"
                        placeholder="e.g. L3Z 0W4"
                        maxLength={7}
                        className="form-input"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                      <button className={styles.zipBtn} onClick={handleZipCheck}>
                        Verify
                      </button>
                    </div>
                    {zipCheck.status !== "idle" && (
                      <p
                        className={`${styles.zipFeedback} ${
                          zipCheck.status === "success"
                            ? styles.zipSuccess
                            : styles.zipError
                        }`}
                      >
                        {zipCheck.message}
                      </p>
                    )}
                  </div>
                )}

                <div className={styles.formRow}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="date-input">Select Date (min. 48h)</label>
                    <input
                      id="date-input"
                      type="date"
                      className="form-input"
                      min={getMinDate()}
                      value={deliveryInfo.date}
                      onChange={handleDateChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="time-select">Time Window</label>
                    <select
                      id="time-select"
                      className="form-select"
                      value={deliveryInfo.time}
                      onChange={handleTimeChange}
                    >
                      <option value="">Select...</option>
                      <option value="10:00 - 12:00">10:00 - 12:00</option>
                      <option value="12:00 - 14:00">12:00 - 14:00</option>
                      <option value="14:00 - 16:00">14:00 - 16:00</option>
                      <option value="16:00 - 18:00">16:00 - 18:00</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Subtotal</span>
              <span className={styles.totalVal}>${cartTotal.toFixed(2)}</span>
            </div>
            
            <button className={`btn btn-primary ${styles.checkoutBtn}`} onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <p className={styles.checkoutNote}>
              Taxes and shipping calculated at checkout.
              Freshness guarantee: Prepared fresh on your delivery day.
            </p>
          </div>
        )}
      </div>

      {/* Checkout Success Simulation Modal */}
      {showCheckoutSuccess && (
        <div className={styles.modalOverlay} onClick={finishSimulatedCheckout}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>Thank you for your order!</h3>
            <p className={styles.modalText}>
              This is a **simulated checkout** for the frontend prototype.
            </p>
            <div
              style={{
                textAlign: "left",
                backgroundColor: "var(--mascarpone)",
                padding: "1rem",
                borderRadius: "4px",
                border: "1px solid var(--blush)",
                marginBottom: "1.5rem",
                fontSize: "0.8125rem",
              }}
            >
              <p><strong>Type:</strong> {deliveryInfo.type === "pickup" ? "Studio Pickup" : `Delivery to Postal Code ${deliveryInfo.zipCode}`}</p>
              <p><strong>Date:</strong> {new Date(deliveryInfo.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
              <p><strong>Time:</strong> {deliveryInfo.time}</p>
              <p style={{ borderTop: "1px solid var(--blush)", marginTop: "0.5rem", paddingTop: "0.5rem" }}>
                <strong>Total:</strong> ${cartTotal.toFixed(2)}
              </p>
            </div>
            <p className={styles.modalText} style={{ fontSize: "0.8125rem" }}>
              In the production Shopify store, you would be redirected to the Shopify Express Checkout (Apple Pay, PayPal, credit card) at this point.
            </p>
            <button className="btn btn-primary" onClick={finishSimulatedCheckout}>
              Back to Shop
            </button>
          </div>
        </div>
      )}
    </>
  );
}
