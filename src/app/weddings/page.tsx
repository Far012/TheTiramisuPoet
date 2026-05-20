"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Weddings() {
  const router = useRouter();
  const [guests, setGuests] = useState(60);

  // Recommendations logic
  const calculateCups = (guestCount: number) => {
    // 1.1 cups per guest, rounded up to nearest multiple of 6 (box size)
    return Math.ceil((guestCount * 1.1) / 6) * 6;
  };

  const getTowerSize = (cups: number) => {
    if (cups <= 36) return "3-Tier Etagere";
    if (cups <= 72) return "5-Tier Etagere";
    if (cups <= 120) return "6-Tier Etagere";
    return "7-Tier Etagere (Double-Tower System)";
  };

  const calculateEstimate = (cups: number) => {
    const cupPrice = 7.0; // premium cups for event pricing
    const setupFee = 60.0; // rental of stand and placement
    const floralFee = 80.0; // real flowers matching wedding theme
    return cups * cupPrice + setupFee + floralFee;
  };

  const cupsCount = calculateCups(guests);
  const towerSize = getTowerSize(cupsCount);
  const totalEstimate = calculateEstimate(cupsCount);

  const handleInquiry = () => {
    // Navigate to contact and prefill query parameters
    router.push(`/contact?guests=${guests}&type=wedding&cups=${cupsCount}`);
  };

  return (
    <div className="anim-fade-in">
      {/* Editorial Header */}
      <section className={styles.header}>
        <div className="container">
          <p className="subtitle-section">Elegance &amp; Celebration</p>
          <h1 className="title-section" style={{ fontSize: "3rem" }}>
            The Wedding Suite
          </h1>
          <p className={styles.intro}>
            Make your dessert the poetic highlight of your wedding. Our exclusive Tiramisu Wedding Tower combines modern luxury with light, classic Italian indulgence.
          </p>
        </div>
      </section>

      {/* Main Content Info */}
      <section className={`${styles.contentSection} section-padding`}>
        <div className="container">
          <div className={styles.splitGrid}>
            <div className={styles.imgContainer}>
              <Image
                src="/images/wedding_tower.png"
                alt="Beautiful Wedding Tiramisu Tower"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            
            <div className={styles.textContent}>
              <p className="subtitle-section" style={{ textAlign: "left", marginBottom: "0" }}>
                The Masterpiece
              </p>
              <h2 className={`${styles.sectionTitle} title-section`}>
                The Tiramisu Tower
              </h2>
              <p className={styles.text}>
                Our signature wedding tower is served on hand-blown glass stands. Instead of heavy cake, your guests enjoy light, perfectly portioned tiramisu creations in elegant single cups.
              </p>
              <p className={styles.text}>
                Each tower is custom-tailored to your wedding style. The stand is decorated by our florist partner with fresh, real blossoms matched to your bridal bouquet and table decor.
              </p>
              <p className={styles.text}>
                <strong>Custom Cocoa Branding:</strong> Upon request, we dust the top cup or all cups with a custom-designed stencil — such as your initials, wedding date, or a delicate floral monogram.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section className={`${styles.calculatorSection} section-padding`}>
        <div className="container">
          <p className="subtitle-section">Configurator</p>
          <h2 className="title-section">Plan Your Wedding Tower</h2>
          <p className={styles.intro} style={{ maxWidth: "600px" }}>
            Enter your estimated guest count to receive a personalized recommendation and budget estimate for your wedding tower.
          </p>

          <div className={styles.calcCard}>
            
            {/* Slider */}
            <div className={styles.sliderGroup}>
              <div className={styles.sliderHeader}>
                <span className={styles.sliderLabel}>Number of Guests</span>
                <span className={styles.sliderVal}>{guests}</span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                step="5"
                className={styles.slider}
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
              />
            </div>

            {/* Recommendations Grid */}
            <div className={styles.resultsGrid}>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Recommended Qty</span>
                <span className={styles.resultVal}>{cupsCount} Cups</span>
              </div>
              <div className={styles.resultItem}>
                <span className={styles.resultLabel}>Tower Configuration</span>
                <span className={styles.resultVal}>{towerSize}</span>
              </div>
              <div className={styles.resultItem} style={{ gridColumn: "span 2", marginTop: "1rem" }}>
                <span className={styles.resultLabel}>Estimated Budget</span>
                <span className={styles.resultVal}>approx. {totalEstimate.toFixed(2)} &euro;</span>
              </div>
            </div>

            {/* Included Features List */}
            <ul className={styles.benefits}>
              <li className={styles.benefitItem}>
                <span className={styles.benefitIcon}>✔</span>
                <span>Includes 3-day stand rental fee</span>
              </li>
              <li className={styles.benefitItem}>
                <span className={styles.benefitIcon}>✔</span>
                <span>Includes fresh floral decoration by our florist</span>
              </li>
              <li className={styles.benefitItem}>
                <span className={styles.benefitIcon}>✔</span>
                <span>Includes custom cocoa stencil branding</span>
              </li>
              <li className={styles.benefitItem}>
                <span className={styles.benefitIcon}>✔</span>
                <span>Chilled delivery &amp; setup at venue (Munich area)</span>
              </li>
            </ul>

            <button className={`btn btn-primary ${styles.calcBtn}`} onClick={handleInquiry}>
              Inquire Configuration
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
