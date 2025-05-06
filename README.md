# נהורא | Nehora Video Production and Live Streaming Website

A modern, responsive HTML website for Nehora, a professional video production and live streaming studio.

## Features

- Fully responsive design that works on all devices
- Modern and clean user interface with emphasis on portfolio showcase
- Smooth animations and transitions
- Contact form with validation
- Portfolio filtering by categories
- Testimonial slider
- SEO optimized structure

## File Structure

```
/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── main.js         # JavaScript functionality
├── images/
│   ├── nehora-logo.png # Logo file (to be added)
│   └── portfolio/      # Portfolio images
├── videos/
│   └── showreel.mp4    # Background video for hero section (to be added)
└── README.md           # This file
```

## Setup Instructions

1. Clone or download this repository to your local machine.
2. Add your logo image to the `images` folder (named "nehora-logo.png").
3. Add your showreel or background video to the `videos` folder (named "showreel.mp4").
4. Add portfolio images to the `images/portfolio` folder.
5. Customize the content in `index.html` to match your specific needs.
6. Upload all files to your web hosting provider.

## Dependencies

- Font Awesome 6.4.0 (loaded via CDN)
- Google Fonts: Heebo (loaded via CDN)

## Browser Compatibility

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## SEO

The website includes basic SEO optimization:
- Proper heading structure
- Meta tags for description and keywords
- Semantic HTML5 elements
- Optimized loading times
- Mobile-friendly design

## Performance Tips

For best performance:
- Optimize all images before uploading
- Compress your video files for web
- Consider using a CDN for media files
- Enable browser caching on your server

## Contact

For questions or customizations, contact:
- Email: elazar12321@gmail.com
- WhatsApp: https://wa.link/67ivgh 

## Adding Background Images

To add or change background images:

1. **Hero Background:** 
   - Place your video file in the `videos` folder named `hero-video.mp4`
   - The video will automatically be used as the hero section background

2. **Section Backgrounds:**
   - To add a background image to any section, add the image to the `images` folder
   - Then edit the CSS in `css/style.css` by adding the following to the specific section:
   ```css
   .section-name {
       background-image: url('../images/your-image.jpg');
       background-size: cover;
       background-position: center;
       background-repeat: no-repeat;
   }
   ```
   - Replace `section-name` with the actual section class (e.g., `about`, `services`, etc.)
   - Replace `your-image.jpg` with your actual image filename

3. **Dark Overlay for Backgrounds:**
   - For better text readability on image backgrounds, add a dark overlay:
   ```css
   .section-name::before {
       content: '';
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       background-color: rgba(0, 0, 0, 0.7); /* Adjust opacity as needed */
       z-index: 0;
   }
   
   .section-name .container {
       position: relative;
       z-index: 1;
   }
   ```

4. **Recommended Image Specifications:**
   - Resolution: At least 1920x1080px for full-width backgrounds
   - Format: JPG for photographs, PNG for graphics with transparency
   - Size: Optimize images to keep file size under 500KB if possible
   - Aspect ratio: 16:9 or 3:2 works well for most sections 

## Adding Background Videos

You can use either a local video file or a YouTube video for the hero background:

1. **Local Video File:**
   - Place your video file in the `videos` folder named `hero-video.mp4`
   - Update the HTML in `index.html` to use the local video:
   ```html
   <div class="video-bg">
     <video autoplay muted loop playsinline>
       <source src="videos/hero-video.mp4" type="video/mp4">
     </video>
   </div>
   ```

2. **YouTube Video:**
   - Find the YouTube video ID (the part after `?v=` in the video URL)
   - Update the HTML in `index.html` to use the YouTube embed:
   ```html
   <div class="video-bg">
     <iframe 
       src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=YOUR_VIDEO_ID&controls=0&showinfo=0&rel=0" 
       title="Background Video"
       frameborder="0" 
       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
       allowfullscreen
       style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
     </iframe>
   </div>
   ```
   - Replace `YOUR_VIDEO_ID` with your actual YouTube video ID
   - Note: The same ID must be used in both the `src` URL and the `playlist` parameter for proper looping 