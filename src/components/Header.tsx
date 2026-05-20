"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import styles from "./Header.module.css";

const LEFT_NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/weddings", label: "Weddings & Events" },
  { href: "/catering", label: "Catering" },
];

const RIGHT_NAV = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

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

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((isOpen) => !isOpen);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const renderNavLink = (item: { href: string; label: string }) => {
    const active = isActive(item.href);

    return (
      <Link
        key={item.href}
        href={item.href}
        className={`${styles.navLink} ${active ? styles.navLinkActive : ""}`}
        aria-current={active ? "page" : undefined}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className={`${styles.header} ${isShrunk ? styles.shrunk : ""} ${isMobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
      <div className={styles.container}>
        <nav className={`${styles.navGroup} ${styles.leftNav}`}>
          {LEFT_NAV.map(renderNavLink)}
        </nav>

        <Link href="/" className={styles.logo} aria-label="The Tiramisu Poet home">
          <Image
            src="/logo_text_only.png"
            alt="The Tiramisu Poet"
            width={180}
            height={40}
            className={styles.logoImage}
            style={{ height: "auto" }}
            priority
          />
        </Link>

        <nav className={`${styles.navGroup} ${styles.rightNav}`}>
          {RIGHT_NAV.map(renderNavLink)}
        </nav>

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
            aria-controls="mobile-navigation"
            aria-expanded={isMobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`${styles.mobileOverlay} ${
          isMobileMenuOpen ? styles.mobileOverlayActive : ""
        }`}
      >
        {[...LEFT_NAV, ...RIGHT_NAV].map(renderNavLink)}
      </div>
    </header>
  );
}
