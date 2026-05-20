export interface Product {
  name: string;
  price: number;
  image: string;
  slug: string;
  category: "signature" | "cups" | "gifts";
  dietary: ("alcohol-free" | "gluten-free" | "egg-free")[];
  description: string;
  shortDescription: string;
  variants: string[];
}

export const PRODUCTS: Product[] = [
  {
    name: "Signature Tiramisu Cups",
    price: 45.0,
    image: "/images/tiramisu_box.png",
    slug: "signature-tiramisu-cups",
    category: "cups",
    dietary: ["alcohol-free"],
    description: "Our signature cups bring the luxury of an Italian patisserie directly to your home. Finest espresso, gently soaked biscuits, and an incomparably creamy mascarpone blend are topped with an elegant layer of cocoa. Each cup is individually decorated.",
    shortDescription: "The perfect balance of tradition and modernity, portioned in elegant single cups. (Box of 6)",
    variants: ["Box of 6 Classic", "Box of 12 Classic (+ $35.00)", "Box of 6 Alcohol-Free"],
  },
  {
    name: "Mini Dessert Cups (Party Mix)",
    price: 65.0,
    image: "/images/tiramisu_box.png",
    slug: "mini-dessert-cups",
    category: "cups",
    dietary: ["alcohol-free", "egg-free"],
    description: "The bite-sized version of our famous cups, created for cocktail parties, wedding receptions, and fine gatherings. Includes a selection of classic and alcohol-free cups with delicate garnishes.",
    shortDescription: "Tiny layers of happiness. Ideal for buffets and standing receptions. (Box of 18)",
    variants: ["Box of 18 Classic Mix", "Box of 18 Alcohol-Free & Egg-Free"],
  },
  {
    name: "Classic Tiramisu Tray",
    price: 39.0,
    image: "/images/hero_tiramisu.png",
    slug: "classic-tiramisu-tray",
    category: "signature",
    dietary: [],
    description: "The absolute classic for social gatherings. Served in a stylish, reusable tray. Handcrafted layer by layer according to our patissier's original recipe.",
    shortDescription: "The traditional Italian dessert tray for your exclusive dinner event at home.",
    variants: ["Medium (6-8 guests)", "Large (10-12 guests) (+ $20.00)"],
  },
  {
    name: "Amaretto Dream Tray",
    price: 42.0,
    image: "/images/hero_tiramisu.png",
    slug: "amaretto-dream-tray",
    category: "signature",
    dietary: [],
    description: "For lovers of rich nut aromas. Refined with a fine dash of aged Italian Amaretto and decorated with toasted almond flakes.",
    shortDescription: "Refined with authentic Italian Amaretto liqueur and toasted almonds.",
    variants: ["Medium (6-8 guests)", "Large (10-12 guests) (+ $20.00)"],
  },
  {
    name: "Bespoke Poet's Gift Box",
    price: 52.0,
    image: "/images/tiramisu_box.png",
    slug: "bespoke-poets-gift-box",
    category: "gifts",
    dietary: ["alcohol-free"],
    description: "The most exquisite way to gift tiramisu. Our ivory gift box is finished with a hand-tied silk ribbon. It contains 4 premium cups, a hand-written poem card of your choice, and two handcrafted gold-plated dessert spoons.",
    shortDescription: "Luxury gift box including silk ribbon, personalized poem card, and two gold-plated spoons.",
    variants: ["Classic Selection (4 Cups)", "Alcohol-Free Selection (4 Cups)"],
  },
];
