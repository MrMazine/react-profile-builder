# Modern Portfolio Website

A modern, responsive, and easily customizable portfolio web application built with React, designed for data scientists, developers, designers, and IT professionals.

## Features

### 🎨 Modern UI/UX Design
- Clean, responsive design that adapts seamlessly to various devices
- Smooth animations and transitions using Framer Motion
- Dark theme with professional aesthetics

### 🛠️ Technology Stack
- **Frontend**: React 18 with TypeScript, Vite for fast builds
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Database**: In-memory storage (easily replaceable with PostgreSQL)
- **State Management**: React Query (TanStack Query)

### 🎛️ Global Configuration System
- Single configuration file for easy customization
- Admin-only theme customization dashboard
- Real-time theme switching with 5 color options:
  - Purple (default)
  - Blue
  - Green
  - Red
  - Yellow

### 📝 Portfolio Sections
1. **Hero Section**: Introduction with profile image and CTA buttons
2. **About Section**: Personal story with statistics and service highlights
3. **Services Section**: Professional services with hover animations
4. **Projects Section**: Featured work with technology tags
5. **Contact Section**: Contact form with validation
6. **Footer**: Professional footer with copyright

### 🔐 Admin Panel Features
- Secure admin login (default: admin/admin123)
- Portfolio configuration management
- Theme customization (admin-only)
- Real-time preview of changes

## Installation & Setup

### Prerequisites
- Node.js 20 or higher
- npm

### Installation Steps
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:5000`

## Customization Guide

### Basic Configuration
The portfolio can be customized through the admin panel or by modifying the configuration files:

1. **Access Admin Panel**: 
   - Visit `/admin/login`
   - Use credentials: `admin` / `admin123`

2. **Portfolio Settings**:
   - Personal information (name, title, about)
   - Contact details (email, phone, location)
   - Profile image URL
   - Skills, stats, and social links (JSON format)

3. **Theme Customization**:
   - Select from 5 predefined color schemes
   - Changes apply instantly
   - Only available to admin users

### File Structure
```
├── client/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── lib/                # Utility functions
│   │   └── config/             # Configuration files
├── server/                     # Backend API
├── shared/                     # Shared types and schemas
└── README.md
```

### Customization for Resale
The application is designed as a template for easy customization:

1. **Configuration**: Update portfolio details through admin panel
2. **Styling**: Modify colors using the theme customizer
3. **Content**: Replace placeholder images and text
4. **Branding**: Update logo and company information

## Deployment

### Replit Deployment
The application is optimized for Replit deployment:
1. Ensure all environment variables are set
2. Use the provided deployment configuration
3. The app will be available under a `.replit.app` domain

### Other Platforms
Compatible with:
- Netlify
- Vercel
- GitHub Pages
- Any Node.js hosting service

### Performance Optimization
- Optimized assets and code for performance
- SEO-friendly with meta tags and Open Graph
- Responsive images and lazy loading

## Security Features

- Admin authentication for configuration access
- Input validation using Zod schemas
- CSRF protection for form submissions
- Secure session management

## API Endpoints

### Public Endpoints
- `GET /api/config` - Get portfolio configuration
- `GET /api/projects` - Get project list
- `GET /api/services` - Get services list

### Admin Endpoints
- `POST /api/auth/login` - Admin login
- `PUT /api/config` - Update portfolio configuration

## Environment Variables

No external API keys required for basic functionality. The application uses:
- In-memory storage for development
- Font Awesome for icons
- Google Fonts for typography
- Unsplash for placeholder images

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Progressive Web App features

## License

This project is designed for customization and resale. Please ensure compliance with any third-party libraries used.

## Support

For customization support or questions:
- Review the admin panel documentation
- Check the configuration examples
- Refer to the component structure for modifications

---

**Default Admin Credentials**: `admin` / `admin123`  
**Demo URL**: Available after deployment  
**Version**: 1.0.0