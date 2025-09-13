# 🖋️ Inklet - Modern Blog Platform

A beautiful, modern blog platform built with Next.js 15, featuring a sleek glass-morphism design, dark/light theme support, and seamless content management.

![Inklet Banner](public/inkletlogo.png)

## ✨ Features

### 🎨 Modern Design

- **Glass-morphism UI** with backdrop blur effects
- **Dark/Light theme** with smooth transitions
- **Responsive design** that works on all devices
- **Animated components** with smooth hover effects
- **Gradient backgrounds** and modern typography

### 📝 Content Management

- **Rich text editor** with formatting toolbar
- **Image upload** with Cloudinary integration
- **Category management** with emoji support
- **Post drafts** and publishing workflow
- **Comment system** with real-time interactions

### 🔐 Authentication

- **Google OAuth** integration via NextAuth.js
- **User profiles** with avatar support
- **Secure sessions** with JWT tokens
- **HTTPS support** for production deployment

### 🗄️ Database & Storage

- **MongoDB** with Prisma ORM
- **Image storage** via Cloudinary
- **Database migrations** and schema management
- **Optimized queries** for performance

## 🚀 Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Icons** - Beautiful icon library

### Backend

- **Next.js API Routes** - Serverless functions
- **NextAuth.js** - Authentication solution
- **Prisma** - Database ORM
- **MongoDB** - NoSQL database

### Services

- **Cloudinary** - Image storage and optimization
- **Google OAuth** - Social authentication
- **Vercel** - Deployment platform (recommended)

## 🛠️ Installation

### Prerequisites

- Node.js 18+
- MongoDB database
- Google OAuth credentials
- Cloudinary account

### 1. Clone the repository

```bash
git clone https://github.com/NishantRaj278/Inklet.git
cd Inklet
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment setup

Create a `.env.local` file:

```env
# Database
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/inklet"

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key_here

# Google OAuth
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Database setup

```bash
npx prisma generate
npx prisma db push
```

### 5. Start development server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your blog!

## 📁 Project Structure

```
inklet/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── blog/           # Blog listing page
│   │   ├── login/          # Authentication page
│   │   ├── posts/          # Individual post pages
│   │   └── write/          # Post creation page
│   ├── components/         # Reusable components
│   │   ├── AuthProvider.tsx
│   │   ├── card.tsx
│   │   ├── comments.tsx
│   │   ├── navbar.tsx
│   │   └── ...
│   ├── context/           # React contexts
│   │   └── ThemeContext.tsx
│   ├── hooks/             # Custom hooks
│   │   └── useImageUpload.ts
│   └── auth.ts            # NextAuth configuration
├── prisma/
│   └── schema.prisma      # Database schema
├── public/                # Static assets
└── ...
```

## 🎯 Key Features Explained

### Rich Text Editor

- Custom contentEditable implementation
- Formatting toolbar (Bold, Italic, Underline, Headings, Lists)
- Word count tracking
- Theme-aware styling

### Image Upload System

- Drag & drop image upload
- Cloudinary integration for optimization
- Image preview with remove functionality
- Automatic image resizing

### Theme System

- React Context-based theme management
- localStorage persistence
- Smooth transitions between themes
- Component-level theme awareness

### Authentication Flow

- Google OAuth integration
- Automatic user profile creation
- Protected routes for writing posts
- Session management with NextAuth.js

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Production Environment Variables

```env
DATABASE_URL=your_production_mongodb_url
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your_production_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NODE_ENV=production
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

## 🎨 Customization

### Themes

Edit `src/context/ThemeContext.tsx` to customize theme colors and default theme.

### Categories

Modify the categories array in `src/app/write/page.tsx` to add/remove blog categories.

### Styling

Update Tailwind classes throughout components to customize the appearance.

### Database Schema

Modify `prisma/schema.prisma` and run migrations to change the data structure.

## 📸 Screenshots

### Light Theme

- Modern, clean interface with subtle shadows
- Blue and purple gradient accents
- Glass-morphism effects

### Dark Theme

- Sleek dark interface with slate colors
- Consistent branding colors
- Enhanced readability in low light

### Mobile Responsive

- Optimized layouts for all screen sizes
- Touch-friendly interactions
- Responsive navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - For beautiful styling
- [NextAuth.js](https://next-auth.js.org/) - Authentication made simple
- [Prisma](https://prisma.io/) - Modern database toolkit
- [Cloudinary](https://cloudinary.com/) - Image and video management

## 📧 Contact

**Nishant Raj** - [GitHub](https://github.com/NishantRaj278)

Project Link: [https://github.com/NishantRaj278/Inklet](https://github.com/NishantRaj278/Inklet)

---

Made with ❤️ by [Nishant Raj](https://github.com/NishantRaj278)
