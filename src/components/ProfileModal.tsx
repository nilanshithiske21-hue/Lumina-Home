import React, { useState } from 'react';
import { UserProfile, Address, PaymentCard, Order, Product } from '../types';
import { formatINR } from '../utils/formatCurrency';
import { 
  X, 
  Package, 
  MapPin, 
  CreditCard, 
  User, 
  Plus, 
  Check, 
  Trash2, 
  ExternalLink, 
  RotateCcw,
  Truck,
  ShieldCheck,
  Award,
  Calendar,
  Sparkles,
  QrCode,
  Heart,
  ShoppingBag,
  Download
} from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  initialTab?: 'orders' | 'addresses' | 'payments' | 'overview' | 'wishlist';
  wishlistProducts: Product[];
  onAddAddress: (address: Address) => void;
  onUpdateAddress: (address: Address) => void;
  onDeleteAddress: (addressId: string) => void;
  onSetDefaultAddress: (addressId: string) => void;
  onAddPaymentMethod: (card: PaymentCard) => void;
  onDeletePaymentMethod: (cardId: string) => void;
  onReorder: (order: Order) => void;
  onViewInvoice: (order: Order) => void;
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onMoveAllWishlistToCart: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  initialTab = 'overview',
  wishlistProducts,
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress,
  onSetDefaultAddress,
  onAddPaymentMethod,
  onDeletePaymentMethod,
  onReorder,
  onViewInvoice,
  onRemoveFromWishlist,
  onAddToCart,
  onMoveAllWishlistToCart
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'payments' | 'wishlist'>(initialTab);
  
  // State for Add Address Form
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState<Partial<Address>>({
    label: 'Home',
    fullName: profile.name,
    street: '',
    apt: '',
    city: '',
    state: 'CA',
    zipCode: '',
    country: 'United States',
    phone: profile.phone,
    isDefault: false
  });

  // State for Add Card Form
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardForm, setCardForm] = useState({
    holderName: profile.name,
    cardNumber: '',
    expMonth: '12',
    expYear: '2028',
    cvv: ''
  });

  if (!isOpen) return null;

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.street || !addressForm.city || !addressForm.zipCode) return;
    
    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      label: addressForm.label || 'Home',
      fullName: addressForm.fullName || profile.name,
      street: addressForm.street || '',
      apt: addressForm.apt,
      city: addressForm.city || '',
      state: addressForm.state || 'CA',
      zipCode: addressForm.zipCode || '',
      country: addressForm.country || 'United States',
      phone: addressForm.phone || profile.phone,
      isDefault: profile.addresses.length === 0 || !!addressForm.isDefault
    };

    onAddAddress(newAddr);
    setIsAddingAddress(false);
    setAddressForm({
      label: 'Home',
      fullName: profile.name,
      street: '',
      apt: '',
      city: '',
      state: 'CA',
      zipCode: '',
      country: 'United States',
      phone: profile.phone,
      isDefault: false
    });
  };

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardForm.cardNumber) return;
    const last4 = cardForm.cardNumber.replace(/\s/g, '').slice(-4) || '8842';
    
    const newCard: PaymentCard = {
      id: `pm-${Date.now()}`,
      holderName: cardForm.holderName,
      cardNumber: `•••• •••• •••• ${last4}`,
      last4,
      brand: 'visa',
      expMonth: cardForm.expMonth,
      expYear: cardForm.expYear,
      isDefault: profile.paymentMethods.length === 0
    };

    onAddPaymentMethod(newCard);
    setIsAddingCard(false);
    setCardForm({
      holderName: profile.name,
      cardNumber: '',
      expMonth: '12',
      expYear: '2028',
      cvv: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#11141a] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 bg-slate-950 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-bold flex items-center justify-center text-lg shadow-md">
              AS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{profile.name}</h2>
                <span className="text-[11px] font-mono bg-amber-400/10 text-amber-300 border border-amber-400/20 px-2 py-0.5 rounded">
                  {profile.memberTier}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {profile.email} · Member since {profile.memberSince}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close profile"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 bg-black/40 border-b border-white/10 flex items-center gap-1 sm:gap-2 overflow-x-auto text-xs font-semibold py-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'overview' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'orders' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Order History ({profile.orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'addresses' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Saved Addresses ({profile.addresses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'payments' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Saved Payments ({profile.paymentMethods.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'wishlist' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${wishlistProducts.length > 0 ? 'text-rose-400 fill-rose-400' : ''}`} />
            <span>Wishlist ({wishlistProducts.length})</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8 max-h-[600px] overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Membership Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-amber-400 mb-1">
                    <Award className="w-4 h-4" />
                    <span>Reward Points</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                    {profile.rewardPoints} pts
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {formatINR(profile.rewardPoints)} store credit
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 mb-1">
                    <Package className="w-4 h-4" />
                    <span>Past Orders</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                    {profile.orders.length}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Matter 1.3 verified
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2 text-xs text-sky-400 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>Addresses</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
                    {profile.addresses.length}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Faster checkout
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('wishlist')}
                  className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 hover:border-rose-400 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-xs text-rose-400 mb-1">
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    <span>Saved Wishlist</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums group-hover:text-rose-300">
                    {wishlistProducts.length} items
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 underline">
                    View favorites &rarr;
                  </div>
                </div>
              </div>

              {/* Recent Order Preview */}
              {profile.orders.length > 0 && (
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
                      Most Recent Shipment
                    </div>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      View all orders &rarr;
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white text-sm">{profile.orders[0].orderNumber}</div>
                      <div className="text-slate-400">{profile.orders[0].date} · {profile.orders[0].carrier}</div>
                    </div>
                    <div className="text-right">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-600/30 text-[11px] font-mono">
                        {profile.orders[0].status}
                      </span>
                      <div className="font-mono text-white font-bold mt-1 tabular-nums">
                        {formatINR(profile.orders[0].total)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Faster Checkout Helper Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 to-slate-900 border border-amber-400/20 flex items-start gap-4">
                <div className="p-2 rounded-xl bg-amber-400/20 text-amber-400 shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-bold text-white text-sm">Instant 1-Click Checkout Enabled</div>
                  <p className="text-slate-300 leading-relaxed">
                    Your default delivery address ({profile.addresses.find((a) => a.isDefault)?.label || 'Primary'}) and payment method are configured. During checkout, your information auto-populates for frictionless order placement.
                  </p>
                </div>
              </div>

              {/* Source Code Download Box */}
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Lumina Store Codebase (.ZIP)</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        2.8 MB
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Download all 32 source files including UPI payment gateway, room studio, and products database.
                    </p>
                  </div>
                </div>

                <a
                  href="/lumina-smart-home-code.zip"
                  download="lumina-smart-home-code.zip"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shrink-0 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download ZIP</span>
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: ORDER HISTORY */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {profile.orders.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No orders placed yet. Add items from the storefront to place your first order.
                </div>
              ) : (
                profile.orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-5"
                  >
                    {/* Order header row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-white font-mono">{order.orderNumber}</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[11px] font-mono border border-emerald-600/30">
                            {order.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          Ordered on {order.date} · Delivery to {order.shippingAddress.label}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onViewInvoice(order)}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                        >
                          Invoice &amp; Receipt
                        </button>
                        <button
                          onClick={() => onReorder(order)}
                          className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-xs font-bold text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Buy Again</span>
                        </button>
                      </div>
                    </div>

                    {/* Order Tracking Timeline Bar */}
                    <div className="bg-black/40 p-4 rounded-xl border border-white/[0.06] space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                          <Truck className="w-3.5 h-3.5 text-amber-400" />
                          <span>Carrier: {order.carrier}</span>
                        </span>
                        <span className="font-mono text-amber-300 text-[11px]">
                          Tracking: {order.trackingNumber}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 text-[11px]">
                        {order.timeline.map((step, idx) => (
                          <div key={idx} className="relative space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className={`w-2.5 h-2.5 rounded-full ${
                                step.completed ? 'bg-emerald-400' : 'bg-slate-700'
                              }`} />
                              <span className={`font-semibold ${
                                step.completed ? 'text-white' : 'text-slate-500'
                              }`}>
                                {step.title}
                              </span>
                            </div>
                            <div className="text-slate-500 text-[10px] pl-4">{step.time}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Itemized contents */}
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between gap-4 text-xs">
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover bg-slate-900 shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="font-semibold text-white truncate">{item.name}</div>
                              <div className="text-[11px] text-slate-400">Qty: {item.quantity} · {item.selectedColor || 'Standard'}</div>
                            </div>
                          </div>
                          <div className="font-mono font-bold text-white tabular-nums">
                            {formatINR(item.price * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Total cost strip */}
                    <div className="pt-3 border-t border-white/[0.06] flex justify-between items-center text-xs">
                      <div className="text-slate-400">
                        Paid via {order.paymentMethod.type === 'upi_qr' ? 'UPI (Google Pay)' : order.paymentMethod.type.toUpperCase()}{' '}
                        {order.paymentMethod.upiId && `(${order.paymentMethod.upiId})`}
                        {order.paymentMethod.last4 && `(•••• ${order.paymentMethod.last4})`}
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 mr-2">Total:</span>
                        <span className="text-sm font-bold font-mono text-amber-400 tabular-nums">
                          {formatINR(order.total)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-white">Saved Delivery Addresses</h3>
                  <p className="text-xs text-slate-400">
                    Addresses stored in your profile auto-fill at checkout for fast completion.
                  </p>
                </div>
                {!isAddingAddress && (
                  <button
                    onClick={() => setIsAddingAddress(true)}
                    className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Address</span>
                  </button>
                )}
              </div>

              {/* Add Address Form Modal/Inline */}
              {isAddingAddress && (
                <form onSubmit={handleSaveAddress} className="p-5 rounded-2xl bg-slate-900 border border-white/15 space-y-4 text-xs">
                  <div className="font-bold text-white">Add New Address</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 mb-1">Label (e.g. Home, Vacation House)</label>
                      <input
                        type="text"
                        value={addressForm.label}
                        onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                        placeholder="Home"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Recipient Name</label>
                      <input
                        type="text"
                        value={addressForm.fullName}
                        onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                        placeholder="Alex Sterling"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-slate-400 mb-1">Street Address</label>
                      <input
                        type="text"
                        value={addressForm.street}
                        onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                        placeholder="100 Market St"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Apt / Suite</label>
                      <input
                        type="text"
                        value={addressForm.apt}
                        onChange={(e) => setAddressForm({ ...addressForm, apt: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                        placeholder="Floor 4"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">City</label>
                      <input
                        type="text"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                        placeholder="San Francisco"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">State / Province</label>
                      <input
                        type="text"
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                        placeholder="CA"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">ZIP / Postal Code</label>
                      <input
                        type="text"
                        value={addressForm.zipCode}
                        onChange={(e) => setAddressForm({ ...addressForm, zipCode: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                        placeholder="94105"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingAddress(false)}
                      className="px-4 py-2 rounded-xl bg-white/[0.06] text-slate-300 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              )}

              {/* Address Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      addr.isDefault
                        ? 'bg-amber-400/5 border-amber-400/40'
                        : 'bg-white/[0.03] border-white/10'
                    }`}
                  >
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{addr.label}</span>
                          {addr.isDefault && (
                            <span className="text-[10px] font-mono bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-bold">
                              Default
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => onDeleteAddress(addr.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                          aria-label="Delete address"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-slate-200 font-medium">{addr.fullName}</div>
                      <div className="text-slate-400">{addr.street} {addr.apt && `, ${addr.apt}`}</div>
                      <div className="text-slate-400">{addr.city}, {addr.state} {addr.zipCode}</div>
                      <div className="text-slate-500 font-mono text-[11px] pt-1">{addr.phone}</div>
                    </div>

                    {!addr.isDefault && (
                      <div className="pt-4 mt-3 border-t border-white/[0.06]">
                        <button
                          onClick={() => onSetDefaultAddress(addr.id)}
                          className="text-xs text-amber-400 hover:text-amber-300 underline cursor-pointer"
                        >
                          Set as default shipping address
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SAVED PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-white">Saved Payment Methods</h3>
                  <p className="text-xs text-slate-400">
                    Encrypted payment tokens configured for 1-click checkout.
                  </p>
                </div>
                {!isAddingCard && (
                  <button
                    onClick={() => setIsAddingCard(true)}
                    className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Card</span>
                  </button>
                )}
              </div>

              {/* Add Card Form */}
              {isAddingCard && (
                <form onSubmit={handleSaveCard} className="p-5 rounded-2xl bg-slate-900 border border-white/15 space-y-4 text-xs">
                  <div className="font-bold text-white">Add New Card</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="block text-slate-400 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardForm.holderName}
                        onChange={(e) => setCardForm({ ...cardForm, holderName: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:border-amber-400"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-slate-400 mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardForm.cardNumber}
                        onChange={(e) => setCardForm({ ...cardForm, cardNumber: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono focus:outline-none focus:border-amber-400"
                        placeholder="•••• •••• •••• ••••"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Exp Month</label>
                      <input
                        type="text"
                        value={cardForm.expMonth}
                        onChange={(e) => setCardForm({ ...cardForm, expMonth: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono focus:outline-none focus:border-amber-400"
                        placeholder="12"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Exp Year</label>
                      <input
                        type="text"
                        value={cardForm.expYear}
                        onChange={(e) => setCardForm({ ...cardForm, expYear: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-black/50 border border-white/10 text-white font-mono focus:outline-none focus:border-amber-400"
                        placeholder="2028"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingCard(false)}
                      className="px-4 py-2 rounded-xl bg-white/[0.06] text-slate-300 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold"
                    >
                      Save Card
                    </button>
                  </div>
                </form>
              )}

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Verified UPI QR / Google Pay Account */}
                <div className="p-5 rounded-2xl border bg-amber-400/10 border-amber-400/40 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <QrCode className="w-5 h-5 text-amber-400" />
                        <span className="font-semibold text-white text-xs">Primary UPI ID</span>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                        Verified
                      </span>
                    </div>

                    <div className="font-mono text-sm font-bold text-amber-300 tracking-wide select-all">
                      nilanshithiske21@okicici
                    </div>

                    <div className="flex justify-between items-end text-xs text-slate-400">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">Provider</div>
                        <div className="text-slate-200">Google Pay (NPCI UPI)</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase">Status</div>
                        <div className="text-emerald-400 font-medium">Ready for 1-Click Pay</div>
                      </div>
                    </div>
                  </div>
                </div>

                {profile.paymentMethods.map((pm) => (
                  <div
                    key={pm.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      pm.isDefault
                        ? 'bg-white/[0.04] border-white/20'
                        : 'bg-white/[0.03] border-white/10'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <CreditCard className="w-5 h-5 text-amber-400" />
                        <button
                          onClick={() => onDeletePaymentMethod(pm.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="font-mono text-base font-bold text-white tracking-wider">
                        {pm.cardNumber}
                      </div>

                      <div className="flex justify-between items-end text-xs text-slate-400">
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase">Cardholder</div>
                          <div className="text-slate-200">{pm.holderName}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase">Expires</div>
                          <div className="text-slate-200">{pm.expMonth}/{pm.expYear}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
                    <span>My Saved Wishlist ({wishlistProducts.length})</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Hardware items and smart devices saved for future purchase or ecosystem planning.
                  </p>
                </div>

                {wishlistProducts.length > 0 && (
                  <button
                    onClick={onMoveAllWishlistToCart}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer transition-all shadow-md shrink-0"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Move All to Cart</span>
                  </button>
                )}
              </div>

              {wishlistProducts.length === 0 ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mx-auto text-slate-500">
                    <Heart className="w-8 h-8 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-white">Your wishlist is empty</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                      Tap the heart icon on any smart thermostat, lighting column, or security device to save it here for later.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-xs font-semibold text-white border border-white/10 transition-colors cursor-pointer"
                  >
                    Explore Hardware Catalog
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlistProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
                    >
                      <div className="flex gap-4 mb-4">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-20 h-20 rounded-xl object-cover bg-slate-900 shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[11px] uppercase tracking-wider font-semibold text-amber-400">
                              {prod.categoryLabel}
                            </span>
                            <button
                              onClick={() => onRemoveFromWishlist(prod.id)}
                              className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                              title="Remove from wishlist"
                              aria-label={`Remove ${prod.name} from wishlist`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate mt-0.5">
                            {prod.name}
                          </h4>

                          <div className="text-[11px] text-slate-400 truncate mt-0.5">
                            {prod.protocol}
                          </div>

                          <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-sm font-bold text-white font-mono tabular-nums">
                              {formatINR(prod.price)}
                            </span>
                            {prod.originalPrice && (
                              <span className="text-[11px] text-slate-500 line-through font-mono tabular-nums">
                                {formatINR(prod.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3">
                        <span className="text-[11px] text-emerald-400 font-medium">
                          In Stock ({prod.stockCount} units)
                        </span>

                        <button
                          onClick={() => onAddToCart(prod)}
                          className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-sm active:scale-95"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
