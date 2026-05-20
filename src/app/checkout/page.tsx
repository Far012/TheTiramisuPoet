"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";

type Step = 1 | 2;
type ZipStatus = "idle" | "success" | "error";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, deliveryInfo, setDeliveryInfo, clearCart } = useCart();

  const [step, setStep] = useState<Step>(1);
  const [zipCode, setZipCode] = useState(deliveryInfo.zipCode || "");
  const [zipCheck, setZipCheck] = useState<{ status: ZipStatus; message: string }>({
    status: "idle",
    message: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (cart.length === 0 && !orderPlaced) {
      router.replace("/shop");
    }
  }, [cart.length, orderPlaced, router]);

  const getMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
  };

  const formatDate = (iso: string) =>
    new Date(iso + "T12:00:00").toLocaleDateString("en-CA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const handleZipCheck = () => {
    if (!zipCode) {
      setZipCheck({ status: "error", message: "Please enter a postal code." });
      return;
    }
    const clean = zipCode.trim().toUpperCase().replace(/\s+/g, "");
    if (!/^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(clean)) {
      setZipCheck({ status: "error", message: "Invalid format (e.g. L3Z 0W4)." });
      return;
    }
    if (clean.startsWith("L3Z")) {
      setZipCheck({ status: "success", message: "Verified — Chilled delivery available in Bradford." });
      setDeliveryInfo({ ...deliveryInfo, zipCode: clean });
    } else if (clean.startsWith("L") || clean.startsWith("M")) {
      setZipCheck({ status: "success", message: "Verified — Delivery available in GTA / Simcoe County." });
      setDeliveryInfo({ ...deliveryInfo, zipCode: clean });
    } else {
      setZipCheck({ status: "error", message: "Outside delivery area. Studio pickup only (73 Algeo Wy)." });
    }
  };

  const handleDeliveryType = (type: "pickup" | "delivery") => {
    setDeliveryInfo({ ...deliveryInfo, type });
    if (type === "pickup") setZipCheck({ status: "idle", message: "" });
  };

  const handleContinue = () => {
    if (!deliveryInfo.date) {
      alert("Please select a date (minimum 48h lead time).");
      return;
    }
    if (!deliveryInfo.time) {
      alert("Please select a time window.");
      return;
    }
    if (deliveryInfo.type === "delivery" && zipCheck.status !== "success") {
      alert("Please verify your postal code for delivery.");
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0 });
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  const handleBackToShop = () => {
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className={styles.page}>
        <div className={styles.successWrap}>
          <h1 className={styles.successTitle}>Order Confirmed</h1>
          <p className={styles.successSub}>
            Thank you — your tiramisu is being prepared with care.
          </p>
          <div className={styles.summaryCard}>
            <p>
              <strong>Collection:</strong>{" "}
              {deliveryInfo.type === "pickup"
                ? "Studio Pickup — 73 Algeo Wy, Bradford"
                : `Chilled Delivery — ${deliveryInfo.zipCode}`}
            </p>
            <p><strong>Date:</strong> {formatDate(deliveryInfo.date)}</p>
            <p><strong>Time:</strong> {deliveryInfo.time}</p>
            <p className={styles.summaryTotal}>
              <strong>Total:</strong> ${cartTotal.toFixed(2)}
            </p>
          </div>
          <p className={styles.simNote}>
            This is a simulated checkout. In production, Shopify handles payment.
          </p>
          <Link href="/shop" className="btn btn-primary" onClick={handleBackToShop}>
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          {step === 2 ? (
            <button className={styles.backBtn} onClick={() => setStep(1)}>
              ← Back
            </button>
          ) : (
            <Link href="/shop" className={styles.backBtn}>← Shop</Link>
          )}
          <h1 className={styles.pageTitle}>Checkout</h1>
          <span className={styles.stepLabel}>Step {step} of 2</span>
        </div>

        {step === 1 && (
          <section>
            <h2 className={styles.sectionTitle}>Collection &amp; Timing</h2>

            <div className={styles.toggleGroup}>
              <button
                className={`${styles.toggleBtn} ${deliveryInfo.type === "pickup" ? styles.toggleBtnActive : ""}`}
                onClick={() => handleDeliveryType("pickup")}
              >
                Studio Pickup
              </button>
              <button
                className={`${styles.toggleBtn} ${deliveryInfo.type === "delivery" ? styles.toggleBtnActive : ""}`}
                onClick={() => handleDeliveryType("delivery")}
              >
                Chilled Delivery
              </button>
            </div>

            {deliveryInfo.type === "delivery" && (
              <div className="form-group">
                <label className="form-label" htmlFor="zip-input">Verify Postal Code</label>
                <div className={styles.zipRow}>
                  <input
                    id="zip-input"
                    type="text"
                    className="form-input"
                    placeholder="e.g. L3Z 0W4"
                    maxLength={7}
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                  <button className={styles.zipBtn} onClick={handleZipCheck}>Verify</button>
                </div>
                {zipCheck.status !== "idle" && (
                  <p className={`${styles.zipFeedback} ${zipCheck.status === "success" ? styles.zipSuccess : styles.zipError}`}>
                    {zipCheck.message}
                  </p>
                )}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="date-input">Select Date (min. 48h)</label>
              <input
                id="date-input"
                type="date"
                className={`form-input ${styles.dateInput}`}
                min={getMinDate()}
                value={deliveryInfo.date}
                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, date: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="time-input">Time Window</label>
              <select
                id="time-input"
                className="form-select"
                value={deliveryInfo.time}
                onChange={(e) => setDeliveryInfo({ ...deliveryInfo, time: e.target.value })}
              >
                <option value="">Select...</option>
                <option value="10:00 - 12:00">10:00 – 12:00</option>
                <option value="12:00 - 14:00">12:00 – 14:00</option>
                <option value="14:00 - 16:00">14:00 – 16:00</option>
                <option value="16:00 - 18:00">16:00 – 18:00</option>
              </select>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: "100%" }}
              onClick={handleContinue}
            >
              Review Order →
            </button>
          </section>
        )}

        {step === 2 && (
          <section>
            <h2 className={styles.sectionTitle}>Your Order</h2>

            <ul className={styles.itemList}>
              {cart.map((item) => (
                <li key={item.id} className={styles.item}>
                  <div style={{ position: "relative", width: "60px", height: "60px", flexShrink: 0 }}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="60px"
                      style={{ objectFit: "cover", borderRadius: "4px" }}
                    />
                  </div>
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemVariant}>{item.variant} × {item.quantity}</p>
                  </div>
                  <span className={styles.itemPrice}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className={styles.collectionDetails}>
              <p className={styles.detailsTitle}>Collection Details</p>
              <p>
                {deliveryInfo.type === "pickup"
                  ? "Studio Pickup — 73 Algeo Wy, Bradford"
                  : `Chilled Delivery — ${deliveryInfo.zipCode}`}
              </p>
              <p>{formatDate(deliveryInfo.date)}</p>
              <p>{deliveryInfo.time}</p>
            </div>

            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: "100%", marginBottom: "0.75rem" }}
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
            <p className={styles.simNote}>
              Taxes and shipping calculated at checkout. This is a simulated checkout — no payment is processed.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
