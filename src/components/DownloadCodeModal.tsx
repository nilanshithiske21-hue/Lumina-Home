import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileCode, 
  FolderArchive, 
  Check, 
  Copy, 
  Terminal, 
  Layers, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface DownloadCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadCodeModal: React.FC<DownloadCodeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(id);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const fileManifest = [
    { name: 'src/App.tsx', desc: 'Main state manager, routing, cart & filter controls' },
    { name: 'src/components/CheckoutModal.tsx', desc: 'UPI QR code gateway & multi-step checkout flow' },
    { name: 'src/components/UpiPaymentQR.tsx', desc: 'Google Pay UPI QR code generator (INR payments)' },
    { name: 'src/components/InteractiveRoomVisualizer.tsx', desc: '3D-like room lighting & scene simulator' },
    { name: 'src/components/InteractiveDeviceDemo.tsx', desc: 'Live thermostat, CCTV & lock interactive demos' },
    { name: 'src/components/ProfileModal.tsx', desc: 'User profile, order tracking & wishlist' },
    { name: 'src/data/products.ts', desc: 'Smart home product database with INR pricing' },
    { name: 'src/assets/images/*', desc: 'Architectural smart home product photography' },
    { name: 'README.md', desc: 'Complete setup guide and npm scripts' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#11141a] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-400/20">
              <FolderArchive className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">Download Source Code</h2>
                <span className="text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  ZIP · 2.8 MB
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Complete, production-ready React 19 + TypeScript + Tailwind project
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[580px] overflow-y-auto">
          {/* Direct Download Button */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-transparent border border-amber-400/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>lumina-smart-home-code.zip</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Includes all 32 source files, types, mock database, high-res assets, and config.
              </p>
            </div>

            <a
              href="/lumina-smart-home-code.zip"
              download="lumina-smart-home-code.zip"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md shadow-amber-400/20 shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download (.ZIP)</span>
            </a>
          </div>

          {/* Quick Setup Instructions */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              <span>How to Run Locally</span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between gap-3">
                <div className="text-slate-300 overflow-x-auto">
                  <span className="text-slate-500 mr-2">1.</span>
                  unzip lumina-smart-home-code.zip && cd lumina-smart-home-code
                </div>
                <button
                  onClick={() => handleCopy('unzip lumina-smart-home-code.zip && cd lumina-smart-home-code', 'step1')}
                  className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Copy command"
                >
                  {copiedStep === 'step1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between gap-3">
                <div className="text-slate-300 overflow-x-auto">
                  <span className="text-slate-500 mr-2">2.</span>
                  npm install
                </div>
                <button
                  onClick={() => handleCopy('npm install', 'step2')}
                  className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Copy command"
                >
                  {copiedStep === 'step2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-between gap-3">
                <div className="text-slate-300 overflow-x-auto">
                  <span className="text-slate-500 mr-2">3.</span>
                  npm run dev
                </div>
                <button
                  onClick={() => handleCopy('npm run dev', 'step3')}
                  className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
                  title="Copy command"
                >
                  {copiedStep === 'step3' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Key Files Included */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Key Architecture & Components Included</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {fileManifest.map((file, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-center">
                  <div className="font-mono text-amber-300 font-semibold text-[11px] flex items-center gap-1.5">
                    <FileCode className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <div className="text-slate-400 text-[11px] mt-0.5 truncate">
                    {file.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-950/80 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-400">
            Node.js v18+ required · Clean TypeScript compilation
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Close
            </button>
            <a
              href="/lumina-smart-home-code.zip"
              download="lumina-smart-home-code.zip"
              className="px-4 py-2 rounded-lg bg-white hover:bg-amber-100 text-slate-950 font-bold transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get ZIP (2.8 MB)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
