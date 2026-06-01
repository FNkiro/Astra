import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Heart, Target, Users } from "lucide-react";

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: "Built with intent",
      description:
        "Every ASTRA piece is designed with purpose — no noise, no excess, just clean identity and strong presence.",
    },
    {
      icon: Target,
      title: "Drop culture mindset",
      description:
        "We don’t follow seasons. We release moments. Limited drops only — when it’s ready, not when it’s forced.",
    },
    {
      icon: Users,
      title: "Community driven",
      description:
        "ASTRA is worn by a growing culture, not customers. Every drop belongs to the people who move with the brand.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About - ASTRA</title>
        <meta
          name="description"
          content="ASTRA streetwear. Limited drops, clean design, strong identity."
        />
      </Helmet>

      <div className="relative min-h-screen bg-black text-white overflow-hidden">

        {/* 🌌 BACKGROUND */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="stars"></div>
          <div className="glow"></div>
        </div>

        {/* HERO */}
        <section className="relative flex items-center justify-center min-h-[70vh] px-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-semibold tracking-[0.3em] uppercase">
              About ASTRA
            </h1>

            <p className="mt-6 text-white/60 text-lg md:text-xl leading-relaxed">
              A streetwear label built on silence, precision, and limited drops.
              No trends. No noise. Just identity.
            </p>
          </motion.div>
        </section>

        {/* STORY SECTION */}
        <section className="relative max-w-6xl mx-auto px-6 pb-24">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* TEXT PANEL */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-[0_0_80px_rgba(255,255,255,0.03)]"
            >
              <h2 className="text-2xl tracking-[0.25em] uppercase mb-6">
                The vision
              </h2>

              <div className="space-y-4 text-white/60 leading-relaxed">
                <p>
                  ASTRA started with a simple idea: streetwear doesn’t need to scream to be seen.
                  It just needs presence.
                </p>

                <p>
                  Every drop is built slowly, intentionally — designed to feel rare, not mass-produced.
                  We focus on silhouettes, emotion, and identity rather than trends.
                </p>

                <p>
                  We don’t chase fashion cycles. We create releases that feel like moments — once they’re gone, they’re gone.
                </p>
              </div>
            </motion.div>

            {/* IMAGE PANEL */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(255,255,255,0.05)]"
            >
              <img
                src="https://media.discordapp.net/attachments/1473650357275197440/1510507963197161512/lofovud.png?ex=6a1d11aa&is=6a1bc02a&hm=4898ef3387872ea66d2ac81c1fd3efed8908fb8470c7605078f3d285059efaf5&=&format=webp&quality=lossless&width=1006&height=1006"
                alt="ASTRA inspiration"
                className="w-full h-[500px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
            </motion.div>
          </div>

          {/* VALUES */}
          <div className="text-center mt-24 mb-12">
            <h2 className="text-3xl tracking-[0.25em] uppercase">
              Core principles
            </h2>

            <p className="text-white/50 mt-4 max-w-2xl mx-auto">
              Everything we build comes from these rules. We don’t break them.
            </p>
          </div>

          {/* GRID */}
          <div className="grid md:grid-cols-3 gap-8">

            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center hover:bg-white/10 transition"
              >

                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition">
                  <value.icon className="w-6 h-6 text-white/80" />
                </div>

                <h3 className="tracking-[0.2em] uppercase text-sm mb-3">
                  {value.title}
                </h3>

                <p className="text-white/50 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}

          </div>

        </section>

        {/* 🌠 STYLE */}
        <style>{`
          .stars {
            position: absolute;
            inset: 0;
            background-image: radial-gradient(1px 1px at 20px 30px, white, transparent);
            opacity: 0.15;
            animation: moveStars 120s linear infinite;
          }

          .glow {
            position: absolute;
            inset: 0;
            background: radial-gradient(
              circle at 50% 0%,
              rgba(120, 200, 255, 0.10),
              transparent 60%
            );
          }

          @keyframes moveStars {
            from { transform: translateY(0); }
            to { transform: translateY(-1000px); }
          }
        `}</style>

      </div>
    </>
  );
};

export default AboutPage;