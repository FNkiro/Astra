import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { getProduct } from "@/api/EcommerceApi";
import { STORE_CONFIG } from "@/config/drop";
import {
  DROP_IS_LIVE,
  PRODUCT_PRICE_CENTS,
  DELIVERY_FEE_CENTS,
} from "@/config/drop";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);

        if (!data) {
          navigate("/shop");
          return;
        }

        setProduct(data);
        setSelectedVariant(data.variants?.[0] || null);
      } catch (err) {
        toast({
          title: "Error",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ✅ FIXED IMAGE NORMALIZATION (THIS WAS THE BUG)
  const images = useMemo(() => {
    if (!product) return [];

    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images.map((img) =>
        typeof img === "string" ? img : img?.url
      );
    }

    if (product.image) return [product.image];

    return [];
  }, [product]);

  const displayImage =
    images[currentImageIndex] ||
    product?.image ||
    "https://via.placeholder.com/600";

  const handleTouchStart = (e) => {
    const startX = e.touches[0].clientX;

    const handleTouchEnd = (e2) => {
      const endX = e2.changedTouches[0].clientX;
      const diff = startX - endX;

      if (diff > 50 && currentImageIndex < images.length - 1) {
        setCurrentImageIndex((i) => i + 1);
      } else if (diff < -50 && currentImageIndex > 0) {
        setCurrentImageIndex((i) => i - 1);
      }

      window.removeEventListener("touchend", handleTouchEnd);
    };

    window.addEventListener("touchend", handleTouchEnd);
  };

  const newPrice = (PRODUCT_PRICE_CENTS / 100).toFixed(2) + " DT";
  const oldPrice = (STORE_CONFIG.OLD_PRICE_CENTS / 100).toFixed(2) + " DT";

  const handleAddToCart = async () => {
    if (!DROP_IS_LIVE) return;
    if (!product || !selectedVariant) return;

    await addToCart(product, selectedVariant, quantity);

    toast({
      title: "Added to cart",
      description: product.title,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <Skeleton className="h-96 w-full max-w-3xl rounded-3xl" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="stars"></div>
        <div className="glow"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14">

        <Button
          onClick={() => navigate("/shop")}
          variant="ghost"
          className="rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10"
        >
          <ChevronLeft className="mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 mt-10">

          {/* IMAGE SECTION (UNCHANGED DESIGN) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            <div
              onTouchStart={handleTouchStart}
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_80px_rgba(255,255,255,0.05)]"
            >
              <img
                src={displayImage}
                alt={product.title}
                className="w-full h-[520px] object-cover transition-all duration-300"
              />
            </div>

            {/* thumbnails FIXED */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${
                      currentImageIndex === i
                        ? "border-white"
                        : "border-white/10 opacity-60"
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* EVERYTHING BELOW LEFT EXACTLY SAME */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_0_80px_rgba(255,255,255,0.04)] space-y-6"
          >

            <h1 className="text-4xl font-semibold tracking-[0.25em] uppercase">
              {product.title || "UNTITLED"}
            </h1>

            {DROP_IS_LIVE ? (
              <div className="flex items-center gap-4">
                <div className="text-2xl tracking-widest text-white">
                  {newPrice}
                </div>

                <div className="text-lg text-white/40 line-through">
                  {oldPrice}
                </div>
              </div>
            ) : (
              <div className="text-lg tracking-widest text-white/50 uppercase">
                Coming Soon
              </div>
            )}

            <div
              className="text-white/60 leading-relaxed text-sm"
              dangerouslySetInnerHTML={{
                __html: product.description || "",
              }}
            />

            {product.variants?.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <Button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    className={`rounded-full px-4 py-2 border ${
                      selectedVariant?.id === v.id
                        ? "bg-white text-black"
                        : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {v.title}
                  </Button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4">
              <Button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="rounded-full w-10 h-10 bg-white/5 border border-white/10"
              >
                <Minus size={16} />
              </Button>

              <span className="text-lg">{quantity}</span>

              <Button
                onClick={() => setQuantity((q) => q + 1)}
                className="rounded-full w-10 h-10 bg-white/5 border border-white/10"
              >
                <Plus size={16} />
              </Button>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={!DROP_IS_LIVE}
              className={`w-full rounded-full font-semibold tracking-widest transition ${
                DROP_IS_LIVE
                  ? "bg-white text-black hover:scale-[1.02]"
                  : "bg-white/10 text-white/40 cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="mr-2" />
              {DROP_IS_LIVE ? "ADD TO CART" : "COMING SOON"}
            </Button>

          </motion.div>
        </div>
      </div>
    </div>
  );
}