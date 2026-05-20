"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function About() {
  return (
    <div className="anim-fade-in">
      {/* Header */}
      <section className={styles.header}>
        <div className="container">
          <p className="subtitle-section">Our Story</p>
          <h1 className="title-section" style={{ fontSize: "3rem" }}>
            Our Story
          </h1>
          <p className={styles.intro}>
            How a passion for Italian patisserie and classic poetry bloomed into a unique dessert atelier.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container">
        <div className={styles.content}>
          <p className={styles.text}>
            Tiramisu is more than the sum of its ingredients. For us, it is a poem written in layers. Each sponge ladyfinger gently soaked, each sheet of rich mascarpone cream, and each delicate dusting of finest cocoa represents a line in this sweet composition.
          </p>

          <div className={styles.imageContainer}>
            <Image
              src="/images/hero_tiramisu.png"
              alt="Handcrafted tiramisu in the studio"
              fill
              sizes="(max-width: 900px) 100vw, 700px"
              style={{ objectFit: "cover" }}
            />
          </div>

          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", color: "var(--espresso)" }}>
            The Vision
          </h2>
          <p className={styles.text}>
            Founded in Munich, with the desire to elevate tiramisu from the shadows of a simple restaurant dessert, we brought <strong>The Tiramisu Poet</strong> to life. Our studio crafts tiramisu as a premium indulgence for special moments — visually flawless, elegantly presented, and incomparably delicious.
          </p>

          <blockquote className={styles.highlightText}>
            “We believe that aesthetics and taste form an inseparable unity. A dessert must capture the eye and touch the palate before lingering in the memory.”
          </blockquote>

          <h2 style={{ fontFamily: "var(--font-cormorant)", fontSize: "2rem", color: "var(--espresso)" }}>
            Our Studio Promise
          </h2>
          <p className={styles.text}>
            We do not believe in mass production. Each tiramisu is prepared fresh on the day of delivery or pickup. We source only organic mascarpone, hand-roasted espresso, and local eggs from free-range farms.
          </p>
          <p className={styles.text}>
            We invite you to join us on this sweet journey. Discover our shop collections or plan the dessert menu for your next occasion.
          </p>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link href="/shop" className="btn btn-primary" style={{ marginRight: "1rem" }}>
              To Shop
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
