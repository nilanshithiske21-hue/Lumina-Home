import React, { useState } from 'react';
import { Product } from '../types';
import { 
  Thermometer, 
  Flame, 
  Snowflake, 
  Leaf, 
  Sun, 
  ShieldCheck, 
  Video, 
  Lock, 
  Unlock, 
  Volume2, 
  Play, 
  Pause,
  Eye,
  KeyRound
} from 'lucide-react';

interface InteractiveDeviceDemoProps {
  product: Product;
}

export const InteractiveDeviceDemo: React.FC<InteractiveDeviceDemoProps> = ({ product }) => {
  const type = product.interactiveDemo?.type || 'thermostat';

  // State for Thermostat
  const [temp, setTemp] = useState<number>(product.interactiveDemo?.defaultState?.temp || 72);
  const [climateMode, setClimateMode] = useState<'heat' | 'cool' | 'eco'>('heat');

  // State for Smart Light
  const [lightColor, setLightColor] = useState<string>(product.interactiveDemo?.defaultState?.color || '#f59e0b');
  const [brightness, setBrightness] = useState<number>(product.interactiveDemo?.defaultState?.brightness || 85);

  // State for Camera
  const [isMotionTriggered, setIsMotionTriggered] = useState<boolean>(false);
  const [nightVision, setNightVision] = useState<boolean>(false);

  // State for Lock
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [passcodeNotice, setPasscodeNotice] = useState<string>('');

  // State for Audio
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(65);

  // RENDER THERMOSTAT DEMO
  if (type === 'thermostat') {
    return (
      <div className="p-6 rounded-2xl bg-black/60 border border-white/10 flex flex-col items-center justify-center text-center">
        <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-4">
          Tactile Titanium OLED Dial Simulator
        </div>

        {/* Circular Dial Representation */}
        <div className="relative w-48 h-48 rounded-full border-4 border-slate-700 bg-slate-950 p-2 shadow-2xl flex flex-col items-center justify-center transition-colors">
          {/* Subtle knurled ring texture */}
          <div className="absolute inset-1 rounded-full border border-dashed border-slate-600/60 pointer-events-none" />

          {/* Mode Icon */}
          <div className="mb-1">
            {climateMode === 'heat' && <Flame className="w-5 h-5 text-amber-400 animate-pulse" />}
            {climateMode === 'cool' && <Snowflake className="w-5 h-5 text-sky-400 animate-pulse" />}
            {climateMode === 'eco' && <Leaf className="w-5 h-5 text-emerald-400" />}
          </div>

          {/* Temperature Readout */}
          <div className="text-5xl font-extrabold text-white font-mono tracking-tight tabular-nums">
            {temp}°
          </div>
          <div className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider font-mono">
            {climateMode === 'heat' ? 'HEATING TO' : climateMode === 'cool' ? 'COOLING TO' : 'ECO SAVING'} {temp}°F
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
            ROOM: 71°F · 45% HUMIDITY
          </div>
        </div>

        {/* Temperature adjusters */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={() => setTemp((t) => Math.max(60, t - 1))}
            className="w-10 h-10 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center justify-center font-bold text-lg cursor-pointer transition-colors active:scale-95"
            aria-label="Decrease temperature"
          >
            -
          </button>
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.05] rounded-xl border border-white/10">
            <button
              onClick={() => setClimateMode('heat')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                climateMode === 'heat' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Heat
            </button>
            <button
              onClick={() => setClimateMode('cool')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                climateMode === 'cool' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Cool
            </button>
            <button
              onClick={() => setClimateMode('eco')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                climateMode === 'eco' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Eco
            </button>
          </div>
          <button
            onClick={() => setTemp((t) => Math.min(85, t + 1))}
            className="w-10 h-10 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center justify-center font-bold text-lg cursor-pointer transition-colors active:scale-95"
            aria-label="Increase temperature"
          >
            +
          </button>
        </div>
      </div>
    );
  }

  // RENDER LIGHTING DEMO
  if (type === 'light') {
    return (
      <div className="p-6 rounded-2xl bg-black/60 border border-white/10 flex flex-col items-center justify-center text-center">
        <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-4">
          Atmospheric Circadian Luminescence Simulator
        </div>

        {/* Lamp preview with live color glow */}
        <div className="relative w-full max-w-xs h-40 rounded-xl overflow-hidden flex items-center justify-center bg-slate-950 border border-white/10 mb-5">
          <div 
            className="absolute inset-0 transition-all duration-300 blur-2xl"
            style={{ 
              backgroundColor: lightColor, 
              opacity: (brightness / 100) * 0.7 
            }}
          />
          <div 
            className="w-6 h-28 rounded-full z-10 transition-all duration-300 shadow-2xl border border-white/20"
            style={{ 
              backgroundColor: lightColor,
              boxShadow: `0 0 ${brightness * 0.6}px ${lightColor}`
            }}
          />
        </div>

        {/* Color presets */}
        <div className="flex items-center gap-3 mb-4">
          {[
            { label: 'Candlelight 1800K', hex: '#ea580c' },
            { label: 'Warm Amber 2700K', hex: '#f59e0b' },
            { label: 'Golden Hour', hex: '#eab308' },
            { label: 'Studio Neutral 4000K', hex: '#38bdf8' },
            { label: 'Circadian Violet', hex: '#a855f7' }
          ].map((c) => (
            <button
              key={c.hex}
              onClick={() => setLightColor(c.hex)}
              className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                lightColor === c.hex ? 'scale-120 border-white' : 'border-transparent opacity-80 hover:opacity-100'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.label}
            />
          ))}
        </div>

        {/* Brightness Slider */}
        <div className="w-full max-w-xs space-y-1.5 text-xs text-left">
          <div className="flex justify-between text-slate-300">
            <span className="flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Dimmer</span>
            </span>
            <span className="font-mono text-white tabular-nums">{brightness}%</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full accent-amber-400 bg-slate-800 cursor-pointer h-1.5 rounded-lg"
          />
        </div>
      </div>
    );
  }

  // RENDER CAMERA DEMO
  if (type === 'camera') {
    return (
      <div className="p-6 rounded-2xl bg-black/60 border border-white/10 flex flex-col">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5" />
            <span>4K Optical Sentry Feed</span>
          </div>
          <div className="font-mono text-emerald-400 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>ENCRYPTED LOCAL</span>
          </div>
        </div>

        {/* Video feed simulation container */}
        <div className={`relative aspect-video rounded-xl overflow-hidden border border-white/15 mb-4 flex items-center justify-center transition-all ${
          nightVision ? 'bg-slate-900 filter saturate-0 contrast-125' : 'bg-slate-950'
        }`}>
          <img
            src="/src/assets/images/hero_smart_home_1791745956437.jpg"
            alt="Camera simulation feed"
            className="w-full h-full object-cover opacity-75"
          />

          {/* Timecode overlay */}
          <div className="absolute top-3 left-3 text-[11px] font-mono text-white/90 bg-black/60 px-2 py-0.5 rounded">
            LUMINA CAM-01 · 4K HDR 30FPS
          </div>

          {/* Motion detection bounding box simulation */}
          {isMotionTriggered && (
            <div className="absolute inset-14 border-2 border-amber-400 rounded-lg pointer-events-none flex flex-col justify-between p-2">
              <span className="text-[10px] font-mono bg-amber-400 text-slate-950 px-1 font-bold w-fit rounded">
                PERSON RECOGNIZED: ALEX (99.4%)
              </span>
              <span className="text-[10px] font-mono text-amber-300 self-end">
                MMWAVE TRACKING
              </span>
            </div>
          )}
        </div>

        {/* Camera toggles */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <button
            onClick={() => setIsMotionTriggered(!isMotionTriggered)}
            className={`py-2 px-3 rounded-lg border font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              isMotionTriggered
                ? 'bg-amber-400 text-slate-950 border-amber-400 font-semibold'
                : 'bg-white/[0.06] hover:bg-white/[0.1] text-white border-white/10'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isMotionTriggered ? 'Motion Active' : 'Simulate Motion'}</span>
          </button>

          <button
            onClick={() => setNightVision(!nightVision)}
            className={`py-2 px-3 rounded-lg border font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              nightVision
                ? 'bg-sky-500 text-slate-950 border-sky-500 font-semibold'
                : 'bg-white/[0.06] hover:bg-white/[0.1] text-white border-white/10'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{nightVision ? 'Color Night Vision' : 'IR Night Vision'}</span>
          </button>
        </div>
      </div>
    );
  }

  // RENDER SMART LOCK DEMO
  if (type === 'lock') {
    return (
      <div className="p-6 rounded-2xl bg-black/60 border border-white/10 flex flex-col items-center justify-center text-center">
        <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-4">
          Apple Home Key &amp; Biometric Latch
        </div>

        {/* Lock visual circle */}
        <button
          onClick={() => {
            setIsLocked(!isLocked);
            setPasscodeNotice(isLocked ? 'Unlocked via iPhone Home Key' : 'Deadbolt Locked');
            setTimeout(() => setPasscodeNotice(''), 2200);
          }}
          className={`w-32 h-32 rounded-full border-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 active:scale-95 shadow-2xl ${
            isLocked
              ? 'bg-emerald-950/40 border-emerald-500 text-emerald-400'
              : 'bg-amber-950/40 border-amber-500 text-amber-400'
          }`}
          aria-label={isLocked ? 'Unlock Smart Lock' : 'Lock Smart Lock'}
        >
          {isLocked ? <Lock className="w-10 h-10 mb-1" /> : <Unlock className="w-10 h-10 mb-1" />}
          <span className="text-xs font-bold font-mono tracking-wider">
            {isLocked ? 'SECURED' : 'UNLOCKED'}
          </span>
        </button>

        <div className="text-xs text-slate-300 mt-4">
          Tap latch above to simulate NFC Home Key unlocking
        </div>

        {passcodeNotice && (
          <div className="text-xs font-mono text-amber-300 mt-2 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/20">
            {passcodeNotice}
          </div>
        )}
      </div>
    );
  }

  // RENDER AUDIO DEMO
  return (
    <div className="p-6 rounded-2xl bg-black/60 border border-white/10 flex flex-col items-center justify-center text-center">
      <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-4">
        Lossless Spatial Sound Demo
      </div>

      <div className="w-full max-w-xs p-4 rounded-xl bg-slate-900 border border-white/10 mb-4 flex items-center gap-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center cursor-pointer shrink-0 transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
        </button>
        <div className="text-left flex-1 min-w-0">
          <div className="text-xs font-semibold text-white truncate">Ambient Nocturne (Dolby Atmos)</div>
          <div className="text-[11px] text-slate-400">24-bit / 96kHz Lossless AirPlay</div>
        </div>
        <div className="flex items-end gap-0.5 h-6">
          {[40, 75, 55, 90, 65, 80].map((h, i) => (
            <span
              key={i}
              className={`w-1 bg-amber-400 rounded-full transition-all duration-300 ${
                isPlaying ? 'opacity-100' : 'opacity-30'
              }`}
              style={{ height: isPlaying ? `${h}%` : '20%' }}
            />
          ))}
        </div>
      </div>

      <div className="w-full max-w-xs space-y-1.5 text-xs text-left">
        <div className="flex justify-between text-slate-300">
          <span className="flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Volume Output</span>
          </span>
          <span className="font-mono text-white tabular-nums">{volume}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-full accent-amber-400 bg-slate-800 cursor-pointer h-1.5 rounded-lg"
        />
      </div>
    </div>
  );
};
