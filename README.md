# Lumina Home — Smart Living Store

An architectural smart home e-commerce platform built with React 19, TypeScript, Tailwind CSS, and Motion.

## Features

- **Store & Product Catalog**:
  - All prices displayed in Indian Rupees (INR `₹`) formatted with standard Indian numeral system.
  - Ecosystem filtering (Matter, Apple Home, Google Home, Alexa, Zigbee).
  - Category filtering (Climate, Lighting, Security, Access, Audio, Sensors).
  - Search by product name, features, or protocols.

- **Interactive Visualizers & Demos**:
  - **Interactive Room Studio**: Real-time room ambience visualizer across Living Room Lounge, Front Porch & Entryway, and Master Sanctuary with live lighting warmth, dimmer sliders, thermostat targets, and door locks.
  - **Live Device Simulators**: Interactive thermostat dial with heating/cooling modes, ambient lighting color temperature controls, live CCTV stream simulator, and biometric keypad lock simulation.
  - **Side-by-Side Product Comparison**: Compare specs, wireless protocols, Matter certification, and warranties across multiple devices.

- **Wishlist & Saved Favorites**:
  - Toggle heart icon on product cards or PDP modals.
  - Dedicated Wishlist view in the User Profile modal and quick header counter.
  - 1-click move from Wishlist into Cart.

- **Real E-Commerce Cart & Checkout**:
  - Cart drawer with quantity adjustments, warranty add-ons, free shipping threshold (₹12,000), and coupon support (`SMART20`, `MATTER10`).
  - Multi-step checkout with saved address quick-select, custom address book, shipping methods.
  - **Payment Gateway with Google Pay UPI QR Code**:
    - Real scannable UPI QR code generated dynamically for `nilanshithiske21@okicici` (Nilanshi Thiske).
    - One-click copy UPI ID and direct deep-link to UPI mobile apps.
    - Card payment simulation with 3D Secure verification step and Cash on Delivery option.
  - Printable official tax invoice receipt.

- **User Profile Management**:
  - Order history tracking with milestone timelines and 1-click re-ordering ("Buy Again").
  - Saved shipping addresses management.
  - Saved payment cards.
  - Wishlist management.

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Build for Production
```bash
npm run build
npm run preview
```

## Tech Stack
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Motion
- QRCode
