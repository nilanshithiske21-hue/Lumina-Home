import React from 'react';
import { ShoppingBag, User, Sparkles, Heart, Download } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount?: number;
  onOpenCart: () => void;
  onOpenProfile: (initialTab?: 'orders' | 'addresses' | 'payments' | 'overview' | 'wishlist') => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenDownloadCode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount = 0,
  onOpenCart,
  onOpenProfile,
  onNavigateSection,
  onOpenDownloadCode,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0f1115]/85 backdrop-blur-md border-b border-white/[0.08] transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 lg:px-8 h-18">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onNavigateSection('hero')}
          className="text-xl font-bold tracking-tight text-white hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
        >
          Lumina Home
        </button>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onNavigateSection('collection')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none"
          >
            Storefront
          </button>
          <button
            onClick={() => onNavigateSection('visualizer')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 focus-visible:outline-none"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Room Studio</span>
          </button>
          <button
            onClick={() => onNavigateSection('ecosystems')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none"
          >
            Matter Ready
          </button>
          <button
            onClick={() => onOpenProfile('orders')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none"
          >
            Order Tracking
          </button>
          <button
            onClick={() => onOpenProfile('addresses')}
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none"
          >
            Saved Addresses
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action block (Download + Wishlist + Profile + Cart) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            onClick={onOpenDownloadCode}
            className="px-2.5 py-1.5 text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            title="Download complete project source code (.ZIP)"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Code .ZIP</span>
          </button>

          <button
            onClick={() => onOpenProfile('wishlist')}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer relative"
            aria-label={`Wishlist with ${wishlistCount} items`}
            title="Saved Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-rose-400 fill-rose-400' : ''}`} />
            {wishlistCount > 0 && (
              <span className="px-1.5 py-0.2 bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold rounded tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onOpenProfile('overview')}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors flex items-center gap-2 text-xs font-medium cursor-pointer"
            aria-label="User Account and Orders"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Nilanshi T.</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative px-3.5 py-2 text-xs font-medium text-slate-950 bg-white hover:bg-amber-100 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
            aria-label={`Shopping Cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-slate-950" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-amber-500 text-slate-950 text-[11px] font-bold rounded tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
