import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SuccessPage() {
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowContent(true), 200);
    const t2 = setTimeout(() => setShowButton(true), 900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* ambient luxury light */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.03),transparent_60%)]" />

      <div
        className={`
          relative z-10 max-w-2xl w-full transition-all duration-700 ease-out
          ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        <div className="border border-white/10 rounded-[42px] bg-white/[0.03] backdrop-blur-xl p-12 md:p-16">

          {/* brand */}
          <div className="mb-10">
            <span className="text-xs tracking-[0.5em] text-white/40 uppercase">
              Astra
            </span>
          </div>

          {/* tick (premium, not emoji green) */}
          <div className="mb-10">
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
              <span className="text-white/80 text-lg">✓</span>
            </div>
          </div>

          {/* title */}
          <h1 className="text-5xl md:text-6xl font-light leading-none tracking-tight mb-8">
            Order
            <br />
            confirmed.
          </h1>

          {/* description */}
          <p className="text-white/60 text-lg max-w-md leading-relaxed mb-10">
            Your order has been received and is now being prepared.
            You will be contacted before dispatch.
          </p>

          {/* divider */}
          <div className="w-full h-px bg-white/10 mb-10" />

          {/* details */}
          <div className="grid grid-cols-2 gap-10 text-sm mb-10">
            <div>
              <p className="text-white/40 uppercase tracking-[0.25em] mb-2">
                Payment
              </p>
              <p className="text-white/80">Cash on Delivery</p>
            </div>

            <div>
              <p className="text-white/40 uppercase tracking-[0.25em] mb-2">
                Status
              </p>
              <p className="text-white/80">Awaiting Dispatch</p>
            </div>
          </div>

          {/* button (delayed reveal) */}
          <div
            className={`
              transition-all duration-700 ease-out
              ${showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            <Link
              to="/"
              className="
                inline-flex
                items-center
                gap-3
                text-sm
                uppercase
                tracking-[0.35em]
                text-white/80
                hover:text-white
                transition
                group
              "
            >
              <span>Continue shopping</span>
              <span className="transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}