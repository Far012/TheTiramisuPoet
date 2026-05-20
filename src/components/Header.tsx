"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import styles from "./Header.module.css";

export default function Header() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`${styles.header} ${isShrunk ? styles.shrunk : ""} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
      <div className={styles.container}>
        {/* Left Nav (Desktop) */}
        <nav className={`${styles.navGroup} ${styles.leftNav}`}>
          <Link href="/shop" className={styles.navLink}>
            Shop
          </Link>
          <Link href="/weddings" className={styles.navLink}>
            Weddings & Events
          </Link>
          <Link href="/catering" className={styles.navLink}>
            Catering
          </Link>
        </nav>

        {/* Brand Logo */}
        <Link href="/" className={styles.logo} style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/logo_text_only.png"
            alt="The Tiramisu Poet"
            width={180}
            height={40}
            style={{ objectFit: "contain", height: "auto" }}
            priority
          />
        </Link>

        {/* Right Nav (Desktop) */}
        <nav className={`${styles.navGroup} ${styles.rightNav}`}>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
          <Link href="/contact" className={styles.navLink}>
            Contact
          </Link>
        </nav>

        {/* Actions (Cart & Hamburger) */}
        <div className={styles.actions}>
          <button
            className={styles.cartBtn}
            onClick={() => setIsCartOpen(true)}
            aria-label="Warenkorb öffnen"
          >
            <svg
              className={styles.cartIcon}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="9" cy="21" r="1" fill="currentColor" />
              <circle cx="20" cy="21" r="1" fill="currentColor" />
              <path
                d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
          </button>

          <button
            className={styles.hamburger}
            onClick={toggleMobileMenu}
            aria-label="Menü umschalten"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={`${styles.mobileOverlay} ${
          isMobileMenuOpen ? styles.mobileOverlayActive : ""
        }`}
      >
        <Link href="/shop" className={styles.navLink}>
          Shop
        </Link>
        <Link href="/weddings" className={styles.navLink}>
          Weddings & Events
        </Link>
        <Link href="/catering" className={styles.navLink}>
          Catering
        </Link>
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
        <Link href="/contact" className={styles.navLink}>
          Contact
        </Link>
      </div>
    </header>
  );
}
