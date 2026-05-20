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
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                Instagram
              </a>
              <a href="#" className={styles.socialIcon} aria-label="TikTok">
                TikTok
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Pinterest">
                Pinterest
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
