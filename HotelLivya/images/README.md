# Images Folder

This folder is intended for storing local image assets for the Hotel Livya website.

## Current Usage

The website currently uses high-quality images from Unsplash CDN for demonstration purposes. These images are optimized and served via CDN for better performance.

## Adding Local Images

If you want to use local images instead of CDN images:

1. Add your image files to this folder
2. Update the image paths in:
   - `index.html` - for room card images and hero background
   - `app.js` - for room modal gallery images
   - `style.css` - for hero background image

## Recommended Image Specifications

- **Hero Background**: 1920x1080px minimum, JPG format
- **Room Images**: 800x600px, JPG format
- **Gallery Images**: 500x400px, JPG format
- **Optimization**: Compress images for web use

## File Naming Convention

Use descriptive names for your images:
- `hero-background.jpg`
- `standard-room-1.jpg`
- `deluxe-room-1.jpg`
- `suite-room-1.jpg`
- `hotel-exterior.jpg`
- `hotel-lobby.jpg`

## Performance Tips

- Use WebP format for better compression (with JPG fallback)
- Implement lazy loading for better performance
- Optimize images for different screen sizes
- Consider using responsive images with `srcset` attribute 