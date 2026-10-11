import React from 'react';
import { Order } from '../types';
import { formatINR } from '../utils/formatCurrency';
import { X, Printer, Download, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';

interface OrderReceiptModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderReceiptModal: React.FC<OrderReceiptModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#0f1115] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 bg-slate-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Official Tax Invoice &amp; Receipt</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5"
              title="Print Receipt"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="p-8 space-y-6 text-xs text-slate-300">
          {/* Header Row */}
          <div className="flex justify-between items-start border-b border-white/10 pb-6">
            <div>
              <div className="text-xl font-bold text-white tracking-tight">LUMINA SMART LIVING INDIA PVT. LTD.</div>
              <div className="text-slate-400 mt-1">Level 9, Bandra-Kurla Complex (BKC)</div>
              <div className="text-slate-400">Mumbai, Maharashtra 400051</div>
              <div className="text-slate-500 font-mono text-[11px] mt-1">GSTIN: 27AABCL1920L1Z9 · CIN: U72900MH2024PTC392819</div>
            </div>

            <div className="text-right">
              <div className="font-mono font-bold text-base text-amber-400">{order.orderNumber}</div>
              <div className="text-slate-400 mt-1">Date: {order.date}</div>
              <div className="text-emerald-400 font-semibold mt-1">Payment Status: Authorized (Paid)</div>
            </div>
          </div>

          {/* Shipping & Billing Information */}
          <div className="grid grid-cols-2 gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                Billed &amp; Shipped To:
              </div>
              <div className="font-bold text-white">{order.shippingAddress.fullName}</div>
              <div>{order.shippingAddress.street} {order.shippingAddress.apt}</div>
              <div>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zipCode}</div>
              <div>{order.shippingAddress.country}</div>
              <div className="text-slate-500 font-mono mt-1">{order.shippingAddress.phone}</div>
            </div>

            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                Shipping &amp; Logistics:
              </div>
              <div className="font-bold text-white">{order.carrier}</div>
              <div className="font-mono text-amber-300">AWB Tracking: {order.trackingNumber}</div>
              <div className="text-slate-400 mt-1">Est. Delivery: {order.estimatedDelivery}</div>
              <div className="text-slate-400">
                Payment: {order.paymentMethod.type === 'upi_qr' ? 'UPI (Google Pay to nilanshithiske21@okicici)' : order.paymentMethod.type.toUpperCase()}{' '}
                {order.paymentMethod.last4 ? `(•••• ${order.paymentMethod.last4})` : ''}
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="space-y-3 pb-6 border-b border-white/10">
            <div className="grid grid-cols-12 font-semibold text-slate-400 border-b border-white/[0.06] pb-2 text-[11px] uppercase">
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-center">Unit Price</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Amount</div>
            </div>

            {order.items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 items-center py-1.5">
                <div className="col-span-6">
                  <div className="font-semibold text-white">{item.name}</div>
                  <div className="text-[11px] text-slate-500">{item.selectedColor ? `Finish: ${item.selectedColor}` : 'Standard Edition'}</div>
                </div>
                <div className="col-span-2 text-center font-mono tabular-nums">{formatINR(item.price)}</div>
                <div className="col-span-2 text-center font-mono tabular-nums">{item.quantity}</div>
                <div className="col-span-2 text-right font-mono font-semibold text-white tabular-nums">
                  {formatINR(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Totals Breakdown */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="font-mono text-white tabular-nums">{formatINR(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Promotional Discount:</span>
                  <span className="font-mono tabular-nums">-{formatINR(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>Logistics &amp; Insurance:</span>
                <span className="font-mono text-white tabular-nums">
                  {order.shipping === 0 ? 'FREE' : formatINR(order.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Integrated GST (18% Included):</span>
                <span className="font-mono text-white tabular-nums">{formatINR(order.tax)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-white/10 text-white font-bold text-sm">
                <span>Total Paid:</span>
                <span className="font-mono text-amber-400 text-base tabular-nums">{formatINR(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Footer certification */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cryptographically verified payment receipt. Lumina 30-Day Guarantee.</span>
            </div>
            <div>Page 1 of 1</div>
          </div>
        </div>
      </div>
    </div>
  );
};
