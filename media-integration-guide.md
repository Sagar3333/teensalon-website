# TeenSalon Media Integration Guide

## Official JustDial Page
**URL**: https://www.justdial.com/Greater-Noida/TEENS-SALON-Near-Hdfc-Bank-Alpha-2-Greater-Noida/011PXX11-XX11-240710221601-K4T5_BZDET

## Steps to Integrate Real Photos and Videos

### 1. Download Media from JustDial
From the official JustDial page, you can find:
- **Salon Interior Photos**: Reception area, styling stations, waiting area
- **Service Photos**: Hair styling, coloring, facial treatments, nail art
- **Before/After Transformations**: Client makeover results
- **Team Photos**: Stylists and staff members
- **Equipment Photos**: Modern salon equipment and tools

### 2. Organize Media Files
Create the following folder structure:
```
images/
├── gallery/
│   ├── salon-interior-1.jpg
│   ├── salon-interior-2.jpg
│   ├── hair-styling-1.jpg
│   ├── hair-coloring-1.jpg
│   ├── facial-treatment-1.jpg
│   ├── nail-art-1.jpg
│   ├── bridal-makeup-1.jpg
│   ├── mehendi-design-1.jpg
│   └── hair-spa-1.jpg
├── hero/
│   ├── salon-interior.jpg
│   ├── stylist-working.jpg
│   └── beauty-treatment.jpg
├── services/
│   ├── haircut-service.jpg
│   ├── coloring-service.jpg
│   ├── facial-service.jpg
│   ├── nail-service.jpg
│   └── bridal-service.jpg
└── team/
    ├── stylist-1.jpg
    ├── stylist-2.jpg
    ├── stylist-3.jpg
    └── stylist-4.jpg
```

### 3. Update Image Paths
Replace placeholder image paths in the HTML with actual downloaded images:

#### Gallery Section
```html
<img src="images/gallery/salon-interior-1.jpg" alt="TeenSalon Interior">
<img src="images/gallery/hair-styling-1.jpg" alt="Professional Hair Styling">
<img src="images/gallery/hair-coloring-1.jpg" alt="Hair Coloring Services">
```

#### Hero Section
```html
<img src="images/hero/salon-interior.jpg" alt="TeenSalon Interior">
```

### 4. Video Integration
For videos from JustDial:
```html
<video controls poster="images/video-thumbnail.jpg">
    <source src="videos/salon-tour.mp4" type="video/mp4">
    <source src="videos/salon-tour.webm" type="video/webm">
    Your browser does not support the video tag.
</video>
```

### 5. Image Optimization
- **Format**: Use JPG for photos, PNG for graphics with transparency
- **Size**: Optimize for web (compress to under 500KB each)
- **Dimensions**: 
  - Gallery images: 800x800px
  - Hero images: 1920x1080px
  - Service images: 400x400px

### 6. Legal Considerations
- Ensure you have permission to use images from JustDial
- Contact TEENS SALON directly for official media
- Add proper attribution if required
- Consider using stock photos as alternatives

### 7. Fallback System
The website includes fallback placeholders that will display if images are not found:
```html
<img src="images/gallery/hair-styling-1.jpg" alt="Professional Hair Styling" 
     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
<div class="gallery-placeholder" style="display: none;">
    <i class="fas fa-cut"></i>
    <p>Hair Styling</p>
</div>
```

## Quick Implementation Steps

1. **Download images** from the JustDial page
2. **Place them** in the appropriate folders
3. **Update paths** in the HTML file
4. **Test the website** to ensure images load correctly
5. **Optimize images** for better performance

## Contact Information
For official media and permissions:
- **Salon Name**: TEENS SALON
- **Location**: Near HDFC Bank, Alpha 2, Greater Noida
- **JustDial ID**: 011PXX11-XX11-240710221601-K4T5_BZDET

## Alternative Sources
If JustDial images are not available:
- Contact the salon directly
- Use professional stock photos
- Create custom graphics
- Use the existing placeholder system
