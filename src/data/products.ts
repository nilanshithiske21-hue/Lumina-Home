import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'lumina-thermostat-pro',
    name: 'Aether Dial Smart Thermostat',
    tagline: 'Precision micro-climate control with knurled aerospace titanium dial & Matter over Thread.',
    category: 'climate',
    categoryLabel: 'Climate Control',
    price: 19999,
    originalPrice: 22999,
    rating: 4.9,
    reviewsCount: 342,
    inStock: true,
    stockCount: 24,
    isFeatured: true,
    isNew: true,
    image: '/src/assets/images/smart_thermostat_1791745974825.jpg',
    ecosystems: ['Matter', 'Apple Home', 'Google Home', 'Alexa'],
    protocol: 'Matter over Thread',
    specs: {
      power: '24V C-Wire with Power Extender included',
      connectivity: 'Wi-Fi 6 (802.11ax) & Thread Radio',
      protocol: 'Matter 1.3 / Thread Border Router',
      dimensions: '84mm diameter × 26mm depth',
      warranty: '3-Year Limited Hardware',
      range: 'Up to 2,500 sq ft mesh coverage',
      colorTemp: 'True-Black OLED circular touch matrix'
    },
    description: 'The Aether Dial combines tactile knurled titanium craftsmanship with algorithmic home heating and cooling. With native Matter over Thread connectivity, it adjusts room temperatures locally with sub-second response times without depending on cloud servers.',
    highlights: [
      'Self-learning heating & cooling scheduler saves up to 23% energy',
      'Matter over Thread works locally across Apple, Google, and Alexa',
      'Dual-zone occupancy detection with precision mmWave radar',
      'Knurled titanium rotary dial with crisp haptic feedback'
    ],
    colors: [
      { name: 'Titanium Graphite', hex: '#374151' },
      { name: 'Brushed Silver', hex: '#d1d5db' },
      { name: 'Matte Obsidian', hex: '#111827' }
    ],
    interactiveDemo: {
      type: 'thermostat',
      defaultState: {
        temp: 72
      }
    }
  },
  {
    id: 'lumina-vision-cam',
    name: 'Aurora 4K AI Security Sentry',
    tagline: 'Local neural network recognition, color night vision & IP67 weather-sealed housing.',
    category: 'security',
    categoryLabel: 'Smart Security',
    price: 15999,
    originalPrice: 18499,
    rating: 4.8,
    reviewsCount: 518,
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    image: '/src/assets/images/smart_security_cam_1791745986974.jpg',
    ecosystems: ['Matter', 'Apple Home', 'Google Home', 'Alexa'],
    protocol: 'Wi-Fi 6E & PoE Capable',
    specs: {
      power: 'Rechargeable 10,000mAh battery / USB-C Solar Ready',
      connectivity: 'Dual-Band Wi-Fi 6E (2.4 / 5 GHz)',
      protocol: 'Matter Video / Apple HomeKit Secure Video',
      dimensions: '92mm × 78mm × 78mm',
      warranty: '2-Year Protection Plan Included',
      batteryLife: '6-8 Months per charge',
      fieldOfView: '160° Ultra-Wide Diagonal with HDR'
    },
    description: 'Engineered for zero-latency home monitoring, the Aurora Sentry incorporates on-device computer vision to identify family, packages, vehicles, and pets without transmitting unencrypted video outside your local network.',
    highlights: [
      'Crystal-clear 4K HDR optical sensor with F/1.6 wide aperture',
      'Zero-subscription local storage via encrypted MicroSD or NAS',
      'Two-way crystal duplex audio with beamforming noise cancellation',
      'Integrated 300-lumen adaptive perimeter halo floodlight'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#1f2937' },
      { name: 'Chalk White', hex: '#f3f4f6' }
    ],
    interactiveDemo: {
      type: 'camera',
      defaultState: {
        isMotionDetected: false
      }
    }
  },
  {
    id: 'lumina-sol-lamp',
    name: 'Sol Horizon Ambient Light Column',
    tagline: 'Bioluminescent circadian lighting with 16 million colors and acoustic sync.',
    category: 'lighting',
    categoryLabel: 'Architectural Lighting',
    price: 14499,
    originalPrice: 16999,
    rating: 4.9,
    reviewsCount: 284,
    inStock: true,
    stockCount: 32,
    isFeatured: true,
    image: '/src/assets/images/smart_ambient_lamp_1791745996865.jpg',
    ecosystems: ['Matter', 'Apple Home', 'Google Home', 'Alexa', 'Zigbee'],
    protocol: 'Matter over Thread / Zigbee 3.0',
    specs: {
      power: 'Low-voltage 24V DC braided cable',
      connectivity: 'Thread / Bluetooth 5.3 Low Energy',
      protocol: 'Matter 1.3 / Adaptive Lighting 2.0',
      dimensions: '380mm height × 80mm base diameter',
      warranty: '5-Year LED Lifespan Warranty (50,000 hrs)',
      lumens: '1,400 Lumens Peak Output',
      colorTemp: '1,800K Ultra-Warm Candle to 6,500K Daylight'
    },
    description: 'The Sol Horizon mimics the natural progression of solar light throughout the day. It supports Apple Adaptive Lighting and Matter circadian routines, seamlessly warming down at sunset to prime melatonin production and brightening gently with your morning alarm.',
    highlights: [
      'Circadian rhythm synchronization aligned to your exact geolocation',
      '1,400-lumen edge-diffused optic engine with flicker-free dimming down to 0.1%',
      'Heavy cast architectural concrete & machined aluminum base',
      'Reactive music visualizer mode with zero perceived latency'
    ],
    colors: [
      { name: 'Cast Concrete & Sanded Titanium', hex: '#4b5563' },
      { name: 'Champagne Brass & Raw Clay', hex: '#92400e' }
    ],
    interactiveDemo: {
      type: 'light',
      defaultState: {
        color: '#f59e0b',
        brightness: 85
      }
    }
  },
  {
    id: 'lumina-sentinel-lock',
    name: 'Sentinel Pro Biometric Smart Lock',
    tagline: 'Grade 1 commercial deadbolt with Apple Home Key, fingerprint glass & hidden keypad.',
    category: 'access',
    categoryLabel: 'Access & Security',
    price: 24999,
    originalPrice: 28999,
    rating: 4.8,
    reviewsCount: 412,
    inStock: true,
    stockCount: 15,
    isFeatured: true,
    image: '/src/assets/images/smart_security_cam_1791745986974.jpg',
    ecosystems: ['Matter', 'Apple Home', 'Google Home', 'Alexa'],
    protocol: 'Matter over Thread & NFC',
    specs: {
      power: '4 × AA Lithium cells (included) or USB-C emergency jump',
      connectivity: 'NFC, Bluetooth 5.3, Thread Mesh',
      protocol: 'Matter Lock Profile 1.2 / Apple Home Key',
      dimensions: '130mm × 65mm × 24mm exterior escutcheon',
      warranty: 'Lifetime Mechanical / 3-Year Electronics',
      batteryLife: 'Up to 14 Months regular family usage'
    },
    description: 'Unlock your front door with a gentle tap of your iPhone or Apple Watch using Apple Home Key, or use the sub-second capacitive fingerprint reader. Backed by BHMA Grade 1 maximum residential security certification.',
    highlights: [
      'Apple Home Key contactless NFC tap with Power Reserve support',
      'Ultra-precise 0.3-second 3D capacitive fingerprint recognition',
      'Built-in door position sensor alerts you if door is left ajar',
      'Auto-lock timeout configurable from 5 seconds to 15 minutes'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#18181b' },
      { name: 'Satin Nickel', hex: '#a1a1aa' }
    ],
    interactiveDemo: {
      type: 'lock',
      defaultState: {
        isLocked: true
      }
    }
  },
  {
    id: 'lumina-atmos-sound',
    name: 'Atmos Spatial Smart Audio Sphere',
    tagline: 'Room-calibrating Hi-Fi acoustic sphere with AirPlay 2, Spotify Connect & Matter Cast.',
    category: 'audio',
    categoryLabel: 'Acoustic & Audio',
    price: 26999,
    originalPrice: 31499,
    rating: 4.9,
    reviewsCount: 198,
    inStock: true,
    stockCount: 21,
    isFeatured: false,
    image: '/src/assets/images/smart_ambient_lamp_1791745996865.jpg',
    ecosystems: ['Apple Home', 'Google Home', 'Alexa', 'Matter'],
    protocol: 'Wi-Fi 6 & AirPlay 2',
    specs: {
      power: 'Integrated 100-240V AC universal power supply',
      connectivity: 'Wi-Fi 6 (802.11ax), Bluetooth 5.3, Ethernet port',
      protocol: 'AirPlay 2, Chromecast Audio, Matter Cast',
      dimensions: '190mm spherical diameter',
      warranty: '2-Year Acoustic Assurance',
      range: 'Sub-bass extension down to 38Hz'
    },
    description: 'Immerse your space in lossless high-resolution spatial sound. Quad beamforming microphones analyze your room acoustic reflections in real time to tune bass resonance and clarity to perfection.',
    highlights: [
      'Custom downward-firing 4-inch woofer and ring of five horn-loaded tweeters',
      'Automatic computational room calibration in under 5 seconds',
      'Seamless multi-room synchronized whole-home audio streaming',
      'Discreet capacitive volume glass surface with proximity illumination'
    ],
    colors: [
      { name: 'Midnight Charcoal Weave', hex: '#1f2937' },
      { name: 'Arctic Chalk Wool', hex: '#f3f4f6' }
    ],
    interactiveDemo: {
      type: 'audio',
      defaultState: {
        isPlaying: false,
        volume: 65
      }
    }
  },
  {
    id: 'lumina-sense-matrix',
    name: 'SenseAir Multi-Sensor Environmental Hub',
    tagline: 'Continuous radar presence, air quality (VOC/CO2/PM2.5), light lux & temperature.',
    category: 'sensors',
    categoryLabel: 'Sensors & Automation',
    price: 6999,
    originalPrice: 8499,
    rating: 4.7,
    reviewsCount: 164,
    inStock: true,
    stockCount: 45,
    isFeatured: false,
    image: '/src/assets/images/smart_thermostat_1791745974825.jpg',
    ecosystems: ['Matter', 'Apple Home', 'Google Home', 'Zigbee'],
    protocol: 'Matter over Thread',
    specs: {
      power: 'USB-C continuous powered with micro-battery backup',
      connectivity: 'Thread Mesh & BLE',
      protocol: 'Matter Environmental Sensor Standard',
      dimensions: '58mm × 58mm × 18mm',
      warranty: '2-Year Standard Warranty',
      range: 'Detects micro-breathing presence up to 7 meters away'
    },
    description: 'Unlike standard infrared motion detectors that leave you in the dark when you sit still, SenseAir uses 24GHz mmWave radar to track biological presence, coupled with precision Swiss Sensirion air quality sensors.',
    highlights: [
      '24GHz mmWave radar tracks true human presence, even when sleeping or reading',
      'Swiss laboratory-grade CO2, VOC, PM2.5, humidity, and temperature sensors',
      'Instantaneous automation triggers to turn lights on upon room entry',
      'Compact magnetic swivel mount mounts cleanly on walls or ceilings'
    ],
    colors: [
      { name: 'Minimal White', hex: '#f9fafb' },
      { name: 'Architectural Stone', hex: '#4b5563' }
    ]
  }
];

export const SMART_ROOMS = [
  {
    id: 'living-room',
    name: 'Living Room Lounge',
    description: 'Architectural mood lighting and spatial acoustic presence for relaxing and hosting.',
    deviceIds: ['lumina-sol-lamp', 'lumina-thermostat-pro', 'lumina-atmos-sound'],
    bundlePrice: 56999,
    bundleOriginalPrice: 61497,
    savings: 4498,
    image: '/src/assets/images/hero_smart_home_1791745956437.jpg',
    presets: [
      { id: 'cinema', label: 'Cinema Mood', temp: '20°C', light: '15% Warm Amber', audio: 'Dolby Atmos Spatial' },
      { id: 'evening', label: 'Evening Lounge', temp: '22°C', light: '45% Circadian Glow', audio: 'Acoustic Jazz' },
      { id: 'energize', label: 'Focus & Day', temp: '21°C', light: '85% Crisp 5000K', audio: 'Silent' }
    ]
  },
  {
    id: 'front-porch',
    name: 'Perimeter & Entryway',
    description: 'Uncompromising exterior security with 4K computer vision & instant NFC access.',
    deviceIds: ['lumina-vision-cam', 'lumina-sentinel-lock'],
    bundlePrice: 36999,
    bundleOriginalPrice: 40998,
    savings: 3999,
    image: '/src/assets/images/smart_security_cam_1791745986974.jpg',
    presets: [
      { id: 'armed', label: 'Night Guard Armed', temp: 'Perimeter Active', light: 'Floodlight Auto', audio: 'Chime on alert' },
      { id: 'welcome', label: 'Guest Arrival', temp: 'Porch Unlocked', light: '100% Path Illumination', audio: 'Friendly Welcome' }
    ]
  },
  {
    id: 'bedroom',
    name: 'Master Sanctuary',
    description: 'Circadian sunrise waking, silent climate adjustment, and air purity monitoring.',
    deviceIds: ['lumina-sol-lamp', 'lumina-thermostat-pro', 'lumina-sense-matrix'],
    bundlePrice: 38999,
    bundleOriginalPrice: 41497,
    savings: 2498,
    image: '/src/assets/images/smart_ambient_lamp_1791745996865.jpg',
    presets: [
      { id: 'sleep', label: 'Deep Slumber', temp: '19°C Night Cool', light: '0% Blackout', audio: 'Brown Noise' },
      { id: 'sunrise', label: 'Circadian Sunrise', temp: '21°C Morning', light: 'Gradient Golden Dawn', audio: 'Gentle Chimes' }
    ]
  }
];
