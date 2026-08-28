# NavaTeja Cranes — Product Requirements Document (PRD) & Technical Specification

> **Brand**: NavaTeja Cranes  
> **Headquarters**: Service & Office, Main Road, Jammalamadugu, Andhra Pradesh, PIN 516434  
> **Proprietor**: Daggupati Suresh Babu (18+ Years Crane Industry Leadership)  
> **Primary Contact**: +91 94924 10821 | +91 70757 08980  
> **WhatsApp Booking**: https://wa.me/919492410821  

---

## 1. Executive Summary & Product Vision

**NavaTeja Cranes** is a high-end digital web application engineered to showcase the premier heavy crane rental, industrial erection, and infrastructure lifting operations of NavaTeja Cranes across Andhra Pradesh. 

The application combines **3D spatial perspective dynamics, light luxury aesthetics, radial spiral service layouts, horizontal landscape fleet cards, and mobile-first responsiveness** to build instant trust with industrial clients, plant managers, and infrastructure contractors.

---

## 2. Core Brand Identity & Business Profile

| Property | Details |
|---|---|
| **Business Name** | NavaTeja Cranes |
| **Founder & Proprietor** | Daggupati Suresh Babu (18+ Years Leadership) |
| **Physical Address** | NavaTeja Cranes Service & Office, Main Road, Jammalamadugu, AP, PIN 516434 |
| **Fleet Infrastructure** | Farana Pick & Carry Cranes: **15T** (Most Popular), **23T**, and **25T** |
| **Equipment Brands** | ACE (Action Construction Equipment) & ESCORT (Escorts Construction Equipment) |
| **Target Clients** | Steel plants, cement manufacturers, highway/bridge infrastructure, power generation |
| **Client Portfolio** | JSW Steel, DALMIA Cement, UltraTech Cement, RAMCO Cement, WINGS, Singareni Collieries, Sathavahana Ispat, APGENCO, ITC Limited, Krishnapatnam Port |

---

## 3. Light Theme Color System & Psychology

The application uses a **light luxury industrial theme** with zero dark-mode elements to communicate cleanliness, safety, precision, and high-visibility authority:

```css
:root {
  /* Canvas Background */
  --bg-primary: #F8F4EE;         /* Warm Cream Base */
  --bg-secondary: #FFFDF9;       /* Soft Alabaster Panel Base */
  --glass-bg: rgba(255,255,255,0.85); /* Frost Glass Blur */

  /* Text & Contrast */
  --text-primary: #0D1B3E;       /* Deep Industrial Navy */
  --text-secondary: #334155;     /* Slate Neutral Body */
  --text-muted: #64748B;         /* Steel Gray Subtitles */

  /* Accents */
  --accent-gold: #D4860A;        /* High-Visibility Safety Gold */
  --accent-orange: #C4520A;      /* Energetic Safety Orange */
  --accent-blue: #1550A0;        /* Industrial Trust Navy-Blue */
}
```

---

## 4. Comprehensive Mobile Responsiveness Specification

The website is engineered for **100% fluid responsiveness** across all device form factors from 4K desktop displays down to ultra-compact smartphones.

### 4.1 Responsive Breakpoints

| Breakpoint Range | Device Target | Layout Mode |
|---|---|---|
| **> 1100px** | Desktop & Ultra-wide | Full Horizontal Landscape Layouts + 3D Mesh + Radial Spiral Hub |
| **880px – 1099px** | Laptops & Small Desktops | Condensed 2-Column Horizontal Cards |
| **768px – 879px** | Tablets & iPads | Single-Column Wide Stack + Grid Fallbacks |
| **< 767px** | Mobile Smartphones | Vertical Stack + Mobile Carousel + Touch Controls |
| **< 480px** | Compact Mobile | Full-Width Single Column, Reduced Padding (1.2rem) |

---

### 4.2 Section-by-Section Mobile Adaptations

#### A. Header & Navigation Bar
- **Desktop (>880px)**: Horizontal sticky glass bar with brand logo (`logo.jpeg`), navigation links (`Home`, `About`, `Fleet`, `Services`, `Projects`, `Leadership`, `Trust`, `Contact`), and `Book Consultation` CTA pill button.
- **Mobile (<880px)**: Sticky navbar with brand logo image and instant tap-to-call / WhatsApp touch button. Navigation links overflow horizontally with touch scroll or collapse into clean touch targets.

#### B. Hero Section
- **Desktop**: 2-column spatial header with animated stats counter row (`50+ Crane Fleet Units`, `10,000+ Lifts`, `100% Zero Harm`).
- **Mobile**: Single-column centered text layout. Stats row transforms into a 2x2 grid card box with tap-friendly numbers.

#### C. Client Marquee (Infinite Scroll Track)
- **Desktop**: CSS infinite horizontal marquee with mask-image gradient fade edges holding JSW Steel (`jsw-logo.png`), DALMIA (`dalmia-logo.jpeg`), UltraTech (`ultratech-logo.png`), RAMCO (`ramco-logo.jpeg`), and vector client badges.
- **Mobile**: Touch-swipe enabled infinite marquee with responsive logo heights (28px height on mobile vs 36px on desktop).

#### D. About & Leadership Section
- **Desktop**: 2-column layout (Left: 3D rotating brand cube, Right: Philosophy bullets).
- **Mobile**: 3D cube scales to 120px; philosophy text stacks vertically with full-width bullet rows.

#### E. Spiral Services Showcase
- **Desktop (>900px)**: 3D Radial Spiral Hub containing the circular NavaTeja Cranes logo (`logo.jpeg`) connected via animated SVG dashed lines to 6 radial service cards (`01 Crane Rentals`, `02 Industrial Erection`, `03 Infrastructure Lifting`, `04 Rigging & Transport`, `05 Load Engineering`, `06 Safety & Inspection`).
- **Mobile (<900px)**: Radial SVG hidden automatically; converts to `.services-mobile-grid` featuring 6 clean, touch-friendly service cards with SVG vector icons.

#### F. Crane Fleet Section (`#fleet`)
- **Desktop (>880px)**: Wide horizontal landscape banner cards (`grid-template-columns: 340px 1fr`).
  - **Left**: Capacity badge (`15T`, `23T`, `25T`), real crane image frame (`f150.webp`, `all.webp`, `escort.webp`), and animated load bar.
  - **Right**: Model name, ACE/ESCORT brand tag, 2-column horizontal spec grid, and direct booking button.
- **Mobile (<880px)**: Stacks vertically (`grid-template-columns: 1fr`). Image frame scales to `160px` height with `object-fit: cover`. Spec grid collapses to 1 column.

#### G. Monuments of Excellence Portfolio (`#showcase`)
- **Desktop (>850px)**: Horizontal landscape cards (`grid-template-columns: 320px 1fr`) with client gradient header + white logo badge on left, project details on right.
- **Mobile (<850px)**: Stacks vertically into single-column cards with responsive 180px banner headers.

#### H. Leadership & Proprietor Spotlight (`#leadership`)
- **Desktop (>800px)**: Full-width horizontal landscape card (`grid-template-columns: 220px 1fr`) for **Daggupati Suresh Babu** with `18+ Years Leadership` badge and `founder.jpeg` photo cropped at `object-position: center 88%`.
- **Mobile (<800px)**: Stacks vertically into a centered portrait spotlight card with centered highlight pills.

#### I. Certified Operators Spotlight (`#operators`)
- **Desktop (>900px)**: 3-column horizontal grid (*ISO Certified*, *10,000+ Lifts*, *24/7 Readiness*).
- **Mobile (<900px)**: Single-column vertical feature card stack with 1rem touch padding.

#### J. Contact Section & Footer (`#contact`)
- **Desktop**: 2-column split (Left: Address & Direct Call links for `+91 94924 10821` / `+91 70757 08980`, Right: Office Consultation Form).
- **Mobile**: Stacks vertically with full-width input fields and 100% width `Send VIP Enquiry` CTA button.

---

## 5. 3D Interaction Physics & Performance Engine

```javascript
/* Mobile-Adaptive 3D Engine Parameters */
const isMobile = window.innerWidth < 768;
const particleCount = isMobile ? 30 : 70; // Adaptive particle count for 60fps performance
const fov = isMobile ? 450 : 600;         // Mobile 3D camera field-of-view perspective
```

### 3D Features Integrated:
1. **WebGL / Canvas Floating Polyhedrons**: Real 3D projected cubes & octahedrons rotating in background space with mouse camera tracking.
2. **Card Tilt Engine**: `perspective(1000px) rotateX(...) rotateY(...) translateZ(...)` with dynamic specular light reflection (`card-3d-shine`).
3. **Z-Layer Child Elevation**: Inner elements (capacity badges, client logo cards, crane images) pop forward on hover (`translateZ(40px)`).

---

## 6. Verification Checklist & Quality Standards

- [x] **Zero Emojis**: 100% replaced with vector SVG icons.
- [x] **Real Client Logos**: JSW (`jsw-logo.png`), DALMIA (`dalmia-logo.jpeg`), UltraTech (`ultratech-logo.png`), RAMCO (`ramco-logo.jpeg`).
- [x] **Real Crane Photos**: 15T (`f150.webp`), 23T (`all.webp`), 25T (`escort.webp`).
- [x] **Real Founder Photo**: Daggupati Suresh Babu (`founder.jpeg`) with `center 88%` face crop.
- [x] **Real Contact Info**: `+91 94924 10821` & `+91 70757 08980` (WhatsApp: `https://wa.me/919492410821`).
- [x] **Local Identity**: NavaTeja Cranes Service & Office, Main Road, Jammalamadugu, AP 516434.
- [x] **Horizontal Layout System**: Fleet cards, Portfolio cards, and Leadership cards rendered as wide horizontal landscape banners.
- [x] **100% Mobile Responsive**: Tested across desktop, laptop, tablet, and mobile viewports.
