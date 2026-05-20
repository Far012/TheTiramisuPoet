"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

interface FormData {
  eventType: string;
  date: string;
  location: string;
  guests: string;
  packageType: string;
  notes: string;
  name: string;
  email: string;
  phone: string;
}

const DEFAULT_FORM_DATA: FormData = {
  eventType: "wedding",
  date: "",
  location: "",
  guests: "50",
  packageType: "cups",
  notes: "",
  name: "",
  email: "",
  phone: "",
};

function getInitialFormData(searchParams: ReturnType<typeof useSearchParams>): FormData {
  const guestsParam = searchParams.get("guests");
  const typeParam = searchParams.get("type");
  const cupsParam = searchParams.get("cups");

  if (!guestsParam && !typeParam && !cupsParam) {
    return DEFAULT_FORM_DATA;
  }

  return {
    ...DEFAULT_FORM_DATA,
    eventType: typeParam === "wedding" ? "wedding" : typeParam === "corporate" ? "corporate" : "catering",
    guests: guestsParam || DEFAULT_FORM_DATA.guests,
    packageType: typeParam === "wedding" ? "wedding_tower" : DEFAULT_FORM_DATA.packageType,
    notes: cupsParam
      ? `Requested via Wedding Configurator: ${cupsParam} cups recommended for ${guestsParam} guests.`
      : DEFAULT_FORM_DATA.notes,
  };
}

function ContactForm() {
  const searchParams = useSearchParams();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(() => getInitialFormData(searchParams));

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step: number) => {
    const stepErrors: Partial<FormData> = {};
    
    if (step === 1) {
      if (!formData.eventType) stepErrors.eventType = "Please select an event type.";
      if (!formData.date) stepErrors.date = "Please select a date.";
      if (!formData.location.trim()) stepErrors.location = "Please enter a venue/location.";
    } else if (step === 2) {
      if (!formData.guests || parseInt(formData.guests) <= 0) {
        stepErrors.guests = "Please enter a valid guest count.";
      }
    } else if (step === 3) {
      if (!formData.name.trim()) stepErrors.name = "Please enter your name.";
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        stepErrors.email = "Please enter a valid email address.";
      }
      if (!formData.phone.trim()) stepErrors.phone = "Please enter a phone number.";
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setLoading(true);
    // Simulate sending email to dessert studio
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const getEventName = (key: string) => {
    switch (key) {
      case "wedding": return "Wedding / Hochzeit";
      case "corporate": return "Corporate Event / PR";
      case "catering": return "Private Party / Dinner";
      default: return "Other Event";
    }
  };

  const getPackageName = (key: string) => {
    switch (key) {
      case "cups": return "Signature Cups Boxes";
      case "wedding_tower": return "The Wedding Tiramisu Tower";
      case "buffet": return "Dessert Buffet Trays";
      default: return "Undecided / Consultation Requested";
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.successCard}>
        <span className={styles.successIcon}>✨</span>
        <h2 className={styles.successTitle}>Your inquiry has been penned.</h2>
        <p className={styles.successText}>
          We have received your wishes. Our patisserie studio will get in touch with a bespoke offer within <strong>24 hours</strong>.
        </p>
        
        <div
          style={{
            textAlign: "left",
            backgroundColor: "var(--cream)",
            border: "1px solid var(--blush)",
            padding: "1.5rem",
            borderRadius: "4px",
            maxWidth: "450px",
            margin: "0 auto 2.5rem",
            fontSize: "0.8125rem",
          }}
        >
          <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: "1.25rem", marginBottom: "0.75rem" }}>
            Summary of Your Inquiry:
          </h3>
          <p><strong>Event Type:</strong> {getEventName(formData.eventType)}</p>
          <p><strong>Date:</strong> {new Date(formData.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          <p><strong>Location:</strong> {formData.location}</p>
          <p><strong>Guest Count:</strong> {formData.guests}</p>
          <p><strong>Requested Package:</strong> {getPackageName(formData.packageType)}</p>
          {formData.notes && <p><strong>Notes:</strong> &ldquo;{formData.notes}&rdquo;</p>}
          <p style={{ borderTop: "1px solid var(--blush)", marginTop: "0.5rem", paddingTop: "0.5rem" }}>
            <strong>Contact:</strong> {formData.name} ({formData.email}, Tel: {formData.phone})
          </p>
        </div>

        <Link href="/" className="btn btn-primary">
          Back to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.formCard}>
      <form onSubmit={handleSubmit}>
        {/* Step 1: Event Details */}
        {currentStep === 1 && (
          <div className={styles.stepContainer}>
            <div>
              <h3 className={styles.stepTitle}>Event Details</h3>
              
              <div className="form-group">
                <label className="form-label" htmlFor="eventType-select">Event Type</label>
                <select
                  id="eventType-select"
                  name="eventType"
                  className="form-select"
                  value={formData.eventType}
                  onChange={handleChange}
                >
                  <option value="wedding">Wedding (Hochzeit)</option>
                  <option value="corporate">Corporate Event (PR, Gala, Catering)</option>
                  <option value="catering">Private Party (Birthday, Dinner Party)</option>
                  <option value="other">Other Occasion</option>
                </select>
                {errors.eventType && <span className={styles.errorFeedback}>{errors.eventType}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="date-input">Event Date</label>
                <input
                  id="date-input"
                  type="date"
                  name="date"
                  className="form-input"
                  value={formData.date}
                  onChange={handleChange}
                />
                {errors.date && <span className={styles.errorFeedback}>{errors.date}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="location-input">Venue / Location</label>
                <input
                  id="location-input"
                  type="text"
                  name="location"
                  placeholder="e.g. Munich (pickup or chilled delivery)"
                  className="form-input"
                  value={formData.location}
                  onChange={handleChange}
                />
                {errors.location && <span className={styles.errorFeedback}>{errors.location}</span>}
              </div>
            </div>

            <div className={styles.buttonRow}>
              <button
                type="button"
                className={`btn btn-primary ${styles.navBtn}`}
                onClick={handleNext}
                style={{ width: "100%" }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Customization & Guests */}
        {currentStep === 2 && (
          <div className={styles.stepContainer}>
            <div>
              <h3 className={styles.stepTitle}>Guests &amp; Dessert Package</h3>
              
              <div className="form-group">
                <label className="form-label" htmlFor="guests-input">Approximate Guest Count</label>
                <input
                  id="guests-input"
                  type="number"
                  name="guests"
                  className="form-input"
                  value={formData.guests}
                  onChange={handleChange}
                />
                {errors.guests && <span className={styles.errorFeedback}>{errors.guests}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="packageType-select">Preferred Setup</label>
                <select
                  id="packageType-select"
                  name="packageType"
                  className="form-select"
                  value={formData.packageType}
                  onChange={handleChange}
                >
                  <option value="cups">Single Servings (Signature Cups)</option>
                  <option value="wedding_tower">The Wedding Tower (Tiered Setup)</option>
                  <option value="buffet">Dessert Buffet (Assorted Trays)</option>
                  <option value="undecided">Undecided / Consultation Requested</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="notes-textarea">Special Requests (e.g., allergens, custom logo, decor theme)</label>
                <textarea
                  id="notes-textarea"
                  name="notes"
                  rows={4}
                  placeholder="e.g. Alcohol-free option requested, matching florist decor with event theme..."
                  className="form-textarea"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.buttonRow}>
              <button
                type="button"
                className={`btn btn-outline ${styles.navBtn}`}
                onClick={handlePrev}
              >
                Back
              </button>
              <button
                type="button"
                className={`btn btn-primary ${styles.navBtn}`}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Contact details */}
        {currentStep === 3 && (
          <div className={styles.stepContainer}>
            <div>
              <h3 className={styles.stepTitle}>Your Contact Details</h3>
              
              <div className="form-group">
                <label className="form-label" htmlFor="name-input">Full Name</label>
                <input
                  id="name-input"
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className={styles.errorFeedback}>{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email-input">Email Address</label>
                <input
                  id="email-input"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className={styles.errorFeedback}>{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone-input">Phone Number</label>
                <input
                  id="phone-input"
                  type="tel"
                  name="phone"
                  placeholder="For questions/follow-ups"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className={styles.errorFeedback}>{errors.phone}</span>}
              </div>
            </div>

            <div className={styles.buttonRow}>
              <button
                type="button"
                className={`btn btn-outline ${styles.navBtn}`}
                onClick={handlePrev}
                disabled={loading}
              >
                Back
              </button>
              <button
                type="submit"
                className={`btn btn-primary ${styles.navBtn}`}
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit Inquiry"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default function Contact() {
  return (
    <div className={`${styles.contactPage} anim-fade-in`}>
      <div className="container">
        
        {/* Intro */}
        <div className={styles.intro}>
          <p className="subtitle-section">Get in Touch</p>
          <h1 className="title-section" style={{ fontSize: "3rem" }}>Send an Inquiry</h1>
          <p className={styles.introText}>
            Let us write your sweet story. Complete our inquiry configurator in just a few steps to begin planning your custom dessert selection.
          </p>
        </div>

        {/* Dynamic inquiry form wrapped in Suspense for search params resolution */}
        <Suspense fallback={<div style={{ textAlign: "center", padding: "5rem" }}>Loading...</div>}>
          <ContactForm />
        </Suspense>

      </div>
    </div>
  );
}
