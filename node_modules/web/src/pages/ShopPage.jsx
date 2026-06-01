  import React, { useEffect, useMemo, useState } from "react";
  import ProductsList from "@/components/ProductsList";
  import { getProducts } from "@/api/EcommerceApi";
  import { motion } from "framer-motion";

  const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const data = await getProducts();
          setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
          console.error(err);
          setProducts([]);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }, []);

    const sortedProducts = useMemo(() => {
      const items = [...products];

      switch (sortBy) {
        case "price-low":
          return items.sort((a, b) => (a.price_in_cents ?? 0) - (b.price_in_cents ?? 0));
        case "price-high":
          return items.sort((a, b) => (b.price_in_cents ?? 0) - (a.price_in_cents ?? 0));
        default:
          return items;
      }
    }, [products, sortBy]);

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <p className="tracking-[0.3em] opacity-60">LOADING COLLECTION...</p>
        </div>
      );
    }

    return (
      <div className="relative min-h-screen bg-black text-white overflow-hidden">

        {/* 🌌 STAR BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="stars"></div>
          <div className="stars2"></div>
          <div className="stars3"></div>
          <div className="glow-overlay"></div>
        </div>

        {/* CONTENT WRAPPER */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-14">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
          >
            <div>
              <h1 className="text-5xl md:text-6xl font-semibold tracking-[0.25em] uppercase">
                Shop
              </h1>

              <p className="text-white/50 mt-3 tracking-wide max-w-md">
                Curated pieces from the Astra collection — minimal, rare, premium.
              </p>
            </div>

            {/* SORT CONTROL */}
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                <span className="text-xs text-white/40 mr-2">SORT</span>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent outline-none text-sm cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price ↑</option>
                  <option value="price-high">Price ↓</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* PRODUCTS WRAP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-[0_0_60px_rgba(255,255,255,0.03)]"
          >
            <ProductsList products={sortedProducts} />
          </motion.div>

        </div>

        {/* 🌠 STAR + NEON CSS */}
        <style>{`
          .stars, .stars2, .stars3 {
            position: absolute;
            width: 100%;
            height: 100%;
            background-repeat: repeat;
            animation: moveStars 80s linear infinite;
          }

          .stars {
            background-image: radial-gradient(2px 2px at 20px 30px, white, transparent);
            opacity: 0.25;
          }

          .stars2 {
            background-image: radial-gradient(1px 1px at 120px 80px, white, transparent);
            opacity: 0.15;
            animation-duration: 140s;
          }

          .stars3 {
            background-image: radial-gradient(1px 1px at 200px 200px, white, transparent);
            opacity: 0.1;
            animation-duration: 200s;
          }

          @keyframes moveStars {
            from { transform: translateY(0px); }
            to { transform: translateY(-1000px); }
          }

          .glow-overlay {
            position: absolute;
            inset: 0;
            background: radial-gradient(
              circle at 50% 0%,
              rgba(120, 200, 255, 0.08),
              transparent 60%
            );
          }
        `}</style>
      </div>
    );
  };

  export default ShopPage;