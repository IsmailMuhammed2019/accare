# Environment Variables Setup Guide

## 🚨 **CRITICAL: You Need to Set Up Environment Variables**

The login error you're experiencing is because your Supabase credentials are not configured. Follow these steps:

## Step 1: Get Your Supabase Credentials

1. **Go to your Supabase Dashboard**: https://supabase.com/dashboard
2. **Select your project** (or create one if you haven't)
3. **Go to Settings → API**
4. **Copy these values**:
   - **Project URL** (looks like: `https://qdxguyracxlmrudxyhya.supabase.co`)
   - **Anon/Public Key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 2: Create Environment File

Create a file called `.env.local` in your project root (`/Users/user/Documents/Projects/accare/accare/.env.local`) with this content:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://qdxguyracxlmrudxyhya.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeGd1eXJhY3hsbXJ1ZHh5aHlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NzQ2NzEsImV4cCI6MjA1MDA1MDY3MX0.your-actual-anon-key-here

# Optional: Service role key (for admin operations)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## Step 3: Replace the Placeholder Values

Replace these values with your actual Supabase credentials:
- `https://qdxguyracxlmrudxyhya.supabase.co` → Your actual project URL
- `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` → Your actual anon key

## Step 4: Restart Your Development Server

After creating the `.env.local` file:

```bash
# Stop your current dev server (Ctrl+C)
# Then restart it
npm run dev
```

## Step 5: Create Admin User in Supabase

Since you don't have any users yet, you need to create an admin user:

### Option A: Using Supabase Dashboard
1. Go to **Authentication → Users** in your Supabase dashboard
2. Click **"Add user"**
3. Enter:
   - **Email**: `admin@accare.com`
   - **Password**: `admin123`
   - **Auto Confirm**: ✅ (check this box)
4. Click **"Create user"**

### Option B: Using SQL (Recommended)
Run this SQL in your Supabase SQL Editor:

```sql
-- Insert admin user profile
INSERT INTO profiles (id, email, first_name, last_name, role, status)
VALUES (
  'your-user-id-here',  -- You'll get this from the auth.users table
  'admin@accare.com',
  'Admin',
  'User',
  'ADMIN',
  'ACTIVE'
);
```

## Step 6: Test Login

Now try logging in with:
- **Email**: `admin@accare.com`
- **Password**: `admin123`

## 🔧 Troubleshooting

### If you still get errors:

1. **Check your environment variables**:
   ```bash
   # In your terminal, run:
   echo $NEXT_PUBLIC_SUPABASE_URL
   echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

2. **Verify Supabase connection**:
   - Go to your Supabase dashboard
   - Check if your project is active
   - Ensure the API keys are correct

3. **Check browser console**:
   - Open Developer Tools (F12)
   - Look for any remaining errors

### Common Issues:

- **400 Bad Request**: Usually means wrong API credentials
- **401 Unauthorized**: User doesn't exist or wrong password
- **Network Error**: Check your internet connection

## 📝 Next Steps

Once login works:
1. Test the registration flow
2. Create test caregiver and patient accounts
3. Test the dashboard functionality

## 🆘 Need Help?

If you're still having issues:
1. Double-check your Supabase credentials
2. Make sure the `.env.local` file is in the correct location
3. Restart your development server
4. Check the browser console for specific error messages
