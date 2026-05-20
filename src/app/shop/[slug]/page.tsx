"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const { addToCart } = useCart();
  
  const product = PRODUCTS.find((p) => p.slug === resolvedParams.slug);

  // Accordion states
  const [openAccordion, setOpenAccordion] = useState<string | null>("ingredients");

  // Variant & Quantity states
  const [selectedVariant, setSelectedVariant] = useState(product ? product.variants[0] : "");
  const [quantity, setQuantity] = useState(1);
  const [engraving, setEngraving] = useState("");

  if (!product) {
    return (
      <div className={`${styles.pdp} container`} style={{ textAlign: "center", padding: "10rem 1.5rem" }}>
        <h1 className="title-section">Creation Not Found</h1>
        <p style={{ marginTop: "1rem", color: "var(--cocoa)" }}>
          This specialty does not seem to exist in our studio.
        </p>
        <Link href="/shop" className="btn btn-primary" style={{ marginTop: "2rem" }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  // Calculate price dynamically based on variant name adjustments
  const getAdjustedPrice = () => {
    let basePrice = product.price;
    if (selectedVariant.includes("+ 35.00") || selectedVariant.includes("+ 35,00")) {
      basePrice += 35.0;
    } else if (selectedVariant.includes("+ 20.00") || selectedVariant.includes("+ 20,00")) {
      basePrice += 20.0;
    }
    return basePrice;
  };

  const currentPrice = getAdjustedPrice();

  const handleAddToCart = () => {
    addToCart({
      name: product.name,
      price: currentPrice,
      image: product.image,
      slug: product.slug,
      variant: selectedVariant,
      customEngraving: engraving.trim() || undefined,
      quantity,
    });
  };

  const toggleAccordion = (id: string) => {
    if (openAccordion === id) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(id);
    }
  };

  return (
    <div className={`${styles.pdp} anim-fade-in`}>
      <div className="container">
        {/* Back Link */}
        <Link href="/shop" className={styles.backLink}>
          &larr; Back to Collections
        </Link>

        <div className={styles.grid}>
          {/* Left: Product Image */}
          <div className={styles.imageContainer}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Right: Product Ordering Info */}
          <div className={styles.info}>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.shortDesc}>{product.shortDescription}</p>
            <p className={styles.price}>{currentPrice.toFixed(2)} &euro;</p>

            {/* Variant Selector */}
            <div className={styles.optionsSection}>
              <h3 className={styles.sectionTitle}>Variant / Size</h3>
              <div className={styles.variantSelector}>
                {product.variants.map((v) => (
                  <button
                    key={v}
                    className={`${styles.variantBtn} ${
                      selectedVariant === v ? styles.variantBtnActive : ""
                    }`}
                    onClick={() => {
                      setSelectedVariant(v);
                      setQuantity(1); // reset qty when variant changes
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Cocoa Engraving Input (Customization option) */}
            {product.slug !== "mini-dessert-cups" && (
              <div className={styles.engravingGroup}>
                <label className="form-label" htmlFor="engraving-input">
                  Cocoa Stencil Lettering (Optional)
                </label>
                <input
                  id="engraving-input"
                  type="text"
                  placeholder="e.g. Amore, Happy Bday, Laura"
                  maxLength={15}
                  className="form-input"
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.25rem" }}>
                  <span className={styles.engravingDesc}>
                    Delicate lettering dusted on cocoa (+ 3.00 &euro; in official store)
                  </span>
                  <span className={styles.engravingDesc}>
                    {engraving.length} / 15 chars
                  </span>
                </div>
              </div>
            )}

            {/* Quantity Selector & Buy Button */}
            <div className={styles.qtyBuyRow}>
              <div className={styles.qtySelector}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  &minus;
                </button>
                <span className={styles.qtyVal}>{quantity}</span>
                <button
                  className={styles.qtyBtn}
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button className={`btn btn-primary ${styles.buyBtn}`} onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>

            {/* Accordions */}
            <div className={styles.accordions}>
              {/* Accordion 1: Ingredients */}
              <div className={styles.accordion}>
                <div className={styles.accordionHeader} onClick={() => toggleAccordion("ingredients")}>
                  <span className={styles.accordionTitle}>Ingredients &amp; Allergens</span>
                  <span className={`${styles.accordionIcon} ${openAccordion === "ingredients" ? styles.accordionIconActive : ""}`}>+</span>
                </div>
                {openAccordion === "ingredients" && (
                  <div className={styles.accordionContent}>
                    {product.slug === "signature-tiramisu-cups" || product.slug === "classic-tiramisu-tray" ? (
                      <p>
                        Organic mascarpone, fresh cream, organic whole milk, ladyfinger biscuits (wheat flour, eggs, sugar), Italian espresso (100% Arabica), sugar, cocoa powder for dusting, traces of alcohol (Marsala wine in the classic version, alcohol-free on request).
                        <br /><br />
                        <strong>Allergens:</strong> Gluten (wheat), dairy (lactose), eggs. May contain traces of tree nuts.
                      </p>
                    ) : product.slug === "bespoke-poets-gift-box" ? (
                      <p>
                        Ingredients same as Signature Cups. Box includes 4 cups, fine gold-plated dessert spoons, and a personalized luxury poem card.
                      </p>
                    ) : (
                      <p>
                        Organic mascarpone, whole wheat biscuits, custom roasted espresso, cocoa powder, sugar. For egg-free and alcohol-free options, eggs and alcohol are completely omitted.
                        <br /><br />
                        <strong>Allergens:</strong> Gluten, lactose.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Accordion 2: Shelf Life */}
              <div className={styles.accordion}>
                <div className={styles.accordionHeader} onClick={() => toggleAccordion("shelflife")}>
                  <span className={styles.accordionTitle}>Shelf Life &amp; Storage</span>
                  <span className={`${styles.accordionIcon} ${openAccordion === "shelflife" ? styles.accordionIconActive : ""}`}>+</span>
                </div>
                {openAccordion === "shelflife" && (
                  <div className={styles.accordionContent}>
                    Our tiramisus are prepared fresh on the day of delivery or pickup. Always store the products chilled at 4 °C to 6 °C.
                    <br /><br />
                    For the best taste, we recommend consuming within <strong>3 days</strong> of receipt.
                  </div>
                )}
              </div>

              {/* Accordion 3: Delivery */}
              <div className={styles.accordion}>
                <div className={styles.accordionHeader} onClick={() => toggleAccordion("deliveryinfo")}>
                  <span className={styles.accordionTitle}>Delivery &amp; Pickup Conditions</span>
                  <span className={`${styles.accordionIcon} ${openAccordion === "deliveryinfo" ? styles.accordionIconActive : ""}`}>+</span>
                </div>
                {openAccordion === "deliveryinfo" && (
                  <div className={styles.accordionContent}>
                    As these are ultra-fresh dessert specialties, order lead time is at least <strong>48 hours</strong>.
                    <br /><br />
                    <strong>Studio Pickup:</strong> Free at our atelier (Tuesday to Saturday from 10:00 AM to 6:00 PM).
                    <br /><br />
                    <strong>Chilled Delivery:</strong> Delivery in the Munich area (ZIP 80xxx &amp; 81xxx) via chilled courier at your preferred time window. Delivery fee calculated in your cart.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
