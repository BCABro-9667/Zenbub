# 🚀 QUICK START GUIDE - Zanbu E-commerce Platform

## ⚠️ IMPORTANT: Node.js Installation Required

Before you can run this project, you MUST install Node.js on your system.

### Step 1: Install Node.js

1. **Download Node.js:**
   - Visit: https://nodejs.org/
   - Download the **LTS (Long Term Support)** version
   - Choose the Windows installer (.msi)

2. **Install Node.js:**
   - Run the downloaded installer
   - Click "Next" through the installation wizard
   - Accept the license agreement
   - Use default installation settings
   - **IMPORTANT:** Make sure "Add to PATH" is checked
   - Complete the installation

3. **Verify Installation:**
   - Open a NEW PowerShell or Command Prompt window
   - Run these commands:
   ```bash
   node --version
   npm --version
   ```
   - You should see version numbers (e.g., v20.x.x and 10.x.x)
   - If you see errors, restart your computer and try again

---

## Step 2: Install Project Dependencies

1. **Open Terminal in Project Folder:**
   - Navigate to: `C:\Users\Avdhesh ET\Desktop\Zanbu`
   - Right-click in the folder
   - Select "Open in Terminal" or "Open PowerShell window here"

2. **Install Dependencies:**
   ```bash
   npm install
   ```
   
   This will download and install:
   - Next.js framework
   - React libraries
   - MongoDB driver
   - Cloudinary SDK
   - TinyMCE editor
   - All other required packages
   
   **Wait Time:** 2-5 minutes depending on your internet speed

---

## Step 3: Start the Development Server

```bash
npm run dev
```

**Expected Output:**
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
- Local:        http://localhost:3000
```

---

## Step 4: Access Your Application

### Customer Website:
- Open browser: **http://localhost:3000**
- You'll see the homepage with hero slider

### Admin Dashboard:
- Open browser: **http://localhost:3000/admin**
- Manage products, categories, orders, and leads

---

## 🎯 First Steps After Installation

### 1. Add Categories (IMPORTANT - Do this first!)

Navigate to: **http://localhost:3000/admin/categories**

**Sample Categories to Add:**

1. **Electronics** 📱
   - Icon: 📱
   - Slug: electronics (auto-generated)
   
2. **Fashion** 👕
   - Icon: 👕
   - Slug: fashion
   
3. **Home & Living** 🏠
   - Icon: 🏠
   - Slug: home-living
   
4. **Sports** ⚽
   - Icon: ⚽
   - Slug: sports

5. **Books** 📚
   - Icon: 📚
   - Slug: books

6. **Beauty** 💄
   - Icon: 💄
   - Slug: beauty

---

### 2. Add Products

Navigate to: **http://localhost:3000/admin/products**

**Sample Product to Add:**

- **Name:** Wireless Headphones
- **Category:** Electronics
- **Price:** $99.99
- **Compare Price:** $149.99 (optional - shows discount)
- **Stock:** 50
- **SKU:** WH-001
- **Description:** Use TinyMCE editor to add rich formatted text
  - "Premium wireless headphones with noise cancellation..."
- **Upload Image:** Click to upload product image (will use Cloudinary)
- **Checkboxes:**
  - ✅ Featured (shows on homepage)
  - ✅ Top Rated
  - ✅ Active

**Add at least 8 products to see full homepage effect!**

---

## 📸 Image Upload

When you upload images:
1. Images are automatically stored in Cloudinary
2. Optimized for web performance
3. CDN delivery for fast loading
4. No local storage needed

**Supported formats:** JPG, PNG, WebP

---

## 🛍️ Testing the Customer Experience

1. **View Homepage:**
   - Hero slider with promotions
   - Category circles
   - Featured products section
   - Top rated products
   - Best sellers
   - New arrivals
   - Banner section
   - Contact details

2. **Browse Categories:**
   - Click any category circle
   - See category-specific products

3. **Add to Cart:**
   - Click "Add to Cart" on any product
   - Cart icon shows count
   - Visit `/cart` to view cart

4. **Buy Now (Quick Checkout):**
   - Click "Buy Now" on any product
   - Modal opens with:
     - Product details
     - Quantity selector (+ / -)
     - Customer form (Name, Email, Phone, Address, etc.)
     - COD (Cash on Delivery) option
   - Submit to create order

5. **View Orders (Admin):**
   - Go to `/admin/orders`
   - See all customer orders
   - Update order status
   - View order details

---

## 🔧 Environment Variables (Already Configured)

Your `.env.local` file contains:

```
MONGODB_URI=mongodb+srv://...
CLOUDINARY_CLOUD_NAME=dsugarjot
CLOUDINARY_API_KEY=268684884845363
CLOUDINARY_API_SECRET=xxb0w2-DT0t9_cDSccW13J4j7lU
NEXT_PUBLIC_TINYMCE_API_KEY=p2yks470qo6wqku09s7bsqaqqnb9lgno6bgvbbsa42pezja1
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**✅ These are already set up and working!**

---

## 🎨 Customization Tips

### Change Colors:
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#2563eb',    // Change to your brand color
  secondary: '#64748b',
  accent: '#f59e0b',
}
```

### Update Hero Slider:
Edit `components/HeroSlider.tsx` - modify the slides array

### Modify Footer:
Edit `components/Footer.tsx` - update contact info and links

---

## 📱 Features Checklist

### Customer Website ✅
- [x] Hero slider with auto-play
- [x] Category circles navigation
- [x] Featured products section
- [x] Top rated products section
- [x] Best sellers section
- [x] New arrivals section
- [x] Promotional banner
- [x] Product cards with images
- [x] Add to cart functionality
- [x] Shopping cart page
- [x] Buy now modal with form
- [x] Category pages
- [x] Responsive design
- [x] Contact section

### Admin Dashboard ✅
- [x] Products management (CRUD)
- [x] Categories management (CRUD)
- [x] Orders management
- [x] Leads management
- [x] TinyMCE rich text editor
- [x] Cloudinary image upload
- [x] Status updates for orders/leads
- [x] Responsive admin UI

---

## 🐛 Common Issues & Solutions

### Issue: "npm is not recognized"
**Solution:** 
- Node.js not installed or not in PATH
- Install Node.js from nodejs.org
- Restart your terminal/computer

### Issue: "Cannot find module"
**Solution:**
```bash
npm install
```

### Issue: "Port 3000 already in use"
**Solution:**
- Close other applications using port 3000
- Or change port: `npm run dev -- -p 3001`

### Issue: "MongoDB connection error"
**Solution:**
- Check your internet connection
- MongoDB URI is already configured
- Wait a few seconds and try again

### Issue: Images not uploading
**Solution:**
- Check Cloudinary credentials in .env.local
- Ensure file size is under 10MB
- Use JPG, PNG, or WebP format

---

## 📊 Database Structure

All data is stored in MongoDB Atlas:

**Collections:**
1. **products** - All product information
2. **categories** - Product categories
3. **orders** - Customer orders
4. **leads** - Customer inquiries

**No local database setup needed!** Everything is cloud-based.

---

## 🚀 Production Build

When ready to deploy:

```bash
npm run build
npm start
```

Deploy to Vercel (Recommended):
1. Push code to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

---

## 📞 Support Checklist

Before asking for help, check:
- [ ] Node.js installed (run `node --version`)
- [ ] Dependencies installed (run `npm install`)
- [ ] Server running (run `npm run dev`)
- [ ] Browser opened at http://localhost:3000
- [ ] At least 1 category created
- [ ] At least 1 product created

---

## 🎉 You're All Set!

**Next Steps:**
1. ✅ Install Node.js
2. ✅ Run `npm install`
3. ✅ Run `npm run dev`
4. ✅ Open http://localhost:3000/admin
5. ✅ Add categories
6. ✅ Add products
7. ✅ Test the website!

**Happy Selling! 🛒**
