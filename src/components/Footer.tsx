import React, { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, Check, ArrowRight, Download } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenProfile: (tab?: 'orders' | 'addresses' | 'payments' | 'overview') => void;
  onOpenDownloadCode?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenProfile, onOpenDownloadCode }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-[#0a0c0f] border-t border-white/[0.08] text-xs text-slate-400">
      {/* 3 Pillar Value Propositions */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 border-b border-white/[0.06]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-white/[0.04] text-amber-400 border border-white/10 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm mb-1">Local Privacy First</div>
              <p className="text-slate-400 leading-relaxed text-xs">
                Zero required cloud subscriptions. Thread and Matter local automations execute inside your residence within milliseconds.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-white/[0.04] text-amber-400 border border-white/10 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm mb-1">Carbon-Neutral Delivery</div>
              <p className="text-slate-400 leading-relaxed text-xs">
                Every shipment is 100% carbon-offset and packaged in recyclable custom pulp molded inserts.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-white/[0.04] text-amber-400 border border-white/10 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm mb-1">30-Day In-Home Guarantee</div>
              <p className="text-slate-400 leading-relaxed text-xs">
                Test any Lumina device in your space. If the ecosystem doesn&apos;t elevate your everyday living, return with free prepaid pickup.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Link Directory */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <div className="text-lg font-bold text-white tracking-tight">Lumina Home</div>
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              Industrial smart living hardware engineered for Matter 1.3, Apple HomeKit, Google Home, and Alexa.
            </p>
            <div className="text-slate-500 font-mono text-[11px] pt-2">
              San Francisco · Copenhagen · Tokyo
            </div>
          </div>

          {/* Hardware */}
          <div className="space-y-2.5">
            <div className="font-semibold text-white text-xs uppercase tracking-wider">Hardware</div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigateSection('collection')} className="hover:text-white transition-colors cursor-pointer">
                  Climate Control
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('collection')} className="hover:text-white transition-colors cursor-pointer">
                  Circadian Lighting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('collection')} className="hover:text-white transition-colors cursor-pointer">
                  4K AI Security Sentry
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('collection')} className="hover:text-white transition-colors cursor-pointer">
                  Smart Deadbolts &amp; Locks
                </button>
              </li>
            </ul>
          </div>

          {/* Account & Orders */}
          <div className="space-y-2.5">
            <div className="font-semibold text-white text-xs uppercase tracking-wider">Account</div>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onOpenProfile('orders')} className="hover:text-white transition-colors cursor-pointer">
                  Track Existing Order
                </button>
              </li>
              <li>
                <button onClick={() => onOpenProfile('addresses')} className="hover:text-white transition-colors cursor-pointer">
                  Manage Saved Addresses
                </button>
              </li>
              <li>
                <button onClick={() => onOpenProfile('payments')} className="hover:text-white transition-colors cursor-pointer">
                  Payment Methods
                </button>
              </li>
              <li>
                <button onClick={() => onOpenProfile('overview')} className="hover:text-white transition-colors cursor-pointer">
                  Lumina Black Rewards
                </button>
              </li>
              <li>
                <a
                  href="/lumina-smart-home-code.zip"
                  download="lumina-smart-home-code.zip"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Code (.ZIP)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Firmware & Updates */}
          <div className="space-y-2.5">
            <div className="font-semibold text-white text-xs uppercase tracking-wider">Firmware Dispatch</div>
            <p className="text-[11px] text-slate-400">
              Receive updates on Matter standard releases and architectural releases.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-1.5">
              <div className="flex gap-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 rounded-lg bg-white/[0.05] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shrink-0 cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {isSubscribed && (
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Subscribed to firmware releases.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Lumina Hardware Corp. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Notice</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Hardware Sale</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400 cursor-pointer">Matter 1.3 Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
