# TiffinBox

React + Vite application that integrates Firebase for authentication and data storage and uses EmailJS for transactional emails. The project can be deployed to Netlify, Vercel or Firebase Hosting.

## Environment Variables
Create a `.env` file in the project root based on `.env.example` and provide the following values:

### Firebase
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

### EmailJS
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

### Stripe (optional)
If you integrate Stripe, also provide:
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`

## Running Locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`.

## Deployment
### Netlify
1. Build the project:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder. The provided `netlify.toml` already contains the correct build and publish settings.

### Vercel
1. Build using `npm run build`.
2. Set the output directory to `dist` when configuring the project.

### Firebase Hosting
1. Build the project with `npm run build`.
2. Deploy using the Firebase CLI:
   ```bash
   firebase deploy
   ```

## Creating an Admin User
1. After a user signs up (or using the Firebase console), open Firestore and create a document in the `users` collection with the ID equal to the user's UID.
2. Add the fields:
   - `email` – the user email address.
   - `isAdmin` – set to `true`.
   - `createdAt` – server timestamp.

Users with `isAdmin: true` can log in at `/admin/login` to access the dashboard.
