// 💎 ASTRA SINGLE SOURCE OF TRUTH

export const STORE_CONFIG = {
  CURRENCY: "DT",

  // 💰 PRICING
  PRODUCT_PRICE_CENTS: 4999,
  OLD_PRICE_CENTS: 6000,
  DELIVERY_FEE_CENTS: 400,

  // 🧠 UI TEXTS
  UI: {
    comingSoonText: "COMING SOON",
    addToCartText: "ADD TO CART",
  },

  // 🛍 PRODUCTS (ONLY SOURCE OF PRODUCTS)
  PRODUCTS: [
    {
      id: "astra-tee",
      title: "Am a Star",
      description: "Premium oversized ASTRA tee",

      images: [
        "https://media.discordapp.net/attachments/1473650357275197440/1510501627398979666/slide_1.png?ex=6a1db483&is=6a1c6303&hm=ac47f2d274cc29ce5d3eedb05c3469a26e46b44b51c057b95ae0da5aa19d9ad0&=&format=webp&quality=lossless&width=1006&height=1006",
        "https://media.discordapp.net/attachments/1473650357275197440/1510830628277326024/image.png?ex=6a1e3e2b&is=6a1cecab&hm=323de391e697a2f5ac58f829227186ff0c5b77967328b53fbdeacdf7ad706ab3&=&format=webp&quality=lossless",
        "https://media.discordapp.net/attachments/1473650357275197440/1510830693553410048/image.png?ex=6a1e3e3b&is=6a1cecbb&hm=bfc437e03fd11fe489146829189deca13e6e9f1c0682c839c3bd1b969e5893ab&=&format=webp&quality=lossless"
      ],

      price_cents: 4999,
      old_price_cents: 100,

      variants: [
        {
          id: "default",
          title: "Default",
          price_in_cents: 4999,
          price_formatted: "49.99 DT",
        },
      ],
    },
  ],
};