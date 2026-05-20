"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { PRODUCTS, Product } from "@/data/products";
import styles from "./page.module.css";

type CategoryFilter = "all" | "signature" | "cups" | "gifts";

interface DietaryFilters {
  alcoholFree: boolean;
  glutenFree: boolean;
  eggFree: boolean;
}

export default function Shop() {
  const { addToCart } = useCart();
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [dietary, setDietary] = useState<DietaryFilters>({
    alcoholFree: false,
    glutenFree: false,
    eggFree: false,
  });

  const handleCategoryChange = (cat: CategoryFilter) => {
    setCategory(cat);
  };

  const handleDietaryChange = (key: keyof DietaryFilters) => {
    setDietary({
      ...dietary,
      [key]: !dietary[key],
    });
  };

  // Filter logic
  const filteredProducts = PRODUCTS.filter((product) => {
    // 1. Category check
    if (category !== "all" && product.category !== category) {
      return false;
    }
    
    // 2. Dietary checks
    if (dietary.alcoholFree && !product.dietary.includes("alcohol-free")) {
      return false;
    }
    if (dietary.glutenFree && !product.dietary.includes("gluten-free")) {
      return false;
    }
    if (dietary.eggFree && !product.dietary.includes("egg-free")) {
      return false;
    }

    return true;
  });

  const handleAddToCart = (product: Product) => {
    addToCart({
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
      variant: product.variants[0], // default to first variant
    });
  };

  const getDietaryTranslation = (tag: string) => {
    switch (tag) {
      case "alcohol-free":
        return "Alcohol-Free";
      case "gluten-free":
        return "Gluten-Free";
      case "egg-free":
        return "Egg-Free";
      default:
        return tag;
    }
  };

  return (
    <div className="anim-fade-in">
      {/* Editorial Header */}
      <section className={styles.shopHeader}>
        <div className="container">
          <p className="subtitle-section">The Pâtisserie Shop</p>
          <h1 className="title-section" style={{ fontSize: "3rem" }}>Our Collections</h1>
          <p className={styles.introText}>
            Handcrafted masterworks for your enjoyment. Prepared fresh daily from organic ingredients, available for chilled delivery or studio pickup.
          </p>
        </div>
      </section>

      {/* Shop Body */}
      <section className={styles.shopBody}>
        <div className="container">
          
          {/* Filter Bar */}
          <div className={styles.filterBar}>
            
            {/* Category Tabs */}
            <div className={styles.categoryTabs}>
              <button
                className={`${styles.tab} ${category === "all" ? styles.tabActive : ""}`}
                onClick={() => handleCategoryChange("all")}
              >
                All Creations
              </button>
              <button
                className={`${styles.tab} ${category === "signature" ? styles.tabActive : ""}`}
                onClick={() => handleCategoryChange("signature")}
              >
                Dessert Trays
              </button>
              <button
                className={`${styles.tab} ${category === "cups" ? styles.tabActive : ""}`}
                onClick={() => handleCategoryChange("cups")}
              >
                Cups &amp; Mini Cups
              </button>
              <button
                className={`${styles.tab} ${category === "gifts" ? styles.tabActive : ""}`}
                onClick={() => handleCategoryChange("gifts")}
              >
                Gift Boxes
              </button>
            </div>

            {/* Allergen Filters */}
            <div className={styles.dietaryFilters}>
              <span className={styles.dietaryLabel}>Dietary Needs:</span>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={dietary.alcoholFree}
                    onChange={() => handleDietaryChange("alcoholFree")}
                  />
                  Alcohol-Free
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={dietary.glutenFree}
                    onChange={() => handleDietaryChange("glutenFree")}
                  />
                  Gluten-Free
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={dietary.eggFree}
                    onChange={() => handleDietaryChange("eggFree")}
                  />
                  Egg-Free
                </label>
              </div>
            </div>

          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem 0", color: "var(--cocoa)" }}>
              <p className="text-editorial" style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                No creations found
              </p>
              <p>Adjust your filters to reveal more layers of poetry.</p>
            </div>
          ) : (
            <div className={styles.productGrid}>
              {filteredProducts.map((product) => (
                <div key={product.slug} className={styles.productCard}>
                  <div className={styles.productImgContainer}>
                    
                    {/* Dietary Badges overlay on image */}
                    {product.dietary.length > 0 && (
                      <div className={styles.dietaryBadges}>
                        {product.dietary.map((tag) => (
                          <span key={tag} className={styles.dietaryBadge}>
                            {getDietaryTranslation(tag)}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="img-zoom-container" style={{ width: "100%", height: "100%" }}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.productInfo}>
                    <h2 className={styles.productTitle}>{product.name}</h2>
                    <p className={styles.productShortDesc}>{product.shortDescription}</p>
                    <p className={styles.productPrice}>{product.price.toFixed(2)} &euro;</p>
                    
                    <div className={styles.cardFooter}>
                      <Link
                        href={`/shop/${product.slug}`}
                        className="btn btn-outline styles.cardBtn"
                        style={{ textAlign: "center" }}
                      >
                        Details
                      </Link>
                      <button
                        className="btn btn-primary styles.cardBtn"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
