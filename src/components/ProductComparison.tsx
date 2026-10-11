import React from 'react';
import { Product } from '../types';
import { formatINR } from '../utils/formatCurrency';
import { X, Check, Minus, ShoppingBag, Zap, ShieldCheck } from 'lucide-react';

interface ProductComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemoveProduct: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductComparison: React.FC<ProductComparisonProps> = ({
  isOpen,
  onClose,
  products,
  onRemoveProduct,
  onAddToCart
}) => {
  if (!isOpen || products.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-5xl bg-[#11141a] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Hardware Comparison Matrix</span>
              <span className="text-xs font-mono text-amber-400 font-normal">({products.length} devices)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Side-by-side technical specification, Matter compatibility and hardware warranty analysis.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="flex-1 overflow-x-auto p-6 sm:p-8">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 pr-6 font-semibold text-slate-400 w-44">Device</th>
                {products.map((prod) => (
                  <th key={prod.id} className="py-4 px-4 align-top min-w-[220px]">
                    <div className="relative p-4 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                      <button
                        onClick={() => onRemoveProduct(prod.id)}
                        className="absolute top-2 right-2 p-1 text-slate-500 hover:text-rose-400"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-16 h-16 rounded-lg object-cover bg-slate-900 mb-3"
                      />

                      <div className="font-bold text-white text-sm line-clamp-1 mb-1">{prod.name}</div>
                      <div className="text-xs font-mono text-amber-400 font-bold mb-3">{formatINR(prod.price)}</div>

                      <button
                        onClick={() => onAddToCart(prod)}
                        className="w-full py-2 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-white/[0.06] text-slate-300">
              <tr>
                <td className="py-3.5 pr-6 font-semibold text-slate-400">Category</td>
                {products.map((prod) => (
                  <td key={prod.id} className="py-3.5 px-4 font-medium text-white">{prod.categoryLabel}</td>
                ))}
              </tr>

              <tr>
                <td className="py-3.5 pr-6 font-semibold text-slate-400">Matter Certified</td>
                {products.map((prod) => (
                  <td key={prod.id} className="py-3.5 px-4">
                    {prod.ecosystems.includes('Matter') ? (
                      <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <Check className="w-4 h-4" /> Matter 1.3 Certified
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Minus className="w-4 h-4" /> Proprietary
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3.5 pr-6 font-semibold text-slate-400">Wireless Protocol</td>
                {products.map((prod) => (
                  <td key={prod.id} className="py-3.5 px-4 font-mono text-amber-300">{prod.protocol}</td>
                ))}
              </tr>

              <tr>
                <td className="py-3.5 pr-6 font-semibold text-slate-400">Ecosystems Supported</td>
                {products.map((prod) => (
                  <td key={prod.id} className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {prod.ecosystems.map((eco) => (
                        <span key={eco} className="px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 text-[11px]">
                          {eco}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3.5 pr-6 font-semibold text-slate-400">Power Source</td>
                {products.map((prod) => (
                  <td key={prod.id} className="py-3.5 px-4">{prod.specs.power}</td>
                ))}
              </tr>

              <tr>
                <td className="py-3.5 pr-6 font-semibold text-slate-400">Hardware Warranty</td>
                {products.map((prod) => (
                  <td key={prod.id} className="py-3.5 px-4 font-medium text-white">{prod.specs.warranty}</td>
                ))}
              </tr>

              <tr>
                <td className="py-3.5 pr-6 font-semibold text-slate-400">Dimensions</td>
                {products.map((prod) => (
                  <td key={prod.id} className="py-3.5 px-4 font-mono text-slate-400">{prod.specs.dimensions}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
