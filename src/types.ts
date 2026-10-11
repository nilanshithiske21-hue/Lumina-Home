export type Ecosystem = 'Matter' | 'Apple Home' | 'Google Home' | 'Alexa' | 'Zigbee';

export type ProductCategory = 
  | 'all'
  | 'climate'
  | 'lighting'
  | 'security'
  | 'access'
  | 'audio'
  | 'sensors';

export interface ProductSpec {
  power: string;
  connectivity: string;
  protocol: string;
  dimensions: string;
  warranty: string;
  range?: string;
  batteryLife?: string;
  fieldOfView?: string;
  lumens?: string;
  colorTemp?: string;
}

export interface InteractiveDemoConfig {
  type: 'thermostat' | 'light' | 'camera' | 'lock' | 'audio';
  defaultState: {
    temp?: number;
    color?: string;
    brightness?: number;
    isLocked?: boolean;
    isMotionDetected?: boolean;
    volume?: number;
    isPlaying?: boolean;
  };
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'climate' | 'lighting' | 'security' | 'access' | 'audio' | 'sensors';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isNew?: boolean;
  image: string;
  ecosystems: Ecosystem[];
  protocol: string;
  specs: ProductSpec;
  description: string;
  highlights: string[];
  colors?: { name: string; hex: string }[];
  interactiveDemo?: InteractiveDemoConfig;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  street: string;
  apt?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface PaymentCard {
  id: string;
  holderName: string;
  cardNumber: string; // formatted or masked
  last4: string;
  brand: 'visa' | 'mastercard' | 'amex';
  expMonth: string;
  expYear: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedColor?: string;
}

export interface OrderTimelineStep {
  title: string;
  time: string;
  completed: boolean;
  current: boolean;
  description: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  shippingAddress: Address;
  paymentMethod: {
    type: 'upi_qr' | 'card' | 'netbanking' | 'cod' | 'apple_pay' | 'google_pay' | 'paypal' | 'klarna';
    last4?: string;
    brand?: string;
    upiId?: string;
    upiTransactionRef?: string;
  };
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  timeline: OrderTimelineStep[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  memberTier: string;
  memberSince: string;
  rewardPoints: number;
  addresses: Address[];
  paymentMethods: PaymentCard[];
  orders: Order[];
  wishlist: string[];
}
