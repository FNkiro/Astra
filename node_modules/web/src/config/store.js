// 💎 ASTRA STORE CONFIG (single source of truth)

export const STORE_CONFIG = {
  // 💰 PRICING (ONLY ONE SOURCE NOW)
  PRODUCT_PRICE_CENTS: 4999, // 49.99 DT
  OLD_PRICE_CENTS: 100,     // 60.00 DT
  DELIVERY_FEE_CENTS: 700,   // 7 DT

  // 💳 CURRENCY
  CURRENCY: "DT",

  // 🛍 PRODUCTS DATABASE (EDIT EVERYTHING HERE)
  PRODUCTS: [
    {
      id: "astra-tee",
      title: "Am the Star",   // 👈 change name here works everywhere now
      image:
        "https://media.discordapp.net/attachments/1473650357275197440/1510501627398979666/slide_1.png?ex=6a1db483&is=6a1c6303&hm=ac47f2d274cc29ce5d3eedb05c3469a26e46b44b51c057b95ae0da5aa19d9ad0&=&format=webp&quality=lossless&width=1006&height=1006",

      price_cents: 4999,
      old_price_cents: 10,

      sizes: ["XS", "S", "M", "L", "XL"],

      description: "Premium ASTRA essential drop tee.",
    },

    {
      id: "astra-hoodie",
      title: "ASTRA Hoodie",
      image:
        "",

      price_cents: 7999,
      old_price_cents: 10000,

      sizes: ["S", "M", "L", "XL"],

      description: "Heavy oversized ASTRA hoodie.",
    },
  ],

  // 🧠 UI TEXTS (EDIT EVERYTHING FROM HERE)
  UI: {
    comingSoonText: "COMING SOON",
    addToCartText: "ADD TO CART",
    dropTitle: "ASTRA DROP",
  },
};