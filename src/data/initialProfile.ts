import { UserProfile } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Nilanshi Thiske',
  email: 'nilanshithiske21@gmail.com',
  phone: '+91 98201 44821',
  memberTier: 'Lumina Black Member',
  memberSince: 'March 2024',
  rewardPoints: 2450,
  addresses: [
    {
      id: 'addr-1',
      label: 'Primary Residence',
      fullName: 'Nilanshi Thiske',
      street: '402 Skyline Towers, Bandra West',
      apt: 'Tower B, 4th Floor',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400050',
      country: 'India',
      phone: '+91 98201 44821',
      isDefault: true
    },
    {
      id: 'addr-2',
      label: 'Design Studio & Lab',
      fullName: 'Nilanshi Thiske',
      street: '14 Indiranagar 100 Feet Road',
      apt: 'Suite 302',
      city: 'Bengaluru',
      state: 'Karnataka',
      zipCode: '560038',
      country: 'India',
      phone: '+91 98201 44822',
      isDefault: false
    }
  ],
  paymentMethods: [
    {
      id: 'pm-1',
      holderName: 'Nilanshi Thiske',
      cardNumber: '•••• •••• •••• 4242',
      last4: '4242',
      brand: 'visa',
      expMonth: '08',
      expYear: '2028',
      isDefault: true
    },
    {
      id: 'pm-2',
      holderName: 'Nilanshi Thiske',
      cardNumber: '•••• •••• •••• 8821',
      last4: '8821',
      brand: 'mastercard',
      expMonth: '11',
      expYear: '2027',
      isDefault: false
    }
  ],
  orders: [
    {
      id: 'ord-98214',
      orderNumber: 'LUM-98214',
      date: 'October 4, 2026',
      items: [
        {
          id: 'item-1',
          productId: 'lumina-thermostat-pro',
          name: 'Aether Dial Smart Thermostat',
          price: 19999,
          quantity: 1,
          image: '/src/assets/images/smart_thermostat_1791745974825.jpg',
          selectedColor: 'Titanium Graphite'
        },
        {
          id: 'item-2',
          productId: 'lumina-sol-lamp',
          name: 'Sol Horizon Ambient Light Column',
          price: 14499,
          quantity: 2,
          image: '/src/assets/images/smart_ambient_lamp_1791745996865.jpg',
          selectedColor: 'Cast Concrete & Sanded Titanium'
        }
      ],
      subtotal: 48997,
      discount: 4899,
      shipping: 0,
      tax: 7937,
      total: 52035,
      status: 'Delivered',
      shippingAddress: {
        id: 'addr-1',
        label: 'Primary Residence',
        fullName: 'Nilanshi Thiske',
        street: '402 Skyline Towers, Bandra West',
        apt: 'Tower B, 4th Floor',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400050',
        country: 'India',
        phone: '+91 98201 44821',
        isDefault: true
      },
      paymentMethod: {
        type: 'upi_qr',
        upiId: 'nilanshithiske21@okicici',
        upiTransactionRef: 'UPI-98214-GPay'
      },
      trackingNumber: 'DELHIVERY-98210398',
      carrier: 'Blue Dart / Delhivery Express',
      estimatedDelivery: 'October 7, 2026',
      timeline: [
        {
          title: 'Order Confirmed',
          time: 'Oct 4, 10:14 AM',
          completed: true,
          current: false,
          description: 'UPI QR Payment verified via GPay to nilanshithiske21@okicici.'
        },
        {
          title: 'Precision Assembly & Flashed',
          time: 'Oct 4, 3:30 PM',
          completed: true,
          current: false,
          description: 'Hardware updated to Matter 1.3 release firmware.'
        },
        {
          title: 'Dispatched from Mumbai Logistics Hub',
          time: 'Oct 5, 8:20 AM',
          completed: true,
          current: false,
          description: 'Package in transit with Blue Dart Express.'
        },
        {
          title: 'Delivered to Residence',
          time: 'Oct 7, 1:45 PM',
          completed: true,
          current: true,
          description: 'Package delivered and signed by Nilanshi Thiske.'
        }
      ]
    }
  ],
  wishlist: ['lumina-sol-lamp', 'lumina-sentinel-lock']
};
