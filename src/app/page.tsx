"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";

const REVIEWS = [
  {
    text: "“The Tiramisu Tower was the absolute highlight at our wedding. Not only stunningly beautiful to look at, but also incredibly delicious, creamy, and perfectly portioned.”",
    author: "Laura & Maxim, Wedding July 2025",
  },
  {
    text: "“For my birthday garden party, the Mini Tiramisu Cups were perfect. An absolute eye-catcher and tasted exactly like in Italy. Pickup at the studio was smooth and simple.”",
    author: "Sophia K., Dinner Party",
  },
  {
    text: "“The dessert trays with our custom logo stencil made a huge impression at our corporate event. Aesthetics and quality at the highest level.”",
    author: "Elena R., Event Planner",
  },
];

const FEATURED_PRODUCTS = [
  {
    name: "Signature Tiramisu Cups (Box of 6)",
    price: 45.0,
    image: "/images/tiramisu_box.png",
    slug: "signature-tiramisu-cups",
    variant: "Box of 6 Classic",
  },
  {
    name: "Classic Tiramisu Tray (Party Size)",
    price: 39.0,
    image: "/images/hero_tiramisu.png",
    slug: "classic-tiramisu-tray",
    variant: "Medium (6-8 guests)",
  },
  {
    name: "The Tiramisu Wedding Tower",
    price: 280.0,
    image: "/images/wedding_tower.png",
    slug: "wedding-tower",
    variant: "Tower with 36 Cups",
  },
];

export default function Home() {
  const { addToCart } = useCart();
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const handleAddToCart = (product: typeof FEATURED_PRODUCTS[0]) => {
    addToCart({
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
      variant: product.variant,
    });
  };

  return (
    <div className="anim-fade-in">
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay} />
        <Image
          src="/images/hero_tiramisu.png"
          alt="Premium Handcrafted Tiramisu"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
          className="anim-fade-in"
        />
        <div className={styles.heroContent}>
          <span className={styles.heroPre}>Bespoke Dessert Studio</span>
          <h1 className={`${styles.heroTitle} title-hero`}>
            Where Tiramisu becomes poetry.
          </h1>
          <p className={styles.heroSub}>
            Handcrafted tiramisu creations, elegant dessert towers, and patisserie experiences for weddings, events, and special moments.
          </p>
          <div className={styles.heroBtns}>
            <Link href="/shop" className="btn btn-primary">
              Order Now
            </Link>
            <Link href="/contact" className="btn btn-outline" style={{ color: "var(--mascarpone)", borderColor: "var(--mascarpone)" }}>
              Inquire Event
            </Link>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className={`${styles.manifesto} section-padding container`}>
        <div className={styles.manifestoText}>
          “A good dessert tells a story. Inspired by Italian tradition, layered with patience, and refined with modern elegance, we create moments you can taste and cherish forever.”
        </div>
        <div className={styles.manifestoAuthor}>— The Tiramisu Poet</div>
      </section>

      {/* Featured Products */}
      <section className={`${styles.products} section-padding`}>
        <div className="container">
          <p className="subtitle-section">Collections</p>
          <h2 className="title-section">Our Signature Creations</h2>
          
          <div className={`${styles.productGrid} grid-3`}>
            {FEATURED_PRODUCTS.map((product) => (
              <div key={product.slug} className={styles.productCard}>
                <div className={styles.productImgContainer}>
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
                  <h3 className={styles.productTitle}>{product.name}</h3>
                  <p className={styles.productPrice}>{product.price.toFixed(2)} &euro;</p>
                  
                  {product.slug === "wedding-tower" ? (
                    <Link
                      href="/weddings"
                      className="btn btn-outline styles.productBtn"
                      style={{ marginTop: "auto", textAlign: "center" }}
                    >
                      More Details
                    </Link>
                  ) : (
                    <button
                      className="btn btn-primary styles.productBtn"
                      onClick={() => handleAddToCart(product)}
                      style={{ marginTop: "auto" }}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Link href="/shop" className="btn btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Weddings Split Section */}
      <section className={`${styles.weddingSplit} section-padding`}>
        <div className="container">
          <div className={styles.splitGrid}>
            <div className={styles.splitImgContainer}>
              <div className="img-zoom-container" style={{ width: "100%", height: "100%" }}>
                <Image
                  src="/images/wedding_tower.png"
                  alt="Wedding Tiramisu Tower Setup"
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className={styles.splitContent}>
              <p className="subtitle-section" style={{ textAlign: "left", marginBottom: "0" }}>For the Perfect Day</p>
              <h2 className={`${styles.splitTitle} title-section`}>The Wedding Experience</h2>
              <p className={styles.splitText}>
                Add a poetic note to your wedding day. Our spectacular Tiramisu Tower combines contemporary aesthetics with uncomplicated, creamy dessert indulgence.
              </p>
              <p className={styles.splitText}>
                We design custom dessert tables, decorate our creations with hand-crafted stencils (e.g., your initials), and match the floral decor perfectly to your wedding color scheme.
              </p>
              <div style={{ marginTop: "1rem" }}>
                <Link href="/weddings" className="btn btn-primary" style={{ marginRight: "1rem" }}>
                  Explore Wedding Suite
                </Link>
                <Link href="/contact" className="btn btn-outline">
                  Inquire Date
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className={`${styles.philosophy} section-padding`}>
        <div className="container">
          <p className="subtitle-section">The Promise</p>
          <h2 className="title-section">Our Philosophy</h2>

          <div className={`${styles.philosophyGrid} grid-3`}>
            <div className={styles.philosophyCard}>
              <span className={styles.philosophyIcon}>✍️</span>
              <h3 className={styles.philosophyTitle}>Handcrafted with Love</h3>
              <p className={styles.philosophyText}>
                Every tiramisu is prepared fresh in small batches in our studio. We layer each sponge biscuit and whip every mascarpone cream by hand.
              </p>
            </div>
            
            <div className={styles.philosophyCard}>
              <span className={styles.philosophyIcon}>☕</span>
              <h3 className={styles.philosophyTitle}>Premium Ingredients</h3>
              <p className={styles.philosophyText}>
                Local organic dairy products, fresh eggs, and rich, aromatic espresso from hand-selected beans form the core of our recipe.
              </p>
            </div>

            <div className={styles.philosophyCard}>
              <span className={styles.philosophyIcon}>✨</span>
              <h3 className={styles.philosophyTitle}>Bespoke Artistry</h3>
              <p className={styles.philosophyText}>
                Whether custom cocoa lettering, personalized poetry cards, or fresh edible floral decorations — we tailor every dessert to your wishes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className={`${styles.gallery} section-padding`}>
        <div className="container">
          <p className="subtitle-section">Instagram</p>
          <h2 className="title-section">Curated Moments</h2>
          
          <div className={styles.galleryGrid}>
            <div className={styles.galleryItem}>
              <div className="img-zoom-container" style={{ width: "100%", height: "100%" }}>
                <Image src="/images/hero_tiramisu.png" alt="Tiramisu Cup Close-up" fill sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            </div>
            <div className={styles.galleryItem}>
              <div className="img-zoom-container" style={{ width: "100%", height: "100%" }}>
                <Image src="/images/tiramisu_box.png" alt="Gift Box Setup" fill sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            </div>
            <div className={styles.galleryItem}>
              <div className="img-zoom-container" style={{ width: "100%", height: "100%" }}>
                <Image src="/images/wedding_tower.png" alt="Tiramisu Tower Details" fill sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            </div>
            <div className={styles.galleryItem}>
              <div className="img-zoom-container" style={{ width: "100%", height: "100%" }}>
                <Image src="/images/hero_tiramisu.png" alt="Espresso soaking" fill sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            </div>
          </div>
          
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <a href="#" className="btn btn-outline" style={{ pointerEvents: "none" }}>
              Follow us @thetiramisupoet
            </a>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className={`${styles.reviews} section-padding`}>
        <div className="container">
          <p className="subtitle-section">Client Voices</p>
          <h2 className="title-section">What Our Guests Say</h2>
          
          <div className={styles.reviewContainer}>
            <div className={styles.reviewText}>
              {REVIEWS[activeReviewIndex].text}
            </div>
            <p className={styles.reviewAuthor}>
              {REVIEWS[activeReviewIndex].author}
            </p>
            
            <div className={styles.dots}>
              {REVIEWS.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${
                    index === activeReviewIndex ? styles.dotActive : ""
                  }`}
                  onClick={() => setActiveReviewIndex(index)}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
