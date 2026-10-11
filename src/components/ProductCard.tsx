import React from 'react';
import { Product } from '../types';
import { formatINR } from '../utils/formatCurrency';
import { Plus, Check, Star, Zap, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isInCart: boolean;
  isWishlisted?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isInCart,
  isWishlisted = false,
  onToggleWishlist
}) => {
  return (
    <div 
      className="group relative flex flex-col rounded-2xl bg-slate-900/40 border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl overflow-hidden cursor-pointer"
      onClick={() => onSelect(product)}
    >
      {/* Visual Image Container (65%-70% of upper visual weight) */}
      <div className="relative aspect-[4/3] w-full bg-slate-950 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

        {/* Quiet status tag (Single unboxed text tag, NO badge spam) */}
        <div className="absolute top-3 left-3 text-[11px] font-medium text-slate-300 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
          {product.isNew ? 'New Release' : product.inStock ? 'Ready to Ship' : 'Limited Allocation'}
        </div>

        {/* Heart Wishlist Button */}
        {onToggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all active:scale-90 cursor-pointer z-10 border ${
              isWishlisted
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 hover:bg-rose-500/30'
                : 'bg-black/50 border-white/10 text-slate-300 hover:text-white hover:bg-black/70'
            }`}
            aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
            title={isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
          >
            <Heart className={`w-4 h-4 transition-transform ${isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : ''}`} />
          </button>
        )}

        {/* Quick Add Button on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg transition-transform active:scale-95 cursor-pointer z-10"
          aria-label={`Add ${product.name} to cart`}
          title="Quick add to cart"
        >
          {isInCart ? <Check className="w-4 h-4 text-slate-950" /> : <Plus className="w-4 h-4 text-slate-950" />}
        </button>
      </div>

      {/* Product Content Information */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category & Ecosystem unboxed text with typographic dot */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
          <span className="uppercase tracking-wider text-[11px] font-semibold text-amber-400/90">
            {product.categoryLabel}
          </span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-[11px] text-slate-300 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" />
            {product.protocol}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors line-clamp-1 mb-1">
          {product.name}
        </h3>

        {/* Short Tagline */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4 flex-1">
          {product.tagline}
        </p>

        {/* Footer: Price baseline & reviews rating */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-white tabular-nums">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through tabular-nums">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-300">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-semibold tabular-nums">{product.rating}</span>
            <span className="text-slate-500 tabular-nums">({product.reviewsCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
