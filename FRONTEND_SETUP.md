# Frontend Deployment Guide

## Current Configuration

**Frontend URL:** `https://guileless-dodol-9404f4.netlify.app`
**Backend URL:** `https://server-puce-mu.vercel.app`

## Environment Variables

The frontend uses one environment variable:

- `NEXT_PUBLIC_API_URL` - Your backend API URL

### Development
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### Production (Current)
```bash
NEXT_PUBLIC_API_URL=https://server-puce-mu.vercel.app/api
```

## Configuration Files

1. **`.env.local`** - Local development (currently set to production)
2. **`.env.production`** - Production builds
3. **`.env.example`** - Template for new developers

## Files That Use the API URL

The backend URL is configured in:

1. **`src/lib/api.ts`** - Main API client
   ```typescript
   const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
   ```

2. **`src/redux/services/baseApi.ts`** - Redux Toolkit base API
   ```typescript
   export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
   ```

## Deployment to Netlify

Your frontend is already deployed! If you need to redeploy:

### Option 1: Auto-deploy (Git connected)
1. Push changes to your Git repository
2. Netlify will automatically deploy
3. Changes to `.env.production` will be used

### Option 2: Manual deploy
```bash
npm run build
netlify deploy --prod
```

### Setting Environment Variables in Netlify

1. Go to Netlify Dashboard
2. Select your site: `guileless-dodol-9404f4`
3. Go to **Site settings** → **Environment variables**
4. Add/update:
   ```
   NEXT_PUBLIC_API_URL=https://server-puce-mu.vercel.app/api
   ```

## Testing the Connection

### 1. Test Backend Health
Open in browser:
```
https://server-puce-mu.vercel.app/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-02-17T..."
}
```

### 2. Test API Docs
```
https://server-puce-mu.vercel.app/api-docs
```

### 3. Test Frontend-Backend Connection

Visit your frontend:
```
https://guileless-dodol-9404f4.netlify.app
```

Try:
- Register a new user
- Login
- Check if data loads correctly

## Common Issues

### CORS Errors
**Problem:** Browser blocks requests from frontend to backend

**Solution:** Make sure backend has:
```env
FRONTEND_URL=https://guileless-dodol-9404f4.netlify.app
```

### 404 Errors
**Problem:** API endpoints not found

**Solution:** Check that:
1. Backend is deployed: `https://server-puce-mu.vercel.app`
2. URL is correct: `/api/` prefix required
3. Environment variable is set in Netlify

### Auth Issues
**Problem:** Login fails, cookies not working

**Solution:**
1. Backend CORS must have `credentials: true`
2. Frontend fetch must have `credentials: 'include'`
3. Both frontend and backend must use HTTPS in production

## Local Development

To run frontend locally with production backend:

1. Update `.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://server-puce-mu.vercel.app/api
```

2. Start dev server:
```bash
npm run dev
```

3. Open http://localhost:3000

To run with local backend:

1. Make sure backend is running on port 4000
2. Update `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

3. Start dev server:
```bash
npm run dev
```

## Build for Production

```bash
npm run build
```

This uses `.env.production` for environment variables.

## Next Steps

✅ Frontend configured with production backend URL
✅ Ready to test on Netlify
✅ Backend CORS configured for Netlify domain

Test your app at: `https://guileless-dodol-9404f4.netlify.app`
