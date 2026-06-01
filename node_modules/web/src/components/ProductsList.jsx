import { DROP_IS_LIVE } from "@/config/drop";
import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

// --------------------
// fallback image
// --------------------
const placeholderImage =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzlDQTNBRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K";

// --------------------
// PRODUCT CARD
// --------------------
const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const image =
    (Array.isArray(product?.images)
      ? (typeof product.images[0] === "string"
          ? product.images[0]
          : product.images[0]?.url)
      : null) ||
    product?.image ||
    placeholderImage;

  const title = product?.name || product?.title || "ASTRA Drop";

  const priceLabel = DROP_IS_LIVE ? "49.99 DT" : "COMING SOON";

  const handleAddToCart = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!DROP_IS_LIVE) {
        toast({
          title: "Coming Soon",
          description: "This drop is not available yet.",
        });
        return;
      }

      // 🔥 FIX: send REAL variant structure
      const variant = product?.variants?.[0] || {
        id: "default",
        title: "Default",
        price_in_cents: 4999,
        price_formatted: "49.99 DT",
      };

      addToCart(
        {
          ...product,
          image,
        },
        variant,
        1
      );

      toast({
        title: "Added to cart",
        description: title,
      });
    },
    [addToCart, toast, product, image, title]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Link to={`/product/${product.id}`}>
        <div className="astra-card overflow-hidden group">

          {/* IMAGE */}
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={image}
              alt={title}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105 rounded-2xl"
              onError={(e) => {
                e.target.src = placeholderImage;
              }}
            />
          </div>

          {/* CONTENT */}
          <div className="p-5">

            <h3 className="text-xs font-medium tracking-[0.25em] uppercase whitespace-nowrap overflow-hidden">
              {title}
            </h3>

            <p className="text-sm text-muted-foreground mb-3">
              Premium streetwear drop
            </p>

            <div className="mb-4">
              <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
                {priceLabel}
              </span>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full astra-button-primary group"
            >
              <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
              Add To Cart
            </Button>

          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// --------------------
// PRODUCT LIST
// --------------------
const ProductsList = ({ products }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-12">
        <p>No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id || index}
          product={product}
          index={index}
        />
      ))}
    </div>
  );
};

export default ProductsList;