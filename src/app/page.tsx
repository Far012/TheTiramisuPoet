import Image from "next/image";
import Link from "next/link";
import HomeProductAction from "@/components/HomeProductAction";
import HomeReviewCarousel from "@/components/HomeReviewCarousel";
import styles from "./page.module.css";

const HERO_METRICS = [
  { value: "Delivery", label: "Across Bradford & GTA" },
  { value: "Freshly", label: "Prepared within 48h" },
  { value: "Private", label: "Event Tasting Guidance" },
];

const FEATURED_PRODUCTS = [
  {
    name: "Signature Tiramisu Cups",
    descriptor: "Six polished glass cups, layered fresh and finished with cocoa, berries, or seasonal florals.",
    price: 45,
    image: "/images/tiramisu_box.png",
    slug: "signature-tiramisu-cups",
    variant: "Box of 6 Classic",
    badge: "Best for gifting",
    action: "cart",
  },
  {
    name: "Classic Tiramisu Tray",
    descriptor: "A dinner-party tray built for clean slices, deep espresso notes, and a generous mascarpone finish.",
    price: 39,
    image: "/images/hero_tiramisu.png",
    slug: "classic-tiramisu-tray",
    variant: "Medium (6-8 guests)",
    badge: "Weekend icon",
    action: "cart",
  },
  {
    name: "Wedding Tiramisu Tower",
    descriptor: "A tiered dessert installation with custom cocoa stencil, florals, delivery, and on-site setup.",
    price: 280,
    image: "/images/wedding_tower.png",
    slug: "wedding-tower",
    variant: "Tower with 36 Cups",
    badge: "For celebrations",
    action: "link",
    href: "/weddings",
  },
] as const;

const OCCASIONS = [
  {
    title: "Private dinners",
    text: "Tray and cup formats that arrive chilled, portioned, and ready to serve.",
  },
  {
    title: "Brand events",
    text: "Dessert tables, custom cocoa marks, and neat service pacing for guest flow.",
  },
  {
    title: "Weddings",
    text: "Tower sizing, floral styling, and setup notes aligned before the date.",
  },
];

const PROCESS_STEPS = [
  "Espresso is brewed for each batch and cooled before layering.",
  "Mascarpone cream is folded by hand for a clean, light finish.",
  "Every order is chilled, packed, and timed around your pickup or delivery slot.",
];

const GALLERY = [
  {
    src: "/images/tiramisu_box.png",
    alt: "Gift box with six tiramisu cups and floral garnish",
  },
  {
    src: "/images/wedding_tower.png",
    alt: "Wedding tiramisu tower with glass tiers and white flowers",
  },
  {
    src: "/images/hero_tiramisu.png",
    alt: "Single tiramisu cup with espresso and gold spoon",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <Image
          src="/images/hero_tiramisu.png"
          alt="Handcrafted tiramisu cup on a sunlit table"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />

        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Bespoke dessert studio</p>
            <h1 id="hero-title" className={styles.heroTitle}>
              The Tiramisu Poet
            </h1>
            <p className={styles.heroText}>
              Handcrafted tiramisu cups, trays, and wedding towers for moments
              that deserve more than a standard dessert.
            </p>
            <div className={styles.heroActions}>
              <Link href="/shop" className={`btn ${styles.heroPrimary}`}>
                Shop the Collection
              </Link>
              <Link href="/contact" className={`btn ${styles.heroSecondary}`}>
                Design Your Event
              </Link>
            </div>
          </div>

          <dl className={styles.heroMetrics} aria-label="Studio highlights">
            {HERO_METRICS.map((metric) => (
              <div key={metric.label} className={styles.heroMetric}>
                <dt>{metric.value}</dt>
                <dd>{metric.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.signalRail} aria-label="What makes the studio different">
        <div className={`container ${styles.signalGrid}`}>
          <p>Small-batch production</p>
          <p>Custom cocoa lettering</p>
          <p>Pickup and chilled delivery</p>
          <p>Wedding tower setup</p>
        </div>
      </section>

      <section className={`${styles.collections} section-padding`} aria-labelledby="collections-title">
        <div className="container">
          <div className={styles.sectionHeader}>
            <p className="subtitle-section">Signature collection</p>
            <h2 id="collections-title" className="title-section">
              Built for arrival, reveal, and the first spoonful.
            </h2>
            <p className={styles.sectionLead}>
              Each format is designed around how it will actually be served:
              clean portions, controlled temperature, and a finish that still
              looks composed when the box opens.
            </p>
          </div>

          <div className={styles.productGrid}>
            {FEATURED_PRODUCTS.map((product) => (
              <article key={product.slug} className={styles.productCard}>
                <Link
                  href={product.action === "link" ? product.href : `/shop/${product.slug}`}
                  className={styles.productImageLink}
                >
                  <span className={styles.productBadge}>{product.badge}</span>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 720px) 100vw, 33vw"
                    className={styles.productImage}
                  />
                </Link>
                <div className={styles.productInfo}>
                  <div>
                    <h3 className={styles.productTitle}>{product.name}</h3>
                    <p className={styles.productText}>{product.descriptor}</p>
                  </div>
                  <div className={styles.productFooter}>
                    <p className={styles.productPrice}>from ${product.price.toFixed(2)}</p>
                    {product.action === "link" ? (
                      <Link href={product.href} className={`${styles.productAction} btn btn-outline`}>
                        Explore
                      </Link>
                    ) : (
                      <HomeProductAction product={product} />
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.occasionBand} aria-labelledby="occasions-title">
        <div className={`container ${styles.occasionInner}`}>
          <div className={styles.occasionCopy}>
            <p className={styles.eyebrowDark}>Occasions</p>
            <h2 id="occasions-title" className={styles.occasionTitle}>
              Dessert service with the logistics already thought through.
            </h2>
            <p className={styles.occasionLead}>
              The studio plans quantity, format, timing, and presentation as one
              system, so dessert feels effortless in the room.
            </p>
            <Link href="/catering" className={`${styles.darkButton} btn`}>
              View catering
            </Link>
          </div>

          <div className={styles.occasionImageWrap}>
            <Image
              src="/images/wedding_tower.png"
              alt="Wedding dessert tower prepared for an evening reception"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              className={styles.occasionImage}
            />
          </div>

          <div className={styles.occasionList}>
            {OCCASIONS.map((occasion) => (
              <article key={occasion.title} className={styles.occasionItem}>
                <h3>{occasion.title}</h3>
                <p>{occasion.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.process} section-padding`} aria-labelledby="process-title">
        <div className={`container ${styles.processGrid}`}>
          <div>
            <p className="subtitle-section">Atelier rhythm</p>
            <h2 id="process-title" className={`${styles.processTitle} title-section`}>
              Freshness is not a claim. It is the schedule.
            </h2>
          </div>
          <ol className={styles.processList}>
            {PROCESS_STEPS.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={`${styles.gallery} section-padding`} aria-labelledby="gallery-title">
        <div className="container">
          <div className={styles.galleryHeader}>
            <p className="subtitle-section">Curated moments</p>
            <h2 id="gallery-title" className="title-section">
              A visual language of cocoa, glass, cream, and ceremony.
            </h2>
          </div>

          <div className={styles.galleryGrid}>
            {GALLERY.map((image, index) => (
              <figure
                key={image.alt}
                className={`${styles.galleryItem} ${index === 1 ? styles.galleryItemLarge : ""}`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={index === 1 ? "(max-width: 900px) 100vw, 50vw" : "(max-width: 900px) 100vw, 25vw"}
                  className={styles.galleryImage}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <HomeReviewCarousel />
    </div>
  );
}
