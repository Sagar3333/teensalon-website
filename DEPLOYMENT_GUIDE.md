# TeenSalon Website Deployment Guide

## 🚀 GitHub Pages Deployment

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Repository name: `teensalon-website`
4. Description: `TeenSalon - Professional Beauty Salon Website`
5. Set to **Public** (required for free GitHub Pages)
6. Click "Create repository"

### Step 2: Upload Files to GitHub
1. In your new repository, click "uploading an existing file"
2. Drag and drop ALL files from this `programs` folder:
   - index.html
   - styles.css
   - script.js
   - images/ (entire folder)
   - All other files (favicon.svg, robots.txt, etc.)
3. Add commit message: "Initial website upload"
4. Click "Commit changes"

### Step 3: Enable GitHub Pages
1. Go to repository **Settings** tab
2. Scroll down to **Pages** section
3. Under "Source", select **Deploy from a branch**
4. Select **main** branch and **/ (root)** folder
5. Click **Save**
6. Your site will be live at: `https://yourusername.github.io/teensalon-website`

### Step 4: Custom Domain Setup (teensalon.com)
1. In repository **Settings** → **Pages**
2. Under "Custom domain", enter: `teensalon.com`
3. Check "Enforce HTTPS"
4. Click **Save**

### Step 5: DNS Configuration
You'll need to configure your domain's DNS settings:

**Option A: If you own teensalon.com domain:**
- Add CNAME record: `www` → `yourusername.github.io`
- Add A records pointing to GitHub Pages IPs:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153

**Option B: If you need to buy the domain:**
- Purchase teensalon.com from domain registrar (GoDaddy, Namecheap, etc.)
- Follow Option A DNS configuration

### Step 6: Verify Deployment
1. Wait 5-10 minutes for DNS propagation
2. Visit `https://teensalon.com`
3. Test all website functionality

## 📁 Files to Upload
Make sure to upload ALL these files:
- ✅ index.html (main page)
- ✅ styles.css (styling)
- ✅ script.js (functionality)
- ✅ images/ folder (all images and icons)
- ✅ favicon.svg
- ✅ robots.txt
- ✅ sitemap.xml
- ✅ site.webmanifest

## 🎯 Your Website Features
- ✅ Professional salon design
- ✅ Mobile responsive
- ✅ SEO optimized
- ✅ Contact forms
- ✅ Gallery with 24+ images
- ✅ Premium services section
- ✅ WhatsApp integration
- ✅ Custom domain ready

## 🆘 Need Help?
If you encounter any issues:
1. Check GitHub Pages status in repository Settings
2. Verify all files are uploaded correctly
3. Ensure domain DNS is configured properly
4. Wait for DNS propagation (up to 24 hours)

Your TeenSalon website will be live and professional! 🎉
