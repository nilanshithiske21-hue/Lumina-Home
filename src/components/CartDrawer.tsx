import React, { useState } from 'react';
import { CartItem } from '../types';
import { formatINR } from '../utils/formatCurrency';
import { 
  X, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Truck, 
  ShoppingBag,
  Check
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  appliedCoupon: string | null;
  discountRate: number;
  onApplyCoupon: (code: string) => boolean;
  onRemoveCoupon: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedCoupon,
  discountRate,
  onApplyCoupon,
  onRemoveCoupon
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = subtotal * discountRate;
  const freeShippingThreshold = 4999;
  const isFreeShipping = subtotal >= freeShippingThreshold || appliedCoupon === 'FREESHIP';
  const shippingFee = isFreeShipping || items.length === 0 ? 0 : 299;
  const estimatedTax = (subtotal - discountAmount) * 0.18; // 18% GST
  const total = Math.max(0, subtotal - discountAmount + shippingFee + estimatedTax);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = onApplyCoupon(couponInput.trim());
    if (success) {
      setCouponSuccess(true);
      setCouponError('');
      setTimeout(() => setCouponSuccess(false), 2500);
    } else {
      setCouponError('Invalid promo code. Try SMART20 or MATTER10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#101318] border-l border-white/10 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">Your Cart</h2>
              <span className="text-xs font-mono text-slate-400 tabular-nums">
                ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          <div className="px-6 py-3.5 bg-black/40 border-b border-white/[0.06] text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                {isFreeShipping ? (
                  <span className="text-emerald-400 font-semibold">Free Carbon-Neutral Express Shipping Unlocked!</span>
                ) : (
                  <span>Add {formatINR(freeShippingThreshold - subtotal)} more for Free Shipping</span>
                )}
              </span>
              <span className="text-slate-400 font-mono text-[11px] tabular-nums">
                {formatINR(Math.min(subtotal, freeShippingThreshold))} / {formatINR(freeShippingThreshold)}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-amber-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4 text-slate-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="text-base font-semibold text-white mb-1">Your cart is empty</div>
                <p className="text-xs text-slate-400 max-w-xs mb-6">
                  Explore our Matter-certified smart home hardware or try the interactive room studio.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
                >
                  Explore Storefront
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor || ''}`}
                  className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3.5"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-slate-900 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-white truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-[11px] text-slate-400 truncate mt-0.5">
                      {item.selectedColor ? `Finish: ${item.selectedColor}` : item.product.categoryLabel}
                    </div>
                    <div className="text-xs font-bold text-amber-400 mt-1 tabular-nums">
                      {formatINR(item.product.price)}
                    </div>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center border border-white/10 rounded-lg bg-black/40">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 text-slate-300 hover:text-white flex items-center justify-center font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-medium text-white tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 text-slate-300 hover:text-white flex items-center justify-center font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-black/60 border-t border-white/10 space-y-4">
              
              {/* Promo Code Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1.5">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. SMART20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      className="w-full pl-8 pr-3 py-2 bg-white/[0.05] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {appliedCoupon && (
                  <div className="flex items-center justify-between text-xs text-emerald-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Code {appliedCoupon} active ({(discountRate * 100).toFixed(0)}% OFF)</span>
                    </span>
                    <button
                      type="button"
                      onClick={onRemoveCoupon}
                      className="text-slate-400 hover:text-rose-400 text-[11px] underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {couponError && (
                  <div className="text-[11px] text-rose-400">{couponError}</div>
                )}
                {couponSuccess && (
                  <div className="text-[11px] text-emerald-400">Coupon applied successfully!</div>
                )}
              </form>

              {/* Cost Totals */}
              <div className="space-y-2 text-xs border-t border-white/[0.06] pt-3">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-slate-200 tabular-nums">{formatINR(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-{formatINR(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span>Express Logistics</span>
                  <span className="font-mono text-slate-200 tabular-nums">
                    {shippingFee === 0 ? 'FREE' : formatINR(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>GST (18% Included)</span>
                  <span className="font-mono text-slate-200 tabular-nums">{formatINR(estimatedTax)}</span>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t border-white/10 text-white font-bold">
                  <span className="text-sm">Total</span>
                  <span className="text-xl font-mono text-amber-400 tabular-nums">{formatINR(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.98] transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit Encrypted Payment Gateway</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
