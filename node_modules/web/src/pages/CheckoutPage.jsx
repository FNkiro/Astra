import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { DELIVERY_FEE_CENTS } from "@/config/drop";

const GOVERNORATES = [
  "Tunis","Ariana","Ben Arous","Manouba","Nabeul","Zaghouan","Bizerte",
  "Béja","Jendouba","Le Kef","Siliana","Sousse","Monastir","Mahdia",
  "Sfax","Kairouan","Kasserine","Sidi Bouzid","Gabès","Medenine",
  "Tataouine","Gafsa","Tozeur","Kébili"
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    governorate: "",
    city: "",
    postalCode: "",
    address: "",
  });

  const [size, setSize] = useState("M");

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const e = {};

    if (!form.name) e.name = "Name required";
    if (!form.phone) e.phone = "Phone required";
    if (!form.governorate) e.governorate = "Governorate required";
    if (!form.city) e.city = "City required";
    if (!form.postalCode) e.postalCode = "Postal code required";
    if (!form.address) e.address = "Address required";
    if (!cartItems.length) e.cart = "Cart is empty";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ✅ FIXED TOTAL LOGIC (CENT CONSISTENT)
  const subtotal = getCartTotal(); // already in cents
  const delivery = DELIVERY_FEE_CENTS;
  const finalTotal = subtotal + delivery;

  const sendToWorker = async () => {
    const payload = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      city: form.city,
      governorate: form.governorate,
      postalCode: form.postalCode,

      size,

      items: cartItems.map((i) => ({
        product: i.product.title,
        quantity: i.quantity,
        variant: i.variant?.title || "default",
      })),

      // ✅ CONSISTENT PRICING (NO MORE MISMATCH)
      subtotal: (subtotal / 100).toFixed(2),
      delivery: (delivery / 100).toFixed(2),
      total: (finalTotal / 100).toFixed(2),
    };

    const res = await fetch(
      "https://astra-checkout.iyedoday1.workers.dev",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Worker error:", text);
      throw new Error("Order failed");
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      await sendToWorker();
      clearCart();
      navigate("/success");
    } catch (err) {
      alert("Order failed ❌");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,200,255,0.15),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-3xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_0_60px_rgba(255,255,255,0.05)]">

        <h1 className="text-3xl font-bold tracking-[0.3em] uppercase mb-6 text-center">
          ASTRA Checkout
        </h1>

        <div className="mb-6">
          <p className="text-sm text-white/60 mb-2 tracking-widest">
            SIZE
          </p>

          <div className="flex gap-2 flex-wrap">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-4 py-2 rounded-full border transition ${
                  size === s
                    ? "bg-white text-black"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {errors.cart && (
          <p className="text-red-400 mb-4">{errors.cart}</p>
        )}

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <select
              name="governorate"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
            >
              <option value="">Governorate</option>
              {GOVERNORATES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {errors.governorate && (
              <p className="text-red-400 text-xs mt-1">
                {errors.governorate}
              </p>
            )}
          </div>

          <div>
            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
            />
            {errors.city && (
              <p className="text-red-400 text-xs mt-1">{errors.city}</p>
            )}
          </div>

          <div>
            <input
              name="postalCode"
              placeholder="Postal Code"
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-black/40 border border-white/10"
            />
            {errors.postalCode && (
              <p className="text-red-400 text-xs mt-1">
                {errors.postalCode}
              </p>
            )}
          </div>
        </div>

        <textarea
          name="address"
          placeholder="Full Address"
          onChange={handleChange}
          className="w-full mt-4 p-3 rounded-xl bg-black/40 border border-white/10"
        />

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 rounded-full bg-white text-black font-bold tracking-widest hover:scale-[1.02] transition"
        >
          {loading ? "Sending..." : "CONFIRM ORDER"}
        </Button>
      </div>
    </div>
  );
}