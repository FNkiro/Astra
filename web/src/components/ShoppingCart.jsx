import React, { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart as ShoppingCartIcon,
  X,
  Minus,
  Plus,
} from "lucide-react";

import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

import { STORE_CONFIG } from "@/config/store"; // 🔥 FIX ADDED

const PLACEHOLDER =
  "https://via.placeholder.com/80?text=No+Image";

const ShoppingCart = ({ isCartOpen, setIsCartOpen }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
  } = useCart();

  const DELIVERY_FEE = STORE_CONFIG.DELIVERY_FEE_CENTS;

  // CHECKOUT
  const handleCheckout = useCallback(() => {
    if (!cartItems || cartItems.length === 0) {
      toast({
        title: "Cart empty",
        description: "Add products before checkout.",
        variant: "destructive",
      });
      return;
    }

    const safeItems = cartItems.filter((i) => i?.variant?.id);

    if (safeItems.length === 0) {
      toast({
        title: "Cart error",
        description: "Cart is corrupted. Please refresh.",
        variant: "destructive",
      });
      return;
    }

    navigate("/checkout");
    setIsCartOpen(false);
  }, [cartItems, navigate, setIsCartOpen, toast]);

  const subtotal = getCartTotal();
  const total = subtotal + DELIVERY_FEE;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
        >
          <motion.div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-zinc-900 text-white shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h2 className="text-xl font-bold tracking-widest">
                ASTRA CART
              </h2>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(false)}
              >
                <X />
              </Button>
            </div>

            {/* ITEMS */}
            <div className="flex-grow p-6 overflow-y-auto space-y-4">
              {!cartItems || cartItems.length === 0 ? (
                <div className="text-center text-zinc-400 flex flex-col items-center justify-center h-full">
                  <ShoppingCartIcon className="h-14 w-14 mb-3 opacity-40" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                cartItems
                  .filter((item) => item?.variant)
                  .map((item, index) => (
                    <div
                      key={item?.variant?.id || index}
                      className="flex gap-4 bg-zinc-800/60 p-4 rounded-xl border border-zinc-700"
                    >
                      <img
                        src={item?.image || PLACEHOLDER}
                        className="w-20 h-20 object-cover rounded-lg bg-zinc-700"
                        alt={item?.title || "product"}
                        onError={(e) => {
                          e.target.src = PLACEHOLDER;
                        }}
                      />

                      <div className="flex-grow">
                        <h3 className="font-semibold text-sm">
                          {item?.title || "ASTRA ITEM"}
                        </h3>

                        <p className="text-xs text-zinc-400">
                          {item?.variant?.title || ""}
                        </p>

                        <p className="text-sm font-bold mt-1">
                          {item?.variant?.price_formatted ||
                            item?.variant?.sale_price_formatted ||
                            "0 DT"}
                        </p>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-400 h-6"
                          onClick={() =>
                            removeFromCart(item?.variant?.id)
                          }
                        >
                          Remove
                        </Button>

                        <div className="flex items-center border border-zinc-700 rounded-lg">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                              updateQuantity(
                                item?.variant?.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                          >
                            <Minus className="h-3 w-3" />
                          </Button>

                          <span className="px-3 text-sm">
                            {item.quantity}
                          </span>

                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                              updateQuantity(
                                item?.variant?.id,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>

            {/* FOOTER */}
            {cartItems && cartItems.length > 0 && (
              <div className="p-6 border-t border-zinc-800">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span className="font-bold">
                    {(subtotal / 100).toFixed(2)} DT
                  </span>
                </div>

                <div className="flex justify-between mb-4 text-sm text-zinc-400">
                  <span>Delivery</span>
                  <span>
                    {(DELIVERY_FEE / 100).toFixed(2)} DT
                  </span>
                </div>

                <div className="flex justify-between mb-4">
                  <span>Total</span>
                  <span className="font-bold">
                    {(total / 100).toFixed(2)} DT
                  </span>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full bg-white text-black font-bold"
                >
                  Proceed to checkout
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCart;