import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const DELIVERY_FEE = 700;

// 💎 fallback image (clean + premium placeholder)
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgIGhlaWdodD0iNDAwIiBmaWxsPSIjMTExMTExIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZpbGw9IiM5Y2EzYWYiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuMzVlbSI+Tk8gSU1BR0U8L3RleHQ+Cjwvc3ZnPg==";

// 🔥 PRODUCT NORMALIZER (FIXED IMAGE LOGIC)
const normalizeProduct = (product) => {
  const image =
    product?.image ||
    (Array.isArray(product?.images)
      ? typeof product.images[0] === "string"
        ? product.images[0]
        : product.images[0]?.url
      : null) ||
    PLACEHOLDER_IMAGE;

  return {
    ...product,
    title: product?.title || product?.name || "ASTRA ITEM",
    image,
  };
};

// 🔥 CART ITEM NORMALIZER (FIXED: ADDED MISSING FIELDS)
const normalizeCartItem = (product, variant, quantity) => {
  const safeProduct = normalizeProduct(product);

  return {
    product: safeProduct,

    variant: {
      ...variant,
      id: variant?.id,
      title: variant?.title || "Default",
      price_in_cents: Number(variant?.price_in_cents) || 0,
      price_formatted:
        variant?.price_formatted ||
        `${(
          (Number(variant?.price_in_cents) || 0) / 100
        ).toFixed(2)} DT`,
    },

    quantity: quantity || 1,

    // 🔥 IMPORTANT: used by cart UI
    image: safeProduct.image,
    title: safeProduct.title,
  };
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // LOAD CART
  useEffect(() => {
    const saved = localStorage.getItem("astra_cart");
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);
      setCartItems(Array.isArray(parsed) ? parsed : []);
    } catch {
      setCartItems([]);
    }
  }, []);

  // SAVE CART
  useEffect(() => {
    localStorage.setItem("astra_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // 🔥 ADD TO CART (FIXED SAFETY)
  const addToCart = (product, variant, quantity = 1) => {
    if (!product || !variant) return;

    setCartItems((prev) => {
      const safe = Array.isArray(prev) ? prev : [];

      const existing = safe.find(
        (i) => i?.variant?.id === variant.id
      );

      if (existing) {
        return safe.map((i) =>
          i?.variant?.id === variant.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }

      return [...safe, normalizeCartItem(product, variant, quantity)];
    });
  };

  // REMOVE
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((i) => i?.variant?.id !== id)
    );
  };

  // UPDATE QTY
  const updateQuantity = (id, qty) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i?.variant?.id === id ? { ...i, quantity: qty } : i
      )
    );
  };

  // CLEAR
  const clearCart = () => setCartItems([]);

  // TOTAL
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item?.variant?.price_in_cents;
      const qty = item?.quantity || 1;

      if (typeof price !== "number") return total;

      return total + price * qty;
    }, 0);
  };

  // FINAL TOTAL
  const getFinalTotal = () => getCartTotal() + DELIVERY_FEE;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getFinalTotal,
        DELIVERY_FEE,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);