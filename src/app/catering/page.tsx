"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Catering() {
  return (
    <div className="anim-fade-in">
      {/* Header */}
      <section className={styles.header}>
        <div className="container">
          <p className="subtitle-section">Corporate &amp; Private Events</p>
          <h1 className="title-section" style={{ fontSize: "3rem" }}>
            Catering &amp; Events
          </h1>
          <p className={styles.intro}>
            Add an exclusive, culinary signature to your next event. Whether a PR gathering, gala dinner, summer event, or private party — we write the sweet climax.
          </p>
        </div>
      </section>

      {/* Corporate & Private Grid */}
      <section className="section-padding container">
        {/* Row 1: Corporate */}
        <div className={styles.splitGrid}>
          <div className={styles.imgContainer}>
            <Image
              src="/images/tiramisu_box.png"
              alt="Corporate Tiramisu Gifts"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.textContent}>
            <p className="subtitle-section" style={{ textAlign: "left", marginBottom: "0" }}>
              B2B Services
            </p>
            <h2 className={styles.sectionTitle}>Corporate Events &amp; PR</h2>
            <p className={styles.text}>
              Leave a lasting impression on your clients, partners, and employees. We visually adapt our tiramisu to match your corporate identity.
            </p>
            <p className={styles.text}>
              <strong>Logo Stencils:</strong> Using precision stainless steel stencils, we dust your logo or campaign slogan directly onto the tiramisu using premium cocoa.
            </p>
            <p className={styles.text}>
              <strong>Custom Packaging:</strong> For orders of 50 or more units, we design branded boxes, sleeves, or personalized poet poem cards with your brand message.
            </p>
            <Link href="/contact?type=corporate" className="btn btn-primary" style={{ marginTop: "1rem" }}>
              Request B2B Quote
            </Link>
          </div>
        </div>

        {/* Row 2: Private Events */}
        <div className={styles.splitGrid} style={{ direction: "rtl" }}>
          {/* Use style override to reverse order on desktop, keeping normal markup flow */}
          <div className={styles.imgContainer} style={{ direction: "ltr" }}>
            <Image
              src="/images/hero_tiramisu.png"
              alt="Private Event Dessert Catering"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.textContent} style={{ direction: "ltr", textAlign: "left" }}>
            <p className="subtitle-section" style={{ textAlign: "left", marginBottom: "0" }}>
              B2C Services
            </p>
            <h2 className={styles.sectionTitle}>Private Parties &amp; Dinners</h2>
            <p className={styles.text}>
              From milestone birthdays to baby showers and exclusive garden parties — we offer flexible dessert catering solutions for groups of 15 or more.
            </p>
            <p className={styles.text}>
              Choose from an exquisite selection of mini cups, classic trays, or a beautifully arranged dessert pyramid. All products are delivered chilled in elegant, ready-to-serve presentation trays.
            </p>
            <p className={styles.text}>
              Upon request, we also provide egg-free, gluten-free, and alcohol-free options so every guest can enjoy without worry.
            </p>
            <Link href="/contact?type=catering" className="btn btn-outline" style={{ marginTop: "1rem" }}>
              Inquire Event Catering
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={`${styles.ctaSection} section-padding`}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className="title-section" style={{ marginBottom: "0.5rem" }}>Let's plan together.</h2>
            <p className={styles.text} style={{ textAlign: "center" }}>
              No matter the scale of your event, we design the perfect dessert concept. Contact our studio for a custom, non-binding quote.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Get in Touch Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
