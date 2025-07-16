# HTTPS Configuration for Inklet

## Overview
This guide explains how to configure the Inklet blog application to work with HTTPS in production.

## Configuration Changes Made

### 1. NextAuth Configuration (`src/auth.ts`)
- Added `trustHost: true` to allow NextAuth to work with different hosts
- Configured secure cookies for production HTTPS
- Added proper Google OAuth configuration with authorization parameters
- Set up JWT session strategy

### 2. Environment Variables

#### Development (.env)
```env
NEXTAUTH_URL=http://localhost:3000
```

#### Production (.env.production.local)
```env
NEXTAUTH_URL=https://yourdomain.com
NODE_ENV=production
```

### 3. Middleware (`src/middleware.ts`)
- Added HTTPS redirect functionality for production
- Maintains auth middleware functionality
- Excludes localhost from HTTPS redirects

## Google OAuth Setup for HTTPS

### Required Redirect URIs
Add these to your Google Cloud Console OAuth app:

**Development:**
- `http://localhost:3000/api/auth/callback/google`

**Production:**
- `https://yourdomain.com/api/auth/callback/google`

### Steps to Configure:
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Select your OAuth 2.0 Client ID
3. Add the production redirect URI to "Authorized redirect URIs"
4. Save the configuration

## Deployment Checklist

### Environment Variables
- [ ] Update `NEXTAUTH_URL` to your production HTTPS domain
- [ ] Set `NODE_ENV=production`
- [ ] Verify all other environment variables are set correctly

### SSL Certificate
- [ ] Ensure your hosting provider has a valid SSL certificate
- [ ] Test HTTPS connection to your domain

### Security Headers
Consider adding these security headers in your hosting configuration:
- `Strict-Transport-Security`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`

## Testing HTTPS Locally

To test HTTPS locally, you can use tools like:
- `mkcert` for local SSL certificates
- `ngrok` for HTTPS tunneling
- Your hosting provider's preview URLs

## Common Issues

### Mixed Content Warnings
- Ensure all API calls use relative URLs or HTTPS
- Check that all external resources (images, fonts) use HTTPS

### Cookie Issues
- The configuration automatically handles secure cookies in production
- Cookies are set with `Secure` flag only in production

### Redirect Issues
- Verify `NEXTAUTH_URL` matches your actual domain
- Check that your hosting provider supports proper redirects

## Production Platforms

This configuration works with:
- Vercel (automatic HTTPS)
- Netlify (automatic HTTPS)
- AWS Amplify
- DigitalOcean App Platform
- Any platform with SSL/TLS support

## Security Best Practices

1. Always use HTTPS in production
2. Keep your `AUTH_SECRET` secure and unique
3. Use strong secrets for all authentication tokens
4. Regularly update dependencies
5. Monitor for security vulnerabilities

## Support

If you encounter issues with HTTPS configuration:
1. Check browser developer tools for mixed content warnings
2. Verify your SSL certificate is valid
3. Ensure all redirect URIs are correctly configured
4. Test authentication flow in incognito mode
