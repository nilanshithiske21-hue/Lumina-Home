import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Layers, Download } from 'lucide-react';

interface HeroProps {
  onExploreCollection: () => void;
  onOpenRoomStudio: () => void;
  onOpenDownloadCode?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCollection,
  onOpenRoomStudio,
  onOpenDownloadCode
}) => {
  return (
    <section id="hero" className="relative border-b border-white/[0.08] overflow-hidden bg-[#0f1115]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-3">
              The Architecture of Living
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-5 max-w-xl">
              Effortless intelligence for modern spaces.
            </h1>

            <p className="text-base text-slate-300 leading-relaxed mb-8 max-w-lg">
              Engineered with Matter 1.3 over Thread. Lumina devices communicate natively across Apple Home, Google Home, and Alexa with zero-latency local automation and titanium industrial design.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <button
                onClick={onExploreCollection}
                className="px-5 py-3 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-400/10 active:scale-[0.98]"
              >
                <span>Browse Smart Hardware</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenRoomStudio}
                className="px-5 py-3 text-sm font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 rounded-lg transition-colors cursor-pointer"
              >
                Interactive Room Studio
              </button>

              <a
                href="/lumina-smart-home-code.zip"
                download="lumina-smart-home-code.zip"
                className="px-4 py-3 text-sm font-semibold text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                title="Download full project code as .ZIP"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Download Code (.ZIP)</span>
              </a>
            </div>

            {/* Claim to proof strip with quantitative rigor */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-6 text-left">
              <div>
                <div className="text-xl lg:text-2xl font-bold text-white tabular-nums">48k+</div>
                <div className="text-xs text-slate-400 mt-0.5">Homes automated</div>
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-bold text-white tabular-nums">&lt;0.2s</div>
                <div className="text-xs text-slate-400 mt-0.5">Local Thread latency</div>
              </div>
              <div>
                <div className="text-xl lg:text-2xl font-bold text-white tabular-nums">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">Matter certified</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-full min-h-[380px] lg:min-h-[460px] rounded-2xl overflow-hidden border border-white/10 group bg-slate-900/60 shadow-2xl">
              <img
                src="/src/assets/images/hero_smart_home_1791745956437.jpg"
                alt="Architectural minimalist smart home living room with subtle ambient lighting"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              
              {/* Subtle architectural gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

              {/* Quiet pinned feature highlight */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-amber-400 font-medium">Featured Setup</div>
                  <div className="text-sm font-semibold text-white">Atmospheric Dusk Sequence Active</div>
                  <div className="text-xs text-slate-400 mt-0.5">Aether Dial at 72°F · Sol Horizon 2700K Glow</div>
                </div>
                <button
                  onClick={onOpenRoomStudio}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  Simulate
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Ecosystem compatibility strip */}
        <div id="ecosystems" className="mt-14 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-200 font-medium">Native Ecosystem Compatibility:</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8 font-medium text-slate-300">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Matter Standard 1.3
            </span>
            <span className="hover:text-white transition-colors">Apple Home &amp; Home Key</span>
            <span className="hover:text-white transition-colors">Google Home &amp; Fast Pair</span>
            <span className="hover:text-white transition-colors">Amazon Alexa &amp; Zigbee 3.0</span>
            <span className="hover:text-white transition-colors">Home Assistant Native</span>
          </div>
        </div>

      </div>
    </section>
  );
};
