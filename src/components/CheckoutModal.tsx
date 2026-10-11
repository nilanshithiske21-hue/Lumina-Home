import React, { useState } from 'react';
import { CartItem, Address, PaymentCard, Order } from '../types';
import { formatINR } from '../utils/formatCurrency';
import { UpiPaymentQR } from './UpiPaymentQR';
import { 
  X, 
  Check, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Lock, 
  MapPin, 
  Plus, 
  ArrowRight,
  ChevronLeft,
  Smartphone,
  QrCode,
  Building2,
  Banknote
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  savedAddresses: Address[];
  savedPaymentMethods: PaymentCard[];
  onOrderComplete: (order: Order) => void;
  onSaveNewAddress?: (address: Address) => void;
  onSaveNewCard?: (card: PaymentCard) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  shipping,
  tax,
  total,
  savedAddresses,
  savedPaymentMethods,
  onOrderComplete,
  onSaveNewAddress,
  onSaveNewCard
}) => {
  // Steps: 'shipping' -> 'delivery' -> 'payment' -> 'confirmation'
  const [currentStep, setCurrentStep] = useState<'shipping' | 'delivery' | 'payment' | 'confirmation'>('shipping');
  
  // Selected Address
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    savedAddresses.find((a) => a.isDefault)?.id || savedAddresses[0]?.id || 'new'
  );
  const [isAddingNewAddress, setIsAddingNewAddress] = useState<boolean>(savedAddresses.length === 0);
  
  // New address state formatted for India
  const [newAddress, setNewAddress] = useState<Address>({
    id: `addr-${Date.now()}`,
    label: 'Home',
    fullName: 'Nilanshi Thiske',
    street: '',
    apt: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    zipCode: '',
    country: 'India',
    phone: '+91 98201 44821',
    isDefault: false
  });

  // Delivery options
  const [deliveryMethod, setDeliveryMethod] = useState<'express' | 'priority' | 'whiteglove'>('express');

  // Payment Provider: Default to UPI QR as requested by user!
  const [paymentProvider, setPaymentProvider] = useState<'upi_qr' | 'card' | 'netbanking' | 'cod'>('upi_qr');
  const [selectedCardId, setSelectedCardId] = useState<string>(
    savedPaymentMethods.find((p) => p.isDefault)?.id || savedPaymentMethods[0]?.id || 'new'
  );
  const [isAddingNewCard, setIsAddingNewCard] = useState<boolean>(savedPaymentMethods.length === 0);
  
  // Card Inputs
  const [cardHolder, setCardHolder] = useState('Nilanshi Thiske');
  const [cardNumber, setCardNumber] = useState('4242 8820 1920 4242');
  const [cardExp, setCardExp] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('382');
  const [isCvvFocused, setIsCvvFocused] = useState(false);
  const [saveCardToProfile, setSaveCardToProfile] = useState(true);

  // Completed Order storage
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const activeAddress = selectedAddressId === 'new'
    ? newAddress
    : savedAddresses.find((a) => a.id === selectedAddressId) || newAddress;

  const getDeliveryFee = () => {
    if (deliveryMethod === 'priority') return 499;
    if (deliveryMethod === 'whiteglove') return 1999;
    return shipping;
  };

  const finalTotal = total - shipping + getDeliveryFee();

  const handleCardNumberChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 16);
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setCardNumber(formatted);
  };

  const completeOrderWithDetails = (details: {
    paymentType: 'upi_qr' | 'card' | 'netbanking' | 'cod';
    upiId?: string;
    upiRef?: string;
    last4?: string;
  }) => {
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `LUM-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: items.map((item) => ({
        id: `item-${Date.now()}-${item.product.id}`,
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
        selectedColor: item.selectedColor
      })),
      subtotal,
      discount,
      shipping: getDeliveryFee(),
      tax,
      total: finalTotal,
      status: 'Confirmed',
      shippingAddress: activeAddress,
      paymentMethod: {
        type: details.paymentType,
        upiId: details.upiId,
        upiTransactionRef: details.upiRef,
        last4: details.last4,
        brand: details.paymentType === 'card' ? 'Visa' : undefined
      },
      trackingNumber: `BD${Math.floor(100000000 + Math.random() * 900000000)}IN`,
      carrier: deliveryMethod === 'priority' ? 'Blue Dart Apex Overnight' : 'Delhivery Express',
      estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
      timeline: [
        {
          title: 'Order Verified & Authorized',
          time: 'Just now',
          completed: true,
          current: true,
          description: details.paymentType === 'upi_qr' 
            ? `UPI payment verified via Google Pay to nilanshithiske21@okicici.` 
            : 'Payment authorized securely via 256-bit payment gateway.'
        },
        {
          title: 'Matter 1.3 Certified Hardware Provisioning',
          time: 'Pending',
          completed: false,
          current: false,
          description: 'Automated factory diagnostic & secure key generation.'
        },
        {
          title: 'Dispatched from Mumbai Logistics Hub',
          time: 'Pending',
          completed: false,
          current: false,
          description: 'Express courier dispatched.'
        }
      ]
    };

    setCompletedOrder(newOrder);
    onOrderComplete(newOrder);

    if (details.paymentType === 'card' && isAddingNewCard && onSaveNewCard) {
      onSaveNewCard({
        id: `pm-${Date.now()}`,
        holderName: cardHolder,
        cardNumber: `•••• •••• •••• ${cardNumber.replace(/\s/g, '').slice(-4) || '4242'}`,
        last4: cardNumber.replace(/\s/g, '').slice(-4) || '4242',
        brand: 'visa',
        expMonth: cardExp.split('/')[0] || '12',
        expYear: `20${cardExp.split('/')[1] || '28'}`,
        isDefault: false
      });
    }

    setCurrentStep('confirmation');
  };

  const handleCardPaymentSubmit = () => {
    completeOrderWithDetails({
      paymentType: 'card',
      last4: cardNumber.replace(/\s/g, '').slice(-4) || '4242'
    });
  };

  const handleCodSubmit = () => {
    completeOrderWithDetails({
      paymentType: 'cod'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#101318] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-sm">
              L
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>Secure Checkout</span>
                <span className="text-[11px] font-mono text-emerald-400 font-normal">· Encrypted UPI &amp; Cards</span>
              </h2>
              <div className="text-xs text-slate-400">Order for {activeAddress.fullName || 'Nilanshi Thiske'}</div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress */}
        {currentStep !== 'confirmation' && (
          <div className="px-6 py-3 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-xs font-medium">
            <button
              onClick={() => setCurrentStep('shipping')}
              className={`flex items-center gap-1.5 cursor-pointer ${
                currentStep === 'shipping' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-mono">1</span>
              <span>Address</span>
            </button>
            <span className="text-slate-700">/</span>
            <button
              onClick={() => setCurrentStep('delivery')}
              className={`flex items-center gap-1.5 cursor-pointer ${
                currentStep === 'delivery' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-mono">2</span>
              <span>Delivery</span>
            </button>
            <span className="text-slate-700">/</span>
            <button
              onClick={() => setCurrentStep('payment')}
              className={`flex items-center gap-1.5 cursor-pointer ${
                currentStep === 'payment' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-mono">3</span>
              <span>Payment (UPI / Cards)</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          
          {/* Main Step Body */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            
            {/* STEP 1: SHIPPING ADDRESS */}
            {currentStep === 'shipping' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Select Delivery Destination</h3>
                  <p className="text-xs text-slate-400">
                    Choose from your saved addresses for instant faster checkout or add a new shipping address.
                  </p>
                </div>

                {!isAddingNewAddress && (
                  <div className="space-y-3">
                    {savedAddresses.map((addr) => (
                      <div
                        key={addr.id}
                        onClick={() => setSelectedAddressId(addr.id)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                          selectedAddressId === addr.id
                            ? 'bg-amber-400/10 border-amber-400 shadow-md'
                            : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{addr.label}</span>
                            {addr.isDefault && (
                              <span className="text-[10px] font-mono bg-white/10 text-slate-300 px-1.5 py-0.2 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="text-slate-300">{addr.fullName}</div>
                          <div className="text-slate-400">{addr.street} {addr.apt && `, ${addr.apt}`}</div>
                          <div className="text-slate-400">{addr.city}, {addr.state} - {addr.zipCode}</div>
                          <div className="text-slate-500 font-mono text-[11px]">{addr.phone}</div>
                        </div>

                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          selectedAddressId === addr.id ? 'border-amber-400 bg-amber-400 text-slate-950' : 'border-slate-600'
                        }`}>
                          {selectedAddressId === addr.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={() => setIsAddingNewAddress(true)}
                      className="w-full py-3 border border-dashed border-white/20 hover:border-amber-400/50 rounded-xl text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Delivery Address</span>
                    </button>
                  </div>
                )}

                {/* Add New Address Form */}
                {isAddingNewAddress && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-xs font-semibold text-white">Enter Address in India:</div>
                      {savedAddresses.length > 0 && (
                        <button
                          onClick={() => setIsAddingNewAddress(false)}
                          className="text-xs text-amber-400 underline cursor-pointer"
                        >
                          Use Saved Address
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="col-span-2">
                        <label className="block text-slate-400 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={newAddress.fullName}
                          onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                          placeholder="e.g. Nilanshi Thiske"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-slate-400 mb-1">Flat, House no., Building, Apartment</label>
                        <input
                          type="text"
                          value={newAddress.street}
                          onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                          placeholder="e.g. 402 Skyline Towers"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-slate-400 mb-1">Area, Street, Sector, Village</label>
                        <input
                          type="text"
                          value={newAddress.apt}
                          onChange={(e) => setNewAddress({ ...newAddress, apt: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                          placeholder="e.g. Bandra West"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">City / Town</label>
                        <input
                          type="text"
                          value={newAddress.city}
                          onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                          placeholder="Mumbai"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">State</label>
                        <input
                          type="text"
                          value={newAddress.state}
                          onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                          placeholder="Maharashtra"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">PIN Code (6 digits)</label>
                        <input
                          type="text"
                          value={newAddress.zipCode}
                          onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono focus:outline-none focus:border-amber-400"
                          placeholder="400050"
                          maxLength={6}
                        />
                      </div>
                      <div>
                        <label className="block text-slate-400 mb-1">Mobile Phone (+91)</label>
                        <input
                          type="text"
                          value={newAddress.phone}
                          onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                          className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono focus:outline-none focus:border-amber-400"
                          placeholder="+91 98201 44821"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setCurrentStep('delivery')}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                >
                  <span>Continue to Delivery Tier</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: DELIVERY METHOD */}
            {currentStep === 'delivery' && (
              <div className="space-y-6">
                <div>
                  <button
                    onClick={() => setCurrentStep('shipping')}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white mb-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back to address
                  </button>
                  <h3 className="text-lg font-bold text-white mb-1">Select Delivery Speed</h3>
                  <p className="text-xs text-slate-400">
                    Insured pan-India express logistics with live GPS courier tracking.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      id: 'express',
                      title: 'Standard Express (Delhivery / Blue Dart)',
                      desc: 'Fully insured with real-time SMS & WhatsApp tracking',
                      price: shipping === 0 ? 'FREE' : formatINR(shipping),
                      time: '2-3 Business Days'
                    },
                    {
                      id: 'priority',
                      title: 'Priority Overnight Air Express',
                      desc: 'Guaranteed delivery next day before 12:00 PM',
                      price: formatINR(499),
                      time: 'Tomorrow Afternoon'
                    },
                    {
                      id: 'whiteglove',
                      title: 'Lumina Certified Smart Home Setup',
                      desc: 'Certified technician installs deadbolts, bridges Thread mesh & syncs Google Home/Apple Home',
                      price: formatINR(1999),
                      time: 'Scheduled Tech Visit'
                    }
                  ].map((tier) => (
                    <div
                      key={tier.id}
                      onClick={() => setDeliveryMethod(tier.id as any)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                        deliveryMethod === tier.id
                          ? 'bg-amber-400/10 border-amber-400 shadow-md'
                          : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="space-y-1 text-xs">
                        <div className="font-semibold text-white flex items-center gap-2">
                          <Truck className="w-4 h-4 text-amber-400" />
                          <span>{tier.title}</span>
                        </div>
                        <div className="text-slate-400">{tier.desc}</div>
                        <div className="text-slate-300 font-mono text-[11px]">{tier.time}</div>
                      </div>

                      <div className="text-right">
                        <div className="font-mono font-bold text-white text-xs tabular-nums">{tier.price}</div>
                        <div className={`mt-2 w-5 h-5 rounded-full border flex items-center justify-center ml-auto ${
                          deliveryMethod === tier.id ? 'border-amber-400 bg-amber-400 text-slate-950' : 'border-slate-600'
                        }`}>
                          {deliveryMethod === tier.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentStep('payment')}
                  className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                >
                  <span>Continue to Payment (UPI QR / Cards)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 3: PAYMENT GATEWAY */}
            {currentStep === 'payment' && (
              <div className="space-y-6">
                <div>
                  <button
                    onClick={() => setCurrentStep('delivery')}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-white mb-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back to delivery
                  </button>
                  <h3 className="text-lg font-bold text-white mb-1">Encrypted Payment Gateway</h3>
                  <p className="text-xs text-slate-400">
                    Scan the Google Pay UPI QR code or choose Card / NetBanking / COD.
                  </p>
                </div>

                {/* Payment Provider Selection */}
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => setPaymentProvider('upi_qr')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                      paymentProvider === 'upi_qr'
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold shadow-md'
                        : 'bg-white/[0.04] text-slate-300 border-white/10 hover:text-white'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>UPI QR Code</span>
                  </button>

                  <button
                    onClick={() => setPaymentProvider('card')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                      paymentProvider === 'card'
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                        : 'bg-white/[0.04] text-slate-300 border-white/10 hover:text-white'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Cards (RuPay)</span>
                  </button>

                  <button
                    onClick={() => setPaymentProvider('netbanking')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                      paymentProvider === 'netbanking'
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                        : 'bg-white/[0.04] text-slate-300 border-white/10 hover:text-white'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>NetBanking</span>
                  </button>

                  <button
                    onClick={() => setPaymentProvider('cod')}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                      paymentProvider === 'cod'
                        ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                        : 'bg-white/[0.04] text-slate-300 border-white/10 hover:text-white'
                    }`}
                  >
                    <Banknote className="w-4 h-4" />
                    <span>Cash on Delivery</span>
                  </button>
                </div>

                {/* 1. UPI QR PAYMENT OPTION (THE USER'S REQUESTED QR CODE) */}
                {paymentProvider === 'upi_qr' && (
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
                    <UpiPaymentQR
                      amount={finalTotal}
                      orderRef="LUM-INDIA"
                      onPaymentVerified={(utr) => {
                        completeOrderWithDetails({
                          paymentType: 'upi_qr',
                          upiId: 'nilanshithiske21@okicici',
                          upiRef: utr
                        });
                      }}
                    />
                  </div>
                )}

                {/* 2. CARD PAYMENT */}
                {paymentProvider === 'card' && (
                  <div className="space-y-4">
                    {/* Saved Cards quick selector */}
                    {savedPaymentMethods.length > 0 && !isAddingNewCard && (
                      <div className="space-y-2">
                        <div className="text-xs text-slate-400 font-medium">Use Saved Payment Method:</div>
                        {savedPaymentMethods.map((pm) => (
                          <div
                            key={pm.id}
                            onClick={() => setSelectedCardId(pm.id)}
                            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs ${
                              selectedCardId === pm.id
                                ? 'bg-amber-400/10 border-amber-400'
                                : 'bg-white/[0.03] border-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <CreditCard className="w-4 h-4 text-amber-400" />
                              <span className="font-mono text-white">•••• {pm.last4} ({pm.brand.toUpperCase()})</span>
                              <span className="text-slate-400">Exp {pm.expMonth}/{pm.expYear}</span>
                            </div>
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              selectedCardId === pm.id ? 'border-amber-400 bg-amber-400 text-slate-950' : 'border-slate-600'
                            }`}>
                              {selectedCardId === pm.id && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                          </div>
                        ))}

                        <button
                          onClick={() => setIsAddingNewCard(true)}
                          className="text-xs text-amber-400 underline cursor-pointer pt-1"
                        >
                          + Enter a new credit/debit card
                        </button>
                      </div>
                    )}

                    {/* New Card Form */}
                    {isAddingNewCard && (
                      <div className="space-y-4">
                        {/* Interactive Card Graphic */}
                        <div className="relative w-full aspect-[1.8/1] rounded-2xl p-5 overflow-hidden shadow-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-amber-950/60 border border-white/20 text-white flex flex-col justify-between">
                          <div className="flex justify-between items-center">
                            <div className="w-10 h-7 rounded bg-amber-300/80 shadow-inner flex items-center justify-center">
                              <div className="w-6 h-4 border border-slate-900/40 rounded-sm" />
                            </div>
                            <div className="text-xs font-mono font-bold tracking-widest text-amber-300">
                              LUMINA TITANIUM · RUPAY / VISA
                            </div>
                          </div>

                          <div className="font-mono text-base tracking-widest text-white drop-shadow">
                            {cardNumber || '•••• •••• •••• ••••'}
                          </div>

                          <div className="flex justify-between items-end text-xs font-mono">
                            <div>
                              <div className="text-[9px] text-slate-400 uppercase">Card Holder</div>
                              <div className="font-semibold">{cardHolder || 'NILANSHI THISKE'}</div>
                            </div>
                            <div>
                              <div className="text-[9px] text-slate-400 uppercase">Expires</div>
                              <div>{cardExp || 'MM/YY'}</div>
                            </div>
                            <div>
                              <div className="text-[9px] text-slate-400 uppercase">CVV</div>
                              <div>{isCvvFocused ? cardCvv : '•••'}</div>
                            </div>
                          </div>
                        </div>

                        {/* Input Fields */}
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="col-span-2">
                            <label className="block text-slate-400 mb-1">Cardholder Name</label>
                            <input
                              type="text"
                              value={cardHolder}
                              onChange={(e) => setCardHolder(e.target.value)}
                              className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                              placeholder="Nilanshi Thiske"
                            />
                          </div>

                          <div className="col-span-2">
                            <label className="block text-slate-400 mb-1">Card Number</label>
                            <input
                              type="text"
                              value={cardNumber}
                              onChange={(e) => handleCardNumberChange(e.target.value)}
                              className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono focus:outline-none focus:border-amber-400"
                              placeholder="4242 4242 4242 4242"
                              maxLength={19}
                            />
                          </div>

                          <div>
                            <label className="block text-slate-400 mb-1">Expiry (MM/YY)</label>
                            <input
                              type="text"
                              value={cardExp}
                              onChange={(e) => setCardExp(e.target.value)}
                              className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono focus:outline-none focus:border-amber-400"
                              placeholder="08/28"
                              maxLength={5}
                            />
                          </div>

                          <div>
                            <label className="block text-slate-400 mb-1">CVV / CVC</label>
                            <input
                              type="password"
                              value={cardCvv}
                              onFocus={() => setIsCvvFocused(true)}
                              onBlur={() => setIsCvvFocused(false)}
                              onChange={(e) => setCardCvv(e.target.value.slice(0, 4))}
                              className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono focus:outline-none focus:border-amber-400"
                              placeholder="123"
                              maxLength={4}
                            />
                          </div>
                        </div>

                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
                          <input
                            type="checkbox"
                            checked={saveCardToProfile}
                            onChange={(e) => setSaveCardToProfile(e.target.checked)}
                            className="rounded accent-amber-400"
                          />
                          <span>Save this card for 1-click faster future checkout</span>
                        </label>
                      </div>
                    )}

                    <button
                      onClick={handleCardPaymentSubmit}
                      className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Authorize Payment of {formatINR(finalTotal)}</span>
                    </button>
                  </div>
                )}

                {/* 3. NETBANKING */}
                {paymentProvider === 'netbanking' && (
                  <div className="space-y-4">
                    <div className="text-xs text-slate-300 font-semibold mb-2">Select Primary Indian Bank:</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {['HDFC Bank', 'ICICI Bank', 'State Bank of India (SBI)', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((b) => (
                        <button
                          key={b}
                          onClick={() => {
                            completeOrderWithDetails({
                              paymentType: 'netbanking'
                            });
                          }}
                          className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-white text-left font-medium transition-colors cursor-pointer"
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. CASH ON DELIVERY */}
                {paymentProvider === 'cod' && (
                  <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-3 text-xs">
                    <div className="font-bold text-white text-sm">Pay upon Delivery</div>
                    <p className="text-slate-300 leading-relaxed">
                      You can pay cash or scan the courier&apos;s UPI QR on your phone when the shipment arrives at {activeAddress.city}.
                    </p>
                    <div className="p-3 bg-white/[0.04] rounded-xl border border-white/10 text-slate-400">
                      OTP verification will be required upon package delivery.
                    </div>
                    <button
                      onClick={handleCodSubmit}
                      className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-all"
                    >
                      <span>Place Order with COD ({formatINR(finalTotal)})</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: ORDER CONFIRMATION & RECEIPT */}
            {currentStep === 'confirmation' && completedOrder && (
              <div className="space-y-6 py-2">
                <div className="text-center space-y-2">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-7 h-7 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Order Confirmed!</h3>
                  <div className="text-xs font-mono text-amber-400">
                    Order Reference: {completedOrder.orderNumber}
                  </div>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Thank you, {completedOrder.shippingAddress.fullName}. We have received your payment via{' '}
                    {completedOrder.paymentMethod.type === 'upi_qr' ? 'UPI (Google Pay)' : completedOrder.paymentMethod.type.toUpperCase()}.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Estimated Delivery:</span>
                    <span className="font-semibold text-white">{completedOrder.estimatedDelivery}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Logistics Courier:</span>
                    <span className="text-slate-300">{completedOrder.carrier}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Tracking AWB:</span>
                    <span className="font-mono text-amber-300">{completedOrder.trackingNumber}</span>
                  </div>
                  {completedOrder.paymentMethod.upiTransactionRef && (
                    <div className="flex justify-between text-slate-400">
                      <span>UPI Reference:</span>
                      <span className="font-mono text-emerald-400">{completedOrder.paymentMethod.upiTransactionRef}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400 border-t border-white/[0.06] pt-2">
                    <span>Delivering to:</span>
                    <span className="text-slate-300 truncate max-w-xs">{completedOrder.shippingAddress.street}, {completedOrder.shippingAddress.city}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={onClose}
                    className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Return to Storefront</span>
                  </button>
                  <div className="text-center text-[11px] text-slate-400">
                    Order saved to your Profile &amp; Order History for easy tracking
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Order Summary Column */}
          <div className="lg:col-span-5 bg-slate-950 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-3">
                Order Summary ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
              </div>

              {/* Items List */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1 mb-5">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.selectedColor || ''}`} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-900 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white truncate">{item.product.name}</div>
                      <div className="text-[11px] text-slate-400">Qty: {item.quantity} · {item.selectedColor || 'Standard'}</div>
                    </div>
                    <div className="font-mono font-semibold text-white tabular-nums">
                      {formatINR(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown in INR */}
              <div className="space-y-2 text-xs border-t border-white/[0.08] pt-4">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-slate-200 tabular-nums">{formatINR(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span className="font-mono tabular-nums">-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Delivery ({deliveryMethod})</span>
                  <span className="font-mono text-slate-200 tabular-nums">
                    {getDeliveryFee() === 0 ? 'FREE' : formatINR(getDeliveryFee())}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>GST (18% Included)</span>
                  <span className="font-mono text-slate-200 tabular-nums">{formatINR(tax)}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-white/10 text-white font-bold">
                  <span className="text-sm">Total Due</span>
                  <span className="text-xl font-mono text-amber-400 tabular-nums">{formatINR(finalTotal)}</span>
                </div>
              </div>
            </div>

            {/* Selected shipping recap */}
            <div className="pt-4 border-t border-white/[0.08] text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-medium">Delivering to:</span>
                <span className="truncate">{activeAddress.street ? `${activeAddress.street}, ${activeAddress.city}` : 'Primary Residence'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pan-India 30-Day Money-Back Guarantee</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
