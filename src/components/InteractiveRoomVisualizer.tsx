import React, { useState } from 'react';
import { SMART_ROOMS, PRODUCTS } from '../data/products';
import { Product } from '../types';
import { formatINR } from '../utils/formatCurrency';
import { 
  Sparkles, 
  Sun, 
  Moon, 
  Thermometer, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Check, 
  ShoppingBag,
  Sliders,
  Volume2
} from 'lucide-react';

interface InteractiveRoomVisualizerProps {
  onAddBundleToCart: (products: Product[]) => void;
  onOpenProduct: (product: Product) => void;
}

export const InteractiveRoomVisualizer: React.FC<InteractiveRoomVisualizerProps> = ({
  onAddBundleToCart,
  onOpenProduct
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string>('living-room');
  const [activePresetId, setActivePresetId] = useState<string>('evening');
  const [lightColor, setLightColor] = useState<string>('#f59e0b');
  const [lightIntensity, setLightIntensity] = useState<number>(65);
  const [targetTemp, setTargetTemp] = useState<number>(72);
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [isSecurityArmed, setIsSecurityArmed] = useState<boolean>(true);
  const [addedToast, setAddedToast] = useState<boolean>(false);

  const currentRoom = SMART_ROOMS.find((r) => r.id === selectedRoomId) || SMART_ROOMS[0];
  const roomProducts = PRODUCTS.filter((p) => currentRoom.deviceIds.includes(p.id));

  const handlePresetSelect = (preset: typeof currentRoom.presets[0]) => {
    setActivePresetId(preset.id);
    if (preset.id === 'cinema') {
      setLightColor('#ea580c');
      setLightIntensity(20);
      setTargetTemp(69);
      setIsLocked(true);
    } else if (preset.id === 'evening') {
      setLightColor('#f59e0b');
      setLightIntensity(60);
      setTargetTemp(72);
      setIsLocked(true);
    } else if (preset.id === 'energize') {
      setLightColor('#67e8f9');
      setLightIntensity(95);
      setTargetTemp(70);
    } else if (preset.id === 'sleep') {
      setLightColor('#1e1b4b');
      setLightIntensity(5);
      setTargetTemp(67);
      setIsLocked(true);
      setIsSecurityArmed(true);
    } else if (preset.id === 'sunrise') {
      setLightColor('#fbbf24');
      setLightIntensity(75);
      setTargetTemp(71);
    } else if (preset.id === 'armed') {
      setIsSecurityArmed(true);
      setIsLocked(true);
      setLightIntensity(30);
    } else if (preset.id === 'welcome') {
      setIsSecurityArmed(false);
      setIsLocked(false);
      setLightColor('#fef08a');
      setLightIntensity(90);
    }
  };

  const handleAddBundle = () => {
    onAddBundleToCart(roomProducts);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  return (
    <section id="visualizer" className="py-16 lg:py-24 bg-[#0a0c0f] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Space Studio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Simulate your intelligent home in real-time.
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Switch rooms, activate environmental scenes, and adjust lighting warmth and thermals live before ordering your room bundle.
            </p>
          </div>

          {/* Room Selector Segmented Control */}
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.05] border border-white/10 rounded-xl shrink-0 self-start md:self-auto">
            {SMART_ROOMS.map((room) => (
              <button
                key={room.id}
                onClick={() => {
                  setSelectedRoomId(room.id);
                  setActivePresetId(room.presets[0].id);
                }}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedRoomId === room.id
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                {room.name}
              </button>
            ))}
          </div>
        </div>

        {/* Studio Simulation Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Visualizer Canvas */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-white/10 bg-slate-950 relative shadow-2xl flex flex-col">
            
            {/* Viewport Frame with dynamic lighting overlay */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
              <img
                src={currentRoom.image}
                alt={currentRoom.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-700 filter brightness-95"
              />

              {/* Dynamic Ambience Glow Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none transition-all duration-500 mix-blend-color"
                style={{
                  backgroundColor: lightColor,
                  opacity: (lightIntensity / 100) * 0.38
                }}
              />

              {/* Dynamic Vignette / Mood Darkener */}
              <div 
                className="absolute inset-0 pointer-events-none transition-all duration-500 bg-radial from-transparent to-black"
                style={{
                  opacity: Math.max(0.1, (100 - lightIntensity) / 110)
                }}
              />

              {/* Live HUD telemetry pill overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <div className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 font-mono flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>THREAD MESH: LOCAL ACTIVE</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 font-mono tabular-nums text-amber-300">
                    {targetTemp}°F / {Math.round(((targetTemp - 32) * 5) / 9)}°C
                  </span>
                  <span className="px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 font-mono">
                    {lightIntensity}% LUMENS
                  </span>
                </div>
              </div>

              {/* Bottom Interactive Scene Selector Strip */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-400" />
                  <span>Atmospheric Scenes:</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {currentRoom.presets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handlePresetSelect(preset)}
                      className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                        activePresetId === preset.id
                          ? 'bg-white text-slate-950 font-semibold'
                          : 'bg-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.15]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Micro-Controls below viewport */}
            <div className="p-6 bg-slate-900/60 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
              
              {/* Lighting controls */}
              <div>
                <div className="flex items-center justify-between text-slate-300 font-medium mb-2">
                  <span className="flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Luminance Level</span>
                  </span>
                  <span className="font-mono text-white tabular-nums">{lightIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={lightIntensity}
                  onChange={(e) => setLightIntensity(Number(e.target.value))}
                  className="w-full accent-amber-400 bg-slate-800 cursor-pointer h-1.5 rounded-lg"
                />
                <div className="flex items-center gap-2 mt-3">
                  {[
                    { label: 'Candle', hex: '#ea580c' },
                    { label: 'Warm 2700K', hex: '#f59e0b' },
                    { label: 'Daylight', hex: '#38bdf8' },
                    { label: 'Cyber Violet', hex: '#818cf8' }
                  ].map((color) => (
                    <button
                      key={color.label}
                      onClick={() => setLightColor(color.hex)}
                      className={`w-6 h-6 rounded-full border transition-all cursor-pointer ${
                        lightColor === color.hex ? 'scale-110 border-white' : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>

              {/* Climate Dial Controls */}
              <div>
                <div className="flex items-center justify-between text-slate-300 font-medium mb-2">
                  <span className="flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                    <span>Target Climate</span>
                  </span>
                  <span className="font-mono text-white tabular-nums">{targetTemp}°F</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTargetTemp((t) => Math.max(62, t - 1))}
                    className="w-8 h-8 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center py-1.5 bg-black/40 rounded-lg border border-white/10 font-mono text-white font-semibold">
                    {targetTemp}°F / {Math.round(((targetTemp - 32) * 5) / 9)}°C
                  </div>
                  <button
                    onClick={() => setTargetTemp((t) => Math.min(84, t + 1))}
                    className="w-8 h-8 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Adaptive heat pump algorithm active
                </div>
              </div>

              {/* Perimeter Security / Lock status */}
              <div>
                <div className="flex items-center justify-between text-slate-300 font-medium mb-2">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Perimeter &amp; Access</span>
                  </span>
                  <span className="text-emerald-400 font-medium">Secured</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsLocked(!isLocked)}
                    className={`flex-1 py-1.5 px-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                      isLocked
                        ? 'bg-emerald-950/60 border-emerald-600/50 text-emerald-300'
                        : 'bg-amber-950/60 border-amber-600/50 text-amber-300'
                    }`}
                  >
                    {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                    <span>{isLocked ? 'Deadbolt Locked' : 'Unlocked'}</span>
                  </button>
                  
                  <button
                    onClick={() => setIsSecurityArmed(!isSecurityArmed)}
                    className={`flex-1 py-1.5 px-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                      isSecurityArmed
                        ? 'bg-sky-950/60 border-sky-600/50 text-sky-300'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isSecurityArmed ? 'AI Sentry Armed' : 'Disarmed'}</span>
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Local facial encryption enabled
                </div>
              </div>

            </div>
          </div>

          {/* Room Bundle Sidebar & Products List */}
          <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-slate-900/60 p-6 flex flex-col h-full">
            <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-1">
              Curated Architecture Bundle
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {currentRoom.name} Kit
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              {currentRoom.description}
            </p>

            {/* Included products */}
            <div className="space-y-3 mb-6">
              <div className="text-xs font-semibold text-slate-400">Included Hardware ({roomProducts.length}):</div>
              {roomProducts.map((prod) => (
                <div 
                  key={prod.id}
                  onClick={() => onOpenProduct(prod)}
                  className="p-2.5 rounded-xl bg-black/40 border border-white/[0.08] hover:border-amber-400/40 transition-colors flex items-center gap-3 cursor-pointer group"
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-12 h-12 rounded-lg object-cover bg-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-white truncate group-hover:text-amber-300 transition-colors">
                      {prod.name}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {prod.categoryLabel} · {prod.protocol}
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-white tabular-nums">
                    {formatINR(prod.price)}
                  </div>
                </div>
              ))}
            </div>

            {/* Bundle Pricing Breakdown */}
            <div className="mt-auto pt-4 border-t border-white/10 space-y-2 mb-5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Individual Retail Price:</span>
                <span className="line-through tabular-nums">{formatINR(currentRoom.bundleOriginalPrice)}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-medium">
                <span>Direct Ecosystem Bundle Savings:</span>
                <span className="tabular-nums">-{formatINR(currentRoom.savings)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-white/[0.06] text-white">
                <span className="font-semibold text-sm">Bundle Special Price:</span>
                <span className="text-xl font-bold text-amber-400 tabular-nums">
                  {formatINR(currentRoom.bundlePrice)}
                </span>
              </div>
            </div>

            {/* 1-Click Add Bundle to Cart */}
            <button
              onClick={handleAddBundle}
              className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                addedToast
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-amber-400 hover:bg-amber-300 text-slate-950 active:scale-[0.98]'
              }`}
            >
              {addedToast ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added {roomProducts.length} Devices to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Complete Room Bundle ({formatINR(currentRoom.bundlePrice)})</span>
                </>
              )}
            </button>
            <div className="text-center text-[11px] text-slate-400 mt-2.5">
              Free expedited shipping &amp; 30-day trial included
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
