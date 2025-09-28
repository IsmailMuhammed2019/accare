# Supabase Setup Guide for A&C Care Application

## 🚀 Complete Setup Instructions

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `accare-service`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project" (takes 2-3 minutes)

### Step 2: Get Your Credentials

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Set Up Environment Variables

Create `.env.local` in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Step 4: Create Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the contents of `supabase-schema.sql` file
3. Paste and run the SQL script
4. Verify tables are created in **Table Editor**

### Step 5: Install Dependencies

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

### Step 6: Create Admin User

#### Method 1: Through Supabase Dashboard (Recommended)

1. Go to **Authentication** → **Users** in Supabase dashboard
2. Click "Add user"
3. Fill in:
   - **Email**: `admin@accare.com`
   - **Password**: `admin123` (change this!)
   - **Email Confirm**: ✅ (checked)
4. Click "Create user"
5. Copy the user ID from the users list

#### Method 2: Through SQL (Alternative)

1. Go to **SQL Editor**
2. Run this SQL (replace `admin-uuid-here` with the actual user ID):

```sql
-- First, insert the admin user into auth.users (this creates the auth user)
-- Then update the profile
UPDATE public.profiles 
SET 
  role = 'ADMIN',
  status = 'ACTIVE'
WHERE id = 'admin-uuid-here';
```

### Step 7: Update Frontend to Use Supabase

1. **Update your auth store imports** in components:
   ```typescript
   // Change from:
   import { useAuthStore } from '@/store/auth';
   
   // To:
   import { useAuthStore } from '@/store/supabase-auth';
   ```

2. **Update API calls** in your components to use the new API functions

### Step 8: Test the Setup

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/auth/login`
3. Login with admin credentials:
   - **Email**: `admin@accare.com`
   - **Password**: `admin123`
4. You should be redirected to `/admin/dashboard`

## 🔐 Admin Credentials

**Default Admin Credentials:**
- **Email**: `admin@accare.com`
- **Password**: `admin123`

⚠️ **Important**: Change these credentials immediately after first login!

## 🗄️ Database Tables Created

- `profiles` - User profiles with roles
- `caregiver_profiles` - Caregiver-specific information
- `patient_profiles` - Patient-specific information
- `appointments` - Care appointments
- `reviews` - Caregiver reviews/ratings
- `messages` - Chat between users
- `notifications` - System notifications

## 🔒 Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:
- Users can only see their own data
- Admins can see all data
- Caregivers can see assigned patients
- Patients can see their caregivers

## 📱 Features Available

### Admin Dashboard
- User management (approve/suspend users)
- View all caregivers and patients
- Manage appointments
- System analytics

### Caregiver Dashboard
- Manage profile and credentials
- View assigned appointments
- Chat with patients
- Update availability

### Patient Dashboard
- Complete profile information
- Book appointments
- View caregiver profiles
- Chat with caregivers
- Leave reviews

## 🚨 Troubleshooting

### Common Issues:

1. **"Invalid login credentials"**
   - Check if admin user exists in Supabase Auth
   - Verify email/password are correct

2. **"Permission denied"**
   - Check RLS policies
   - Ensure user has correct role

3. **"Table doesn't exist"**
   - Run the schema SQL script again
   - Check table names in Supabase dashboard

4. **Environment variables not working**
   - Restart development server after adding `.env.local`
   - Check variable names match exactly

### Getting Help:

1. Check Supabase logs in **Logs** section
2. Check browser console for errors
3. Verify API endpoints in **API** section

## 🔄 Next Steps

1. **Update your components** to use the new Supabase auth store
2. **Test user registration** for caregivers and patients
3. **Customize the admin dashboard** with your specific needs
4. **Add more features** like real-time notifications
5. **Set up email templates** for user verification

## 📞 Support

For issues with this setup:
- Check Supabase documentation
- Review the code in `src/lib/supabase.ts` and `src/store/supabase-auth.ts`
- Test API endpoints in Supabase dashboard

---

**Your A&C Care application is now ready with a full backend!** 🎉
