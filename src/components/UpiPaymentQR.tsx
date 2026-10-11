import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { formatINR } from '../utils/formatCurrency';
import { Check, Copy, ExternalLink, ShieldCheck, Smartphone } from 'lucide-react';

interface UpiPaymentQRProps {
  amount: number;
  orderRef?: string;
  onPaymentVerified: (utr: string) => void;
}

export const UpiPaymentQR: React.FC<UpiPaymentQRProps> = ({
  amount,
  orderRef = 'LUM-ONLINE',
  onPaymentVerified
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const upiId = 'nilanshithiske21@okicici';
  const payeeName = 'Nilanshi Thiske';
  const [copied, setCopied] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Standard UPI deep link payload
  const upiPayload = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    payeeName
  )}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(`Lumina Smart Home Order ${orderRef}`)}`;

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        upiPayload,
        {
          width: 250,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff'
          },
          errorCorrectionLevel: 'H'
        },
        (error) => {
          if (error) console.error('Error generating UPI QR:', error);
        }
      );
    }
  }, [upiPayload]);

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onPaymentVerified(utrNumber || `UPI-${Math.floor(100000000000 + Math.random() * 900000000000)}`);
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-4">
      {/* Visual UPI Card styled faithfully to the user's uploaded image */}
      <div className="w-full max-w-sm rounded-3xl p-6 bg-[#f4f7fb] text-slate-900 shadow-2xl border border-slate-200 flex flex-col items-center relative animate-fade-in">
        
        {/* Top Header: Avatar & Name */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#1a73e8] text-white font-bold flex items-center justify-center text-lg shadow-sm">
            N
          </div>
          <div className="text-left">
            <h4 className="text-base font-bold text-slate-900 tracking-tight leading-tight">
              {payeeName}
            </h4>
            <div className="text-[11px] text-slate-500 font-medium">
              Verified Merchant Gateway
            </div>
          </div>
        </div>

        {/* QR Code White Card with centered GPay Badge */}
        <div className="relative p-3 bg-white rounded-2xl shadow-md border border-slate-100 flex flex-col items-center">
          <canvas ref={canvasRef} className="rounded-xl w-[220px] h-[220px]" />

          {/* Centered Google Pay / UPI icon pill overlay matching user image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-10 h-10 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center p-1.5">
              {/* Colorful Google Pay G-Pill SVG */}
              <svg viewBox="0 0 48 48" className="w-full h-full">
                <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
                <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13.5 24 13.5c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.6 7.3 6.3 14.7z"/>
                <path fill="#FBBC05" d="M24 46c5.5 0 10.4-1.9 14.2-5.1l-6.8-5.6c-2 1.4-4.6 2.2-7.4 2.2-6 0-10.7-3.2-11.8-7.6l-7 5.4C8.6 41.5 15.7 46 24 46z"/>
                <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-1.1 3.5-3.5 6.4-6.6 8.4l6.8 5.6C40.2 38.6 44.5 30.7 44.5 20z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* UPI ID string */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-700 font-mono">
          <span>UPI ID:</span>
          <span className="font-bold text-slate-900 select-all">{upiId}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="p-1 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            title="Copy UPI ID"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Scan to pay text */}
        <div className="text-xs text-slate-500 mt-2 font-medium">
          Scan to pay with any UPI app
        </div>

        {/* Amount to pay badge */}
        <div className="mt-3 px-4 py-1.5 rounded-full bg-slate-900 text-white font-mono font-bold text-sm tracking-wide">
          Amount: {formatINR(amount)}
        </div>
      </div>

      {/* Quick Action buttons */}
      <div className="w-full max-w-sm space-y-3 text-xs">
        {/* Direct UPI Intent Link for mobile / apps */}
        <a
          href={upiPayload}
          className="w-full py-3 px-4 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/15 font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <Smartphone className="w-4 h-4 text-amber-400" />
          <span>Pay via GPay / PhonePe / Paytm App</span>
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
        </a>

        {/* UTR reference input & confirmation */}
        <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-2 text-left">
          <label className="block text-[11px] text-slate-400 font-medium">
            UPI Ref / UTR Number (Optional, for instant reconciliation)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={utrNumber}
              onChange={(e) => setUtrNumber(e.target.value)}
              placeholder="e.g. 429104928102"
              className="flex-1 px-3 py-2 bg-white/[0.05] border border-white/10 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-amber-400"
            />
            <button
              type="button"
              onClick={handleVerify}
              disabled={isVerifying}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              {isVerifying ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Confirm UPI Paid</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Instant NPCI UPI settlement to {upiId}</span>
        </div>
      </div>
    </div>
  );
};
