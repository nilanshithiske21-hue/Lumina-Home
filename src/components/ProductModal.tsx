import React, { useState } from 'react';
import { Product } from '../types';
import { formatINR } from '../utils/formatCurrency';
import { InteractiveDeviceDemo } from './InteractiveDeviceDemo';
import { 
  X, 
  Check, 
  ShoppingBag, 
  Star, 
  Zap, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Sliders,
  Heart
} from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedColor?: string) => void;
  onQuickCheckout: (product: Product, quantity: number, selectedColor?: string) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onQuickCheckout,
  isWishlisted = false,
  onToggleWishlist
}) => {
  if (!product) return null;

  const [activeTab, setActiveTab] = useState<'overview' | 'simulator' | 'specs'>('overview');
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors ? product.colors[0]?.name : '');
  const [isAddedToast, setIsAddedToast] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor);
    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    onQuickCheckout(product, quantity, selectedColor);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#11141a] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Buttons (Wishlist Heart + Close) */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          {onToggleWishlist && (
            <button
              onClick={() => onToggleWishlist(product)}
              className={`p-2.5 rounded-full transition-all active:scale-90 cursor-pointer border ${
                isWishlisted
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 hover:bg-rose-500/30'
                  : 'bg-black/60 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              title={isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          )}

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-black/60 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
          
          {/* Left Column: Visuals & Interactive Simulator */}
          <div className="md:col-span-6 bg-slate-950 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1.5 p-1 bg-white/[0.05] border border-white/10 rounded-xl mb-4 w-fit">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'overview' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Studio Photo
              </button>
              {product.interactiveDemo && (
                <button
                  onClick={() => setActiveTab('simulator')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'simulator' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Live Simulator</span>
                </button>
              )}
              <button
                onClick={() => setActiveTab('specs')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'specs' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                Specs Sheet
              </button>
            </div>

            {/* Display Content Based on Tab */}
            <div className="flex-1 flex items-center justify-center my-2">
              {activeTab === 'overview' && (
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
                </div>
              )}

              {activeTab === 'simulator' && (
                <div className="w-full">
                  <InteractiveDeviceDemo product={product} />
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="w-full bg-black/40 rounded-2xl border border-white/10 p-5 space-y-3 text-xs">
                  <div className="font-semibold text-white mb-2">Technical Hardware Specifications</div>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-1.5 border-b border-white/[0.06]">
                      <span className="text-slate-400 capitalize">{key}:</span>
                      <span className="font-mono text-slate-200 text-right">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Ecosystem Badges */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
              <span className="text-slate-300 font-medium">Compatible with:</span>
              {product.ecosystems.map((eco) => (
                <span key={eco} className="px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 font-medium border border-white/10">
                  {eco}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-amber-400 uppercase tracking-wider font-semibold mb-1">
                <span>{product.categoryLabel}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300 normal-case font-mono">{product.protocol}</span>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2 leading-snug">
                {product.name}
              </h2>

              {/* Price & Rating */}
              <div className="flex items-baseline justify-between mb-4 pb-4 border-b border-white/[0.08]">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-extrabold text-white tabular-nums">
                    {formatINR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-500 line-through tabular-nums">
                      {formatINR(product.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-300">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold tabular-nums">{product.rating}</span>
                  <span className="text-slate-500 tabular-nums">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Highlights List */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-semibold text-slate-300">Key Features:</div>
                {product.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Color variant picker if available */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs font-semibold text-slate-300 mb-2">
                    Finish: <span className="text-amber-400">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-2 cursor-pointer transition-all ${
                          selectedColor === c.name
                            ? 'bg-white/10 border-amber-400 text-white'
                            : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: c.hex }} />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions: Quantity + Cart + Buy Now */}
            <div className="pt-4 border-t border-white/[0.08] space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-white/15 rounded-xl bg-black/40 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg hover:bg-white/10 text-white flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono text-xs font-semibold text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
                    className="w-8 h-8 rounded-lg hover:bg-white/10 text-white flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                    isAddedToast
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/15'
                  }`}
                >
                  {isAddedToast ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                  <span>{isAddedToast ? 'Added to Cart' : `Add to Cart (${formatINR(product.price * quantity)})`}</span>
                </button>

                {/* Instant Checkout button */}
                <button
                  onClick={handleBuyNow}
                  className="py-3 px-5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-lg active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>Instant Checkout</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-slate-400 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Truck className="w-3 h-3 text-slate-400" />
                  <span>Free 2-day delivery</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <RotateCcw className="w-3 h-3 text-slate-400" />
                  <span>30-day home trial</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-slate-400" />
                  <span>3-year warranty</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
