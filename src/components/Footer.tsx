"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.logo} style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}>
              <Image
                src="/logo.png"
                alt="The Tiramisu Poet"
                width={140}
                height={42}
                style={{ objectFit: "contain", height: "auto" }}
              />
            </div>
            <p className={styles.tagline}>
              Handcrafted tiramisu masterworks and luxury dessert experiences for weddings, events, and unforgettable moments.
            </p>
            <div className={styles.socials}>
              <a href="https://www.instagram.com/thetiramisupoet/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor" className={styles.svgIcon} aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@the.tiramisu.poet" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor" className={styles.svgIcon} aria-hidden="true">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.51-.71-.53-1.3-1.22-1.74-2v7.37c-.06 1.83-.55 3.72-1.71 5.13-1.53 1.93-4.14 2.87-6.52 2.45-2.73-.43-5.07-2.67-5.32-5.43-.37-3.48 2.05-6.85 5.51-7.39.81-.13 1.64-.1 2.44.07V12c-.9-.23-1.89-.25-2.79-.04-2.18.5-3.83 2.5-3.8 4.77.06 2.58 2.37 4.77 4.96 4.62 2.48-.1 4.54-2.22 4.54-4.71V.02z"/>
                </svg>
              </a>
              <a href="https://share.google/p5kdWLkpBeVm40RlI" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Google">
                <svg viewBox="0 0 24 24" fill="currentColor" className={styles.svgIcon} aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className={styles.title}>Navigation</h4>
            <ul className={styles.links}>
              <li>
                <Link href="/shop" className={styles.link}>
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/weddings" className={styles.link}>
                  Weddings & Events
                </Link>
              </li>
              <li>
                <Link href="/catering" className={styles.link}>
                  Catering
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.link}>
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.link}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Column */}
          <div>
            <h4 className={styles.title}>Service</h4>
            <ul className={styles.links}>
              <li>
                <a href="#" className={styles.link}>
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Pickup & Delivery
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Allergens & Ingredients
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className={styles.newsletterCol}>
            <h4 className={styles.title}>The Poet&apos;s Club</h4>
            {!isSubmitted ? (
              <>
                <p className={styles.newsletterText}>
                  Subscribe to receive exclusive collection releases, recipes, and invitations to event previews.
                </p>
                <form className={styles.form} onSubmit={handleSubmit}>
                  <input
                    type="email"
                    className={styles.input}
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email address for newsletter"
                  />
                  <button type="submit" className={styles.submitBtn}>
                    Subscribe
                  </button>
                </form>
              </>
            ) : (
              <p className={styles.successMsg}>
                Thank you. You are now part of the Poet&apos;s Club. ✨
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} The Tiramisu Poet. All rights reserved.
          </p>
          <ul className={styles.legalLinks}>
            <li>
              <a href="#" className={styles.legalLink}>
                Imprint
              </a>
            </li>
            <li>
              <a href="#" className={styles.legalLink}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className={styles.legalLink}>
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
