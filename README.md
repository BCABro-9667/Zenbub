# Zanbu - Modern E-commerce Platform

A full-featured e-commerce website with admin dashboard built with Next.js 14, MongoDB, Cloudinary, and TinyMCE.

## 🚀 Features

### Customer-Facing Website
- **Modern UI**: Clean, white, responsive design
- **Hero Slider**: Eye-catching carousel for promotions
- **Category Circles**: Visual category navigation
- **Product Sections**: Featured, Top Rated, Best Sellers, New Arrivals
- **Product Cards**: Display image, name, price, and quick actions
- **Shopping Cart**: Add to cart functionality with persistent storage
- **Buy Now Modal**: Quick checkout with COD (Cash on Delivery)
- **Category Pages**: Filter products by category
- **Responsive Design**: Works on all devices

### Admin Dashboard
- **Product Management**: Create, edit, delete products with TinyMCE rich text editor
- **Category Management**: Organize products into categories
- **Order Management**: View and manage customer orders
- **Lead Management**: Track customer inquiries
- **Image Upload**: Cloudinary integration for optimized image storage
- **Intuitive Interface**: Easy-to-use admin panel

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB Atlas
- **Image Storage**: Cloudinary
- **Rich Text Editor**: TinyMCE
- **State Management**: Zustand
- **HTTP Client**: Axios
- **UI Components**: Lucide Icons, Swiper
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download Here](https://nodejs.org/)
- **npm** or **yarn** package manager

## 🔧 Installation & Setup

### 1. Install Node.js

If you haven't installed Node.js yet:
1. Download from https://nodejs.org/
2. Install the LTS version
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### 2. Install Dependencies

Open terminal/PowerShell in the project directory and run:

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 3. Environment Variables

The `.env.local` file is already configured with your credentials:
- MongoDB Atlas connection
- Cloudinary credentials
- TinyMCE API key

**Important**: Keep this file secure and never commit it to public repositories!

### 4. Start Development Server

```bash
npm run dev
```

The application will start on http://localhost:3000

## 📱 Pages & Routes

### Public Routes
- `/` - Home page with hero slider, categories, and product sections
- `/category/[slug]` - Category-specific products
- `/cart` - Shopping cart
- `/contact` - Contact page

### Admin Routes
- `/admin` - Admin dashboard
- `/admin/products` - Product management
- `/admin/categories` - Category management
- `/admin/orders` - Order management
- `/admin/leads` - Lead management

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change theme colors:
```javascript
colors: {
  primary: '#2563eb',    // Blue
  secondary: '#64748b',  // Gray
  accent: '#f59e0b',     // Amber
}
```

### Hero Slider
Edit `components/HeroSlider.tsx` to customize slides.

### Categories
Use the admin panel at `/admin/categories` to add/edit categories.

## 📦 Database Models

### Product
- name, slug, description
- price, comparePrice
- images, category
- stock, SKU
- isFeatured, isTopRated, isTopSale
- isActive, rating, reviewCount

### Category
- name, slug, description
- image, icon
- isActive

### Order
- orderNumber, items
- customer details
- totalAmount, status
- paymentMethod

### Lead
- name, email, phone
- message, source, status

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

## 📝 Adding Sample Data

Use the admin dashboard to add:
1. **Categories**: Fashion, Electronics, Home & Living, etc.
2. **Products**: Add product details, images, pricing
3. Mark products as Featured/Top Rated/Top Sale

## 🔑 Key Features Implementation

### Shopping Cart
- Uses Zustand for state management
- Persists cart data in localStorage
- Real-time cart updates

### Checkout Modal
- Quick buy functionality
- Form validation
- COD payment method
- Order generation with unique order number

### Image Upload
- Cloudinary integration
- Automatic optimization
- Multiple image support

### Rich Text Editor
- TinyMCE for product descriptions
- Full formatting capabilities
- Media embedding support

## 🐛 Troubleshooting

### Node.js Not Found
- Reinstall Node.js from https://nodejs.org/
- Restart your terminal/IDE

### MongoDB Connection Error
- Check your internet connection
- Verify MongoDB URI in `.env.local`
- Ensure IP is whitelisted in MongoDB Atlas

### Cloudinary Upload Fails
- Verify Cloudinary credentials
- Check file size limits
- Ensure proper image format

## 📄 License

This project is created for educational and commercial purposes.

## 🤝 Support

For issues or questions:
- Check the code comments
- Review the documentation
- Test in development mode first

## 🎯 Next Steps

1. Install Node.js (if not already installed)
2. Run `npm install`
3. Run `npm run dev`
4. Access admin at `/admin`
5. Add categories and products
6. Test the website!

---

**Built with ❤️ using Next.js, MongoDB, and modern web technologies**
"# Zenbuuu" 
