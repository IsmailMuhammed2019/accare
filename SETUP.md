# A&C Care Website Setup Guide

## Overview
This is a comprehensive Next.js website for A&C Care, a professional in-home care services provider. The website includes modern UI components, responsive design, and interactive features.

## Features Added

### 🎨 UI Components
- **Header**: Modern navigation with mobile menu
- **Footer**: Comprehensive footer with links and contact info
- **Hero Slider**: Interactive slider with real background images
- **Why Choose Us**: Detailed section highlighting company benefits
- **Contact Form**: Functional contact form with validation
- **Google Maps**: Interactive map showing service areas
- **FAQ Accordion**: Interactive FAQ with categories
- **Testimonials Grid**: Client reviews with ratings and highlights
- **Careers Section**: Job listings and application process

### 📄 Pages Created
- **Home Page**: Enhanced with slider and new sections
- **About Page**: Company information, team, and values
- **Services Page**: Comprehensive service offerings with real images
- **Why Choose Us Page**: Detailed comparison and testimonials
- **Contact Page**: Contact form and Google Maps integration
- **FAQ Page**: Comprehensive frequently asked questions
- **Testimonials Page**: Client reviews and success stories
- **Careers Page**: Job opportunities for caregivers

### 🛠 Technical Features
- Responsive design for all devices
- Modern UI with Tailwind CSS
- Form validation with React Hook Form
- Interactive sliders with Swiper.js
- Google Maps integration
- SEO optimized metadata

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory:
```env
# Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE
```

### 3. Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Maps JavaScript API
4. Create credentials (API Key)
5. Add the API key to your `.env.local` file

### 4. Run Development Server
```bash
npm run dev
```

### 5. Build for Production
```bash
npm run build
npm start
```

## File Structure

```
src/
├── app/
│   ├── about/page.tsx          # About page
│   ├── services/page.tsx       # Services page
│   ├── why-choose-us/page.tsx  # Why Choose Us page
│   ├── contact/page.tsx        # Contact page
│   ├── faq/page.tsx            # FAQ page
│   ├── testimonials/page.tsx   # Testimonials page
│   ├── careers/page.tsx        # Careers page
│   ├── layout.tsx              # Root layout with header/footer
│   └── page.tsx                # Home page
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Navigation header
│   │   └── Footer.tsx          # Site footer
│   ├── sections/
│   │   ├── HeroSlider.tsx      # Interactive hero slider
│   │   └── WhyChooseUs.tsx     # Why Choose Us section
│   ├── forms/
│   │   └── ContactForm.tsx     # Contact form component
│   ├── GoogleMap.tsx           # Google Maps component
│   └── ui/                     # UI components
└── lib/
    └── utils.ts                # Utility functions
```

## Customization

### Colors and Branding
- Update colors in `tailwind.config.js`
- Modify gradient classes in components
- Replace logo in `public/` directory

### Content
- Update company information in components
- Modify service offerings in `services/page.tsx`
- Update contact information throughout the site

### Images
- Real caregiver and caregiving activity images in `public/images/`
- Team member photos in `public/images/team/`
- Hero slider background images in `public/images/hero/`
- Service activity images in `public/images/activities/`
- All images optimized for web use

## Dependencies

### Core
- Next.js 15.5.2
- React 19.1.0
- TypeScript 5

### UI & Styling
- Tailwind CSS 4
- Lucide React (icons)
- Class Variance Authority
- Tailwind Merge

### Forms & Validation
- React Hook Form
- Zod validation
- Hookform Resolvers

### Interactive Features
- Swiper.js (slider)
- Google Maps JavaScript API
- Zustand (state management)

### UI Components
- Radix UI components
- Sonner (toasts)

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance
- Optimized images with Next.js Image component
- Lazy loading for components
- Efficient bundle splitting
- SEO optimized metadata

## SEO Features
- Meta tags for all pages
- Structured data markup
- Optimized headings and content
- Mobile-friendly design

## Contact Information
For support or questions about this website:
- Email: info@accare.com
- Phone: (203) 904-4883 / (203) 919-3541
- Email: christine@thecaringservice.com
- Address: 89 Taylor Ave, Norwalk, CT 06854
- Website: accare.com

## License
This project is proprietary to A&C Care. All rights reserved.
