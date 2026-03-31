# PayWithCryptoCard Frontend

Modern, responsive frontend for the PayWithCryptoCard platform - a crypto virtual Visa card service with no KYC requirements.

## 🌟 Features

- ✅ **Modern UI** with Next.js 15 and React 19
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS 4** for styling
- ✅ **Redux Toolkit** for state management
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Dark Theme** - Eye-friendly modern design
- ✅ **Authentication** - JWT-based auth with httpOnly cookies
- ✅ **Dashboard** - User balance, cards, transactions
- ✅ **Admin Panel** - Platform management interface
- ✅ **Real-time Updates** - Instant balance and status updates
- ✅ **QR Code Generation** - Easy crypto deposits
- ✅ **SEO Optimized** - Meta tags, OpenGraph, structured data

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or bun
- Backend API running (see server/README.md)

### Installation

```bash
# Navigate to frontend directory
cd paywithcryptocard-frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### Environment Configuration

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.paywithcryptocard.net/api
NEXT_PUBLIC_APP_URL=https://paywithcryptocard.net
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
paywithcryptocard-frontend/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Auth routes (login, register)
│   │   ├── dashboard/           # User dashboard
│   │   ├── admin/               # Admin panel
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Homepage
│   ├── components/              # React components
│   │   ├── ui/                  # Reusable UI components
│   │   ├── layouts/             # Layout components
│   │   ├── forms/               # Form components
│   │   ├── Cards/               # Card-related components
│   │   └── charts/              # Chart components
│   ├── lib/                     # Utilities
│   │   ├── redux/              # Redux store setup
│   │   ├── api.ts              # API client
│   │   └── utils.ts            # Helper functions
│   ├── types/                   # TypeScript types
│   └── styles/                  # Global styles
├── public/                      # Static assets
│   ├── logos/                   # Logo files
│   └── deposit/                 # Crypto QR codes
├── .env.example                 # Environment template
├── next.config.ts               # Next.js config
├── tailwind.config.ts           # Tailwind config
├── tsconfig.json                # TypeScript config
└── package.json                 # Dependencies
```

## 🎨 Pages & Routes

### Public Pages

- **/** - Homepage with hero section and features
- **/register** - User registration
- **/login** - User login

### User Dashboard

- **/dashboard** - Main dashboard overview
- **/dashboard/cards** - Virtual card management
- **/dashboard/deposit** - Crypto deposit interface
- **/dashboard/transactions** - Transaction history

### Admin Panel

- **/admin** - Admin dashboard
- **/admin/users** - User management
- **/admin/transactions** - Transaction monitoring
- **/admin/settings** - Platform settings

## 🎨 UI Components

### Reusable Components

Located in `src/components/ui/`:

- **Button** - Styled button with variants
- **Input** - Form input with validation
- **Card** - Card container component
- **Modal** - Modal dialog
- **Badge** - Status badges
- **Tabs** - Tab navigation
- **Tooltip** - Hover tooltips

### Feature Components

- **CryptoCard** - Virtual card display
- **TransactionItem** - Transaction list item
- **DepositCard** - Crypto deposit option
- **StatCard** - Dashboard statistics
- **Chart** - Data visualization

## 📊 State Management

### Redux Store Structure

```typescript
interface RootState {
  auth: {
    user: User | null
    token: string | null
    isAuthenticated: boolean
  }
  cards: {
    items: Card[]
    loading: boolean
    error: string | null
  }
  transactions: {
    items: Transaction[]
    stats: TransactionStats | null
    loading: boolean
  }
  deposit: {
    addresses: CryptoAddress[]
    loading: boolean
  }
}
```

### Redux Slices

- `authSlice` - User authentication state
- `cardSlice` - Virtual cards management
- `transactionSlice` - Transaction history
- `depositSlice` - Crypto deposit addresses

## 🔐 Authentication

### Login Flow

1. User enters credentials on `/login`
2. API validates credentials
3. JWT token stored in httpOnly cookie
4. User redirected to dashboard
5. Redux auth state updated

### Protected Routes

All dashboard and admin routes are protected:

```typescript
// Middleware checks:
// 1. User is authenticated
// 2. Token is valid
// 3. User has required role (admin)
```

## 🎨 Styling

### Tailwind CSS Configuration

```javascript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: { /* ... */ },
        dark: { /* ... */ },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
}
```

### Custom Colors

- **Primary Blue** - `#3B82F6`
- **Dark Background** - `#0F172A`
- **Success Green** - `#10B981`
- **Error Red** - `#EF4444`
- **Warning Yellow** - `#F59E0B`

### Design System

- **Base Font** - Inter (14px, 16px, 18px)
- **Display Font** - Space Grotesk (24px, 32px, 48px)
- **Border Radius** - 8px, 12px, 16px
- **Spacing** - 4px, 8px, 16px, 24px, 32px

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

## 🔄 API Integration

### API Client

```typescript
// lib/api.ts
export const api = {
  get: (url: string) => axios.get(url)
  post: (url: string, data: any) => axios.post(url, data)
  // ... other methods
}
```

### Error Handling

```typescript
// Global error handler
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error)
  }
)
```

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t paywithcryptocard-frontend .
```

### Run Container

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.paywithcryptocard.net/api \
  paywithcryptocard-frontend
```

### Docker Compose

```bash
docker-compose up -d
```

See `docker-compose.yml` for configuration.

## 🚀 Production Deployment

### Build for Production

```bash
npm run build
```

This creates:
- `.next/` folder with optimized build
- Static assets in `public/`
- Server-side rendering bundle

### Start Production Server

```bash
npm start
```

### Environment Variables for Production

```env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.paywithcryptocard.net/api
NEXT_PUBLIC_APP_URL=https://paywithcryptocard.net
```

### Deployment Options

1. **Docker** (Recommended)
   ```bash
   docker build -t ghcr.io/your-username/paywithcryptocard-frontend:latest .
   docker push ghcr.io/your-username/paywithcryptocard-frontend:latest
   ```

2. **VPS with nginx**
   - Build the app
   - Configure nginx reverse proxy
   - Use PM2 for process management

3. **Vercel/Netlify**
   - Connect GitHub repository
   - Auto-deploy on push to main

## 🔍 SEO & Metadata

### OpenGraph Tags

```typescript
export const metadata = {
  title: "Crypto Virtual Visa Card | No KYC | PayWithCryptoCard",
  description: "Create a virtual crypto Visa card instantly...",
  openGraph: {
    title: "...",
    description: "...",
    url: "https://paywithcryptocard.net/",
    type: "website",
  },
}
```

### Google Search Console

Verified with:
- **Meta tag:** `p2N4X00yCgWRfroqfWHJLbE-QqwnUCD28J`
- **HTML file:** `/google4ddc5f631eb384b9.html`

## 🛠️ Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📦 Dependencies

### Core

- **next** 16.0.8 - React framework
- **react** 19.2.1 - UI library
- **typescript** 5.x - Type safety

### Styling

- **tailwindcss** 4.x - Utility-first CSS
- **@tailwindcss/postcss** 4.x - PostCSS integration

### State Management

- **@reduxjs/toolkit** 2.x - State management
- **react-redux** 9.x - React bindings

### UI Components

- **framer-motion** 12.x - Animations
- **lucide-react** 0.x - Icons
- **react-icons** 5.x - More icons
- **qrcode.react** 4.x - QR code generation

## 🎯 Key Features Explained

### Virtual Cards

Users can create virtual Visa cards with:
- Automatic card number generation
- CVV and expiry date
- Balance management
- Freeze/unfreeze functionality
- Transaction history

### Crypto Deposits

Support for 5 cryptocurrencies:
- Bitcoin (BTC)
- Ethereum (ETH)
- Tether (USDT) - ERC20 & TRC20
- Monero (XMR)

Each with:
- QR code for easy scanning
- Wallet address display
- Transaction hash submission
- Status tracking

### Admin Panel

Complete platform management:
- User management (view, activate/deactivate)
- Deposit approval workflow
- Transaction monitoring
- Platform statistics
- Settings management

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **HttpOnly Cookies** - Prevent XSS attacks
- **CSRF Protection** - Token validation
- **Input Validation** - Client-side validation
- **Secure Headers** - Next.js security headers
- **Environment Variables** - Sensitive data protection

## 📊 Performance Optimization

- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic route-based splitting
- **Lazy Loading** - Dynamic imports for components
- **CSS Optimization** - Tailwind CSS purging
- **Bundle Analysis** - Built-in analyzer

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Clear Next.js Cache

```bash
rm -rf .next
npm run dev
```

### Module Not Found

```bash
rm -rf node_modules package-lock.json
npm install
```

### API Connection Error

Check:
1. Backend is running on correct port
2. `NEXT_PUBLIC_API_URL` is correct
3. CORS is configured on backend

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| NEXT_PUBLIC_API_URL | Backend API endpoint | https://api.paywithcryptocard.net/api |
| NEXT_PUBLIC_APP_URL | Frontend URL | https://paywithcryptocard.net |

## 🌍 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📖 Additional Documentation

- **Backend README:** `../server/README.md`
- **Quick Start Guide:** `../QUICKSTART.md`
- **System Architecture:** `../ARCHITECTURE.md`
- **API Documentation:** `https://api.paywithcryptocard.net/api-docs`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

Proprietary - All rights reserved

## 📞 Support

For issues or questions:
- Email: support@paywithcryptocard.com
- Website: https://paywithcryptocard.net

---

**Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS**
