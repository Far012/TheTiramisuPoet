"use client";

import { useState } from "react";
import styles from "./HomeReviewCarousel.module.css";

const REVIEWS = [
  {
    text: "The Tiramisu Tower was the highlight of our wedding dinner. It looked architectural, tasted light, and every guest could take a perfect portion.",
    author: "Laura & Maxim",
    detail: "Wedding, July 2025",
  },
  {
    text: "The cups made the whole table feel considered. Pickup was simple, the packaging was beautiful, and the mascarpone cream was exactly right.",
    author: "Sophia K.",
    detail: "Garden dinner",
  },
  {
    text: "The custom cocoa stencil gave our client event a memorable finish without turning dessert service into a production problem.",
    author: "Elena R.",
    detail: "Event planner",
  },
];

export default function HomeReviewCarousel() {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const activeReview = REVIEWS[activeReviewIndex];

  return (
    <section className={`${styles.reviews} section-padding`} aria-labelledby="reviews-title">
      <div className="container">
        <div className={styles.header}>
          <p className="subtitle-section">Client voices</p>
          <h2 id="reviews-title" className="title-section">
            Quiet luxury, remembered clearly.
          </h2>
        </div>

        <figure className={styles.review} aria-live="polite">
          <blockquote>{activeReview.text}</blockquote>
          <figcaption>
            <span>{activeReview.author}</span>
            {activeReview.detail}
          </figcaption>
        </figure>

        <div className={styles.dots} aria-label="Choose review">
          {REVIEWS.map((review, index) => (
            <button
              key={review.author}
              type="button"
              className={`${styles.dot} ${index === activeReviewIndex ? styles.dotActive : ""}`}
              onClick={() => setActiveReviewIndex(index)}
              aria-label={`Show review from ${review.author}`}
              aria-pressed={index === activeReviewIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
