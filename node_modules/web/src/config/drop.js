import { STORE_CONFIG } from "./shopConfig";

// keep ONLY compatibility layer
export const DROP_IS_LIVE = true;

export const PRODUCT_PRICE_CENTS = STORE_CONFIG.PRODUCT_PRICE_CENTS;
export const DELIVERY_FEE_CENTS = STORE_CONFIG.DELIVERY_FEE_CENTS;
export const OLD_PRICE_CENTS = STORE_CONFIG.OLD_PRICE_CENTS;

export { STORE_CONFIG };