import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { DROP_IS_LIVE } from "@/config/drop";

// -------------------------
// STAR FIELD (unchanged)
// -------------------------
const Starfield = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 90 }).map((_, i) => {
      const size = Math.random() * 2 + 1;
      const opacity = Math.random() * 0.6 + 0.2;

      return (
        <div
          key={i}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      );
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {stars}
    </div>
  );
};

// -------------------------
// BACKGROUND AURA (unchanged)
// -------------------------
const BackgroundAura = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-white/10 blur-[140px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-white/5 blur-[160px] rounded-full animate-pulse" />
      <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 animate-pulse" />
    </div>
  );
};

const HomePage = () => {
  const imageUrl =
    "https://media.discordapp.net/attachments/1473650357275197440/1510498967933292614/asss.png?ex=6a1d0949&is=6a1bb7c9&hm=57ef50aa065c523f9758fd0da8ef55073c1dfc753e32498d95ae274dd0e240ab&=&format=webp&quality=lossless&width=1006&height=1006";

  return (
    <>
      <Helmet>
        <title>ASTRA — First Drop</title>
        <meta
          name="description"
          content="ASTRA First Drop. Minimal. Rare. Cinematic streetwear."
        />
      </Helmet>

      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background pt-20">

        <BackgroundAura />
        <Starfield />

        <div className="relative z-10 astra-container w-full flex flex-col lg:flex-row items-center justify-between gap-14">

          {/* TEXT */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-foreground tracking-[0.35em] uppercase font-light text-6xl md:text-7xl lg:text-8xl">
              ASTRA
            </h1>

            <p className="mt-6 text-xl md:text-2xl lg:text-3xl tracking-[0.5em] uppercase text-muted font-light">
              First Drop
            </p>

            <div className="mt-6 mb-10 w-24 h-[1px] bg-white/30 mx-auto lg:mx-0" />

            <Link to="/shop">
              <Button
                size="lg"
                className="astra-button-primary text-lg px-10 py-6 tracking-[0.3em] uppercase"
              >
                {DROP_IS_LIVE ? "Shop Now" : "Coming Soon"}
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            className="flex-1 relative w-full max-w-md lg:max-w-xl xl:max-w-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="relative aspect-square w-full">
              <div className="absolute inset-10 bg-white/10 blur-[120px] rounded-full" />

              <motion.img
                src={imageUrl}
                alt="ASTRA Drop"
                className="w-full h-full object-contain drop-shadow-2xl"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default HomePage;