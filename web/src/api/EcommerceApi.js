// src/api/EcommerceApi.js

import { STORE_CONFIG } from "@/config/drop";

// --------------------
// PRODUCTS (DIRECT FROM SHOP CONFIG)
// --------------------

export async function getProducts() {
  return STORE_CONFIG.PRODUCTS;
}

export async function getProduct(id) {
  return STORE_CONFIG.PRODUCTS.find((p) => p.id === id);
}

// --------------------
// CURRENCY FORMATTER
// --------------------

export const formatCurrency = (cents) => {
  return `${(Number(cents || 0) / 100).toFixed(2)} ${STORE_CONFIG.CURRENCY}`;
};