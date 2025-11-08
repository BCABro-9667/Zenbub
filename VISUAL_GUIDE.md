# 🗺️ Zanbu E-commerce - Visual Guide

## 🌐 Website Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     CUSTOMER WEBSITE                         │
└─────────────────────────────────────────────────────────────┘

                    Homepage (/)
                         │
        ┌────────────────┼────────────────┐
        │                │                │
    Hero Slider   Category Circles   Product Sections
        │                │                │
        │         ┌──────┴──────┐        │
        │         │             │        │
        │    Electronics    Fashion     │
        │         │             │        │
        │    (Category Page)    │        │
        │                       │        │
        └───────────────┬───────┴────────┘
                        │
                  Product Card
                        │
              ┌─────────┴─────────┐
              │                   │
         Add to Cart          Buy Now
              │                   │
         Cart Page          Checkout Modal
              │                   │
         Checkout Modal      Fill Form (COD)
              │                   │
         Fill Form (COD)          │
              │                   │
              └─────────┬─────────┘
                        │
                  Create Order
                        │
                    Success!


┌─────────────────────────────────────────────────────────────┐
│                     ADMIN DASHBOARD                          │
└─────────────────────────────────────────────────────────────┘

                Admin Dashboard (/admin)
                         │
        ┌────────────────┼────────────────┬────────────┐
        │                │                │            │
    Products        Categories        Orders       Leads
        │                │                │            │
        │                │                │            │
   [+ Add New]      [+ Add New]      [View All]   [View All]
        │                │                │            │
    TinyMCE          Icon/Image      Update Status  Update Status
    Editor           Upload
        │                │
    Cloudinary       Active/
    Upload           Inactive
        │                │
   Save Product     Save Category
```

---

## 🔄 Data Flow

### Customer Makes a Purchase

```
1. Browse Homepage
   ↓
2. Click Category (e.g., Electronics)
   ↓
3. View Products in that Category
   ↓
4. Click "Buy Now" on a Product
   ↓
5. Checkout Modal Opens
   ↓
6. Select Quantity (+ / -)
   ↓
7. Fill Customer Form:
   - Name
   - Email
   - Phone
   - Address (Street, City, State, ZIP)
   - Order Notes (optional)
   ↓
8. Review Total Amount
   ↓
9. Click "Place Order"
   ↓
10. Order Saved to MongoDB
    ↓
11. Success Notification
    ↓
12. Admin Can See Order in Dashboard
```

### Admin Adds a Product

```
1. Login to Admin (/admin)
   ↓
2. Click "Products"
   ↓
3. Click "+ Add Product"
   ↓
4. Fill Form:
   - Product Name
   - Select Category
   - Price & Compare Price
   - Stock & SKU
   - Description (TinyMCE Editor)
   - Upload Images (Cloudinary)
   - Check Featured/Top Rated/Top Sale
   ↓
5. Click "Create"
   ↓
6. Product Saved to MongoDB
   ↓
7. Product Appears on Website
   ↓
8. Customers Can Now Purchase
```

---

## 📊 Database Schema Visualization

```
┌──────────────────────────────────────────────────┐
│              MONGODB DATABASE                    │
└──────────────────────────────────────────────────┘

┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌─────────────┐
│  PRODUCTS   │    │  CATEGORIES  │    │   ORDERS    │    │    LEADS    │
├─────────────┤    ├──────────────┤    ├─────────────┤    ├─────────────┤
│ _id         │    │ _id          │    │ _id         │    │ _id         │
│ name        │───▶│ name         │    │ orderNumber │    │ name        │
│ slug        │    │ slug         │    │ items[]     │    │ email       │
│ description │    │ description  │    │ customer{}  │    │ phone       │
│ price       │    │ image        │    │ totalAmount │    │ message     │
│ comparePrice│    │ icon         │    │ status      │    │ status      │
│ images[]    │    │ isActive     │    │ paymentMethod│   │ source      │
│ category    │    │ createdAt    │    │ notes       │    │ createdAt   │
│ stock       │    │ updatedAt    │    │ createdAt   │    │ updatedAt   │
│ sku         │    └──────────────┘    │ updatedAt   │    └─────────────┘
│ isActive    │                         └─────────────┘
│ isFeatured  │
│ isTopRated  │
│ isTopSale   │
│ rating      │
│ reviewCount │
│ createdAt   │
│ updatedAt   │
└─────────────┘

Legend:
───▶ : Relationship (Product references Category by slug)
```

---

## 🎨 UI Component Hierarchy

```
App
│
├── Header (on all pages)
│   ├── Logo
│   ├── Navigation Links
│   └── Cart Icon (with count badge)
│
├── Pages
│   │
│   ├── Homepage (/)
│   │   ├── HeroSlider
│   │   ├── CategoryCircles
│   │   ├── ProductSection (Featured)
│   │   ├── Banner
│   │   ├── ProductSection (Top Rated)
│   │   ├── ProductSection (Best Sellers)
│   │   ├── ProductSection (New Arrivals)
│   │   └── Contact Section
│   │
│   ├── Category Page (/category/[slug])
│   │   ├── Category Title
│   │   └── Product Grid
│   │       └── ProductCard (multiple)
│   │
│   ├── Cart Page (/cart)
│   │   ├── Cart Items List
│   │   ├── Quantity Controls
│   │   ├── Total Calculator
│   │   └── Checkout Button
│   │
│   └── Admin Pages (/admin/*)
│       ├── AdminLayout
│       │   ├── Sidebar Navigation
│       │   └── Content Area
│       │
│       ├── Dashboard
│       ├── Products (with TinyMCE)
│       ├── Categories
│       ├── Orders
│       └── Leads
│
├── Modals
│   └── CheckoutModal
│       ├── Product Preview
│       ├── Quantity Selector
│       ├── Customer Form
│       └── Submit Button
│
└── Footer (on all pages)
    ├── Company Info
    ├── Quick Links
    ├── Customer Service
    └── Contact Details
```

---

## 🔧 Technology Stack Map

```
┌────────────────────────────────────────────────────┐
│                  FRONTEND                          │
├────────────────────────────────────────────────────┤
│ Next.js 14 (App Router)                           │
│   ├── React 18 (UI Components)                    │
│   ├── TypeScript (Type Safety)                    │
│   └── Tailwind CSS (Styling)                      │
│                                                     │
│ UI Libraries:                                      │
│   ├── Swiper (Hero Slider)                        │
│   ├── Lucide Icons (Icons)                        │
│   └── React Hot Toast (Notifications)             │
│                                                     │
│ State Management:                                  │
│   └── Zustand (Shopping Cart)                     │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│                   BACKEND                          │
├────────────────────────────────────────────────────┤
│ Next.js API Routes                                 │
│   ├── /api/products                                │
│   ├── /api/categories                              │
│   ├── /api/orders                                  │
│   ├── /api/leads                                   │
│   └── /api/upload                                  │
│                                                     │
│ Database:                                          │
│   └── MongoDB Atlas (Cloud)                        │
│       └── Mongoose (ODM)                           │
└────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────┐
│               THIRD-PARTY SERVICES                 │
├────────────────────────────────────────────────────┤
│ Cloudinary:                                        │
│   ├── Image Upload                                 │
│   ├── Image Optimization                           │
│   └── CDN Delivery                                 │
│                                                     │
│ TinyMCE:                                           │
│   └── Rich Text Editor (Product Descriptions)      │
└────────────────────────────────────────────────────┘
```

---

## 🛒 Shopping Cart Flow

```
┌─────────────────────────────────────────────────┐
│            SHOPPING CART SYSTEM                  │
└─────────────────────────────────────────────────┘

Product Page
     │
     │ Click "Add to Cart"
     ↓
┌──────────────┐
│ Zustand Store│ ←─ Persistent Storage (localStorage)
│  (Cart State)│
└──────────────┘
     │
     ├─→ Cart Count Badge (Header)
     │
     ├─→ Cart Page (/cart)
     │      │
     │      ├─ Show All Items
     │      ├─ Quantity Controls (+ / -)
     │      ├─ Remove Item Button
     │      ├─ Total Calculation
     │      └─ Checkout Button
     │
     └─→ Checkout Modal
            │
            ├─ Product Details
            ├─ Quantity Selector
            ├─ Customer Form
            └─ Place Order
                  │
                  ↓
            MongoDB (Orders Collection)
                  │
                  ↓
            Admin Dashboard (View Order)
```

---

## 📸 Image Upload Flow

```
Admin Product Form
       │
       │ Select Image File
       ↓
┌──────────────────┐
│ File Input       │
└──────────────────┘
       │
       │ Convert to Base64
       ↓
┌──────────────────┐
│ POST /api/upload │
└──────────────────┘
       │
       │ Send to Cloudinary
       ↓
┌──────────────────┐
│   Cloudinary     │
│   - Optimize     │
│   - Store        │
│   - Generate URL │
└──────────────────┘
       │
       │ Return Image URL
       ↓
┌──────────────────┐
│ Product Form     │
│ (Store URL)      │
└──────────────────┘
       │
       │ Save Product
       ↓
┌──────────────────┐
│   MongoDB        │
│ (images array)   │
└──────────────────┘
       │
       │ Display on Website
       ↓
┌──────────────────┐
│ Product Card     │
│ <img src="URL"/> │
└──────────────────┘
```

---

## 🎯 Feature Implementation Map

```
REQUESTED FEATURE              IMPLEMENTATION
─────────────────────────────────────────────────────────
Modern E-commerce Website   →  Next.js 14 App
Admin Dashboard Panel       →  /admin/* pages
Manage Products            →  Full CRUD + TinyMCE
Manage Categories          →  Full CRUD + Icons
Manage Leads               →  Lead tracking system
Hero Slider                →  Swiper carousel
Category Circles           →  CategoryCircles component
Top Rated Products         →  isTopRated flag + filter
Top Sale Products          →  isTopSale flag + filter
Recent Products            →  Sort by createdAt
Big Banner                 →  Promotional section
Contact Details            →  Footer + Contact section
Category-Specific Pages    →  /category/[slug]
Simple Modern Clean UI     →  Tailwind + White theme
Product Cards              →  Image + Name + Price + Buttons
Buy Button Modal           →  CheckoutModal component
Product Details in Modal   →  Full product info display
Qty Inc/Dec                →  + / - buttons
COD Form Fields            →  Complete customer form
Add to Cart                →  Zustand store + persistence
MongoDB Integration        →  Mongoose + Atlas
Cloudinary Integration     →  Upload API + CDN
TinyMCE Integration        →  Rich text editor
```

---

## 🚀 Quick Start Visual Guide

```
STEP 1: Install Node.js
┌────────────────────────┐
│  nodejs.org            │
│  Download LTS Version  │
│  Install & Restart PC  │
└────────────────────────┘
         ↓
STEP 2: Install Dependencies
┌────────────────────────┐
│  Open Terminal         │
│  npm install           │
│  Wait 2-5 minutes      │
└────────────────────────┘
         ↓
STEP 3: Start Server
┌────────────────────────┐
│  npm run dev           │
│  Server starts on 3000 │
└────────────────────────┘
         ↓
STEP 4: Access Website
┌────────────────────────┐
│  localhost:3000        │
│  localhost:3000/admin  │
└────────────────────────┘
         ↓
STEP 5: Add Content
┌────────────────────────┐
│  Add Categories        │
│  Add Products          │
│  Upload Images         │
└────────────────────────┘
         ↓
STEP 6: Test Everything
┌────────────────────────┐
│  Browse Products       │
│  Add to Cart           │
│  Place Order           │
│  Check Admin Panel     │
└────────────────────────┘
         ↓
      SUCCESS! 🎉
```

---

This visual guide should help you understand how all the pieces fit together!
