"use client";

import { useCart } from "@/context/CartContext";
import styles from "./HomeProductAction.module.css";

type HomeProduct = {
  name: string;
  price: number;
  image: string;
  slug: string;
  variant: string;
};

export default function HomeProductAction({ product }: { product: HomeProduct }) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      className={`${styles.action} btn btn-primary`}
      onClick={() =>
        addToCart({
          name: product.name,
          price: product.price,
          image: product.image,
          slug: product.slug,
          variant: product.variant,
        })
      }
      aria-label={`Add ${product.name} to cart`}
    >
      Add to cart
    </button>
  );
}
