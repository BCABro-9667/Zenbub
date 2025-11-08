# 📁 Zanbu E-commerce - Project Structure

```
Zanbu/
│
├── 📁 app/                          # Next.js App Router
│   ├── 📁 admin/                    # Admin Dashboard
│   │   ├── 📁 products/
│   │   │   └── page.tsx            # Product management with TinyMCE
│   │   ├── 📁 categories/
│   │   │   └── page.tsx            # Category management
│   │   ├── 📁 orders/
│   │   │   └── page.tsx            # Order management
│   │   ├── 📁 leads/
│   │   │   └── page.tsx            # Lead management
│   │   └── page.tsx                 # Admin dashboard home
│   │
│   ├── 📁 api/                      # API Routes (Backend)
│   │   ├── 📁 products/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts        # GET, PUT, DELETE single product
│   │   │   └── route.ts            # GET all, POST new product
│   │   ├── 📁 categories/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts        # GET, PUT, DELETE single category
│   │   │   └── route.ts            # GET all, POST new category
│   │   ├── 📁 orders/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts        # GET, PUT single order
│   │   │   └── route.ts            # GET all, POST new order
│   │   ├── 📁 leads/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts        # GET, PUT, DELETE single lead
│   │   │   └── route.ts            # GET all, POST new lead
│   │   └── 📁 upload/
│   │       └── route.ts            # Cloudinary image upload
│   │
│   ├── 📁 category/
│   │   └── 📁 [slug]/
│   │       └── page.tsx            # Dynamic category page
│   │
│   ├── 📁 cart/
│   │   └── page.tsx                # Shopping cart page
│   │
│   ├── page.tsx                     # Homepage
│   ├── layout.tsx                   # Root layout with fonts
│   └── globals.css                  # Global styles (Tailwind)
│
├── 📁 components/                   # Reusable React Components
│   ├── Header.tsx                   # Site header with cart
│   ├── Footer.tsx                   # Site footer
│   ├── HeroSlider.tsx              # Homepage hero slider (Swiper)
│   ├── CategoryCircles.tsx         # Category navigation circles
│   ├── ProductCard.tsx             # Product display card
│   ├── ProductSection.tsx          # Product grid section
│   ├── CheckoutModal.tsx           # Buy now modal with form
│   └── AdminLayout.tsx             # Admin dashboard layout
│
├── 📁 models/                       # MongoDB/Mongoose Models
│   ├── Product.ts                   # Product schema
│   ├── Category.ts                  # Category schema
│   ├── Order.ts                     # Order schema
│   └── Lead.ts                      # Lead schema
│
├── 📁 store/                        # State Management (Zustand)
│   └── cartStore.ts                 # Shopping cart state
│
├── 📁 lib/                          # Utility Functions
│   ├── mongodb.ts                   # MongoDB connection
│   ├── cloudinary.ts                # Cloudinary config & upload
│   └── utils.ts                     # Helper functions (slug, price format)
│
├── 📁 types/                        # TypeScript Definitions
│   └── global.d.ts                  # Global type definitions
│
├── 📄 Configuration Files
│   ├── package.json                 # Dependencies & scripts
│   ├── tsconfig.json                # TypeScript config
│   ├── tailwind.config.js           # Tailwind CSS config
│   ├── postcss.config.js            # PostCSS config
│   ├── next.config.js               # Next.js config
│   ├── .eslintrc.json               # ESLint config
│   ├── .env.local                   # Environment variables (SECRET!)
│   └── .gitignore                   # Git ignore rules
│
└── 📄 Documentation
    ├── README.md                    # Project overview
    └── INSTALLATION.md              # Setup guide

```

---

## 🎯 Key Files Explained

### Frontend Components

#### `app/page.tsx` - Homepage
- Hero slider
- Category circles
- Featured products
- Top rated products
- Best sellers
- New arrivals
- Promotional banner
- Contact section

#### `components/ProductCard.tsx`
- Product image
- Product name
- Price display
- Discount badge (if compare price exists)
- Add to cart button
- Buy now button

#### `components/CheckoutModal.tsx`
- Product details preview
- Quantity selector (+ / -)
- Customer information form:
  - Name, Email, Phone
  - Address, City, State, ZIP
  - Order notes
- Total calculation
- COD payment option
- Form validation

#### `components/HeroSlider.tsx`
- Swiper carousel
- Auto-play enabled
- Pagination dots
- Navigation arrows
- Responsive design

### Backend API Routes

#### Products API (`/api/products`)
```typescript
GET     /api/products              // Get all products
GET     /api/products?category=X   // Filter by category
GET     /api/products?featured=true // Get featured products
POST    /api/products              // Create new product
GET     /api/products/:id          // Get single product
PUT     /api/products/:id          // Update product
DELETE  /api/products/:id          // Delete product
```

#### Categories API (`/api/categories`)
```typescript
GET     /api/categories            // Get all categories
POST    /api/categories            // Create category
PUT     /api/categories/:id        // Update category
DELETE  /api/categories/:id        // Delete category
```

#### Orders API (`/api/orders`)
```typescript
GET     /api/orders                // Get all orders
POST    /api/orders                // Create new order
PUT     /api/orders/:id            // Update order status
```

### Database Models

#### Product Model
```typescript
{
  name: string,
  slug: string,
  description: string,
  price: number,
  comparePrice?: number,
  images: string[],
  category: string,
  stock: number,
  sku?: string,
  isActive: boolean,
  isFeatured: boolean,
  isTopRated: boolean,
  isTopSale: boolean,
  rating?: number,
  reviewCount?: number
}
```

#### Order Model
```typescript
{
  orderNumber: string,
  items: [{
    product: string,
    name: string,
    price: number,
    quantity: number,
    image: string
  }],
  customer: {
    name, email, phone,
    address, city, state, zipCode
  },
  totalAmount: number,
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled',
  paymentMethod: 'cod' | 'online'
}
```

### State Management

#### Cart Store (Zustand)
```typescript
{
  items: CartItem[],
  addItem: (product) => void,
  removeItem: (productId) => void,
  updateQuantity: (productId, quantity) => void,
  clearCart: () => void,
  getTotalItems: () => number,
  getTotalPrice: () => number
}
```

**Features:**
- Persistent storage (localStorage)
- Real-time updates
- Automatic totals calculation

---

## 🔄 Data Flow

### Adding a Product (Admin)
```
Admin Form → TinyMCE Editor → Image Upload (Cloudinary) 
  → POST /api/products → MongoDB → Success Toast
```

### Customer Purchase Flow
```
Browse Products → Add to Cart (Zustand Store) 
  → Cart Page → Buy Now Modal → Fill Form 
  → POST /api/orders → MongoDB → Order Created
```

### Category Navigation
```
Click Category Circle → Navigate to /category/[slug] 
  → GET /api/products?category=slug → Display Products
```

---

## 🎨 Styling System

### Tailwind CSS Classes

**Custom Utilities (in globals.css):**
```css
.btn-primary        // Primary button style
.btn-secondary      // Secondary button style
.input-field        // Form input style
.card               // Card container style
.container          // Page container with max-width
```

**Color Scheme:**
```javascript
primary: #2563eb    // Blue (buttons, links, prices)
secondary: #64748b  // Gray (text, borders)
accent: #f59e0b     // Amber (highlights, badges)
```

---

## 🔐 Environment Variables

```env
MONGODB_URI                    # MongoDB Atlas connection
CLOUDINARY_CLOUD_NAME          # Cloudinary account name
CLOUDINARY_API_KEY             # Cloudinary API key
CLOUDINARY_API_SECRET          # Cloudinary API secret
NEXT_PUBLIC_TINYMCE_API_KEY    # TinyMCE editor key
NEXT_PUBLIC_API_URL            # Base API URL
```

**Security:**
- `.env.local` is gitignored
- Never commit sensitive data
- Use environment variables in production

---

## 📦 Dependencies

### Core
- **next** (14.2.5) - React framework
- **react** (18.3.1) - UI library
- **typescript** (5.5.3) - Type safety

### Database
- **mongoose** (8.5.1) - MongoDB ODM

### Storage & Upload
- **cloudinary** (2.4.0) - Image CDN

### UI & Styling
- **tailwindcss** (3.4.6) - Utility CSS
- **lucide-react** (0.417.0) - Icons
- **swiper** (11.1.5) - Carousel slider

### State & Forms
- **zustand** (4.5.4) - State management
- **react-hook-form** (7.52.1) - Form handling

### Rich Text
- **@tinymce/tinymce-react** (5.1.1) - WYSIWYG editor

### HTTP & Notifications
- **axios** (1.7.2) - HTTP client
- **react-hot-toast** (2.4.1) - Notifications
- **swr** (2.2.5) - Data fetching

---

## 🚀 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## 🔍 Key Features Implementation

### 1. Shopping Cart
- **Location:** `store/cartStore.ts`
- **Persistence:** localStorage
- **Features:** Add, remove, update quantity, clear

### 2. Image Upload
- **Location:** `app/api/upload/route.ts`
- **Service:** Cloudinary
- **Process:** File → Base64 → Cloudinary → URL

### 3. Rich Text Editor
- **Location:** Admin product form
- **Tool:** TinyMCE
- **Features:** Formatting, lists, links, tables

### 4. Checkout Modal
- **Location:** `components/CheckoutModal.tsx`
- **Fields:** Customer info, quantity, notes
- **Payment:** COD (Cash on Delivery)

### 5. Dynamic Routes
- **Categories:** `/category/[slug]`
- **Products:** API filters by slug

---

## 🎯 Admin Dashboard Features

1. **Product Management**
   - Add/Edit/Delete products
   - Rich text descriptions
   - Multiple image upload
   - Stock management
   - Featured/Top Rated/Top Sale flags

2. **Category Management**
   - Add/Edit/Delete categories
   - Icon/Emoji support
   - Image upload
   - Active/Inactive status

3. **Order Management**
   - View all orders
   - Update order status
   - View customer details
   - Track order items

4. **Lead Management**
   - View customer inquiries
   - Update lead status
   - Track conversion funnel

---

This structure provides a complete, modern e-commerce solution with separate customer and admin experiences! 🎉
