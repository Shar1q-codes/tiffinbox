# Firebase Admin Setup Guide

## 1. Access Firebase Console
[Open Firebase Console for TiffinBox Project](https://console.firebase.google.com/project/tiffinbox-564cc)

## 2. Create Admin User
1. In Firebase Console, go to "Authentication" → "Users"
2. Click "Add User"
3. Enter admin credentials:
   - Email: admin@tiffinbox.com
   - Password: (use a secure password)
4. Click "Add User"

## 3. Set Admin Flag in Firestore
1. Go to "Firestore Database" in Firebase Console
2. The `users` collection will be automatically created on first login
3. To manually set admin flag:
   - Navigate to `users/{uid}` (replace {uid} with the admin user's UID)
   - Add/update the following fields:
   ```json
   {
     "email": "admin@tiffinbox.com",
     "isAdmin": true,
     "createdAt": "serverTimestamp()"
   }
   ```

## 4. Verify Setup
1. Log out if currently logged in
2. Try logging in with admin credentials
3. You should be redirected to the admin dashboard
4. Non-admin users will be redirected to home page

## Security Rules
Add these Firestore security rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Notes
- Regular users will automatically get `isAdmin: false` on first login
- Admin status can only be changed through Firebase Console
- Keep admin credentials secure
- Consider implementing additional security measures like 2FA for admin accounts 