# Sheen Mode

Sheen Mode is a premium single-product storefront for Ghanal Hair Oil built with Next.js, TypeScript, Tailwind CSS, MongoDB Atlas, and Cloudinary.

## What is included

- Premium home page focused on trust, ingredients, testimonials, and FAQ
- Dedicated product, about, contact, cart, checkout, and admin pages
- Delivery charge handling in cart and checkout
- API routes for orders, contact messages, reviews, and Cloudinary uploads
- Admin authentication with secure cookie sessions
- Admin order management with status updates and customer-facing tracking IDs
- Product settings managed from admin and reflected in customer pages
- Environment setup for MongoDB Atlas and Cloudinary in `.env.local`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local` from `.env.local.example` and fill in your values.

3. Run the development server:

```bash
npm run dev
```

## Environment variables

Use these values in `.env.local`:

- `MONGODB_URI`
- `MONGODB_DB`
- `NEXT_PUBLIC_SITE_URL`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_INSTAGRAM_URL`
- `NEXT_PUBLIC_FACEBOOK_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_BRAND_LOGO`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

## Vercel deployment

1. Import this repo into Vercel.
2. Add all required environment variables from the list above in Project Settings -> Environment Variables.
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain, for example `https://your-domain.vercel.app`.
4. Redeploy after updating env vars.

If `NEXT_PUBLIC_SITE_URL` is not set, the app now falls back to Vercel-provided URL envs automatically.

## Scripts

- `npm run dev` - start the development server
- `npm run build` - build for production
- `npm run start` - start the production server
- `npm run lint` - run ESLint

## Notes

- The admin dashboard now supports login, product updates, image uploads, and order status management.
- Replace the bottle placeholder artwork with real product photography when available.
- Update the product price, social links, and delivery rules before launch.