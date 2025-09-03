# Google Maps API Setup Guide

## How to Get Your Google Maps API Key

### Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing for your project (required for API usage)

### Step 2: Enable the Maps JavaScript API
1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Maps JavaScript API"
3. Click on it and press "Enable"

### Step 3: Create API Credentials
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key

### Step 4: Restrict the API Key (Recommended)
1. Click on the API key you just created
2. Under "Application restrictions", select "HTTP referrers (web sites)"
3. Add your domain(s):
   - `localhost:3000/*` (for development)
   - `localhost:3001/*` (for development)
   - Your production domain (e.g., `yourdomain.com/*`)
4. Under "API restrictions", select "Restrict key"
5. Select "Maps JavaScript API" from the dropdown
6. Click "Save"

### Step 5: Add the API Key to Your Project
1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your API key:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```
3. Restart your development server

### Step 6: Test the Map
1. Visit your contact page
2. The map should now load properly with your service area

## Important Notes
- The API key is free for reasonable usage (up to $200/month credit)
- Keep your API key secure and don't commit it to version control
- The `.env.local` file is already in `.gitignore` to prevent accidental commits

## Troubleshooting
- If you still see errors, make sure you've enabled the Maps JavaScript API
- Check that your API key restrictions allow your domain
- Verify the API key is correctly added to `.env.local`
- Restart your development server after adding the environment variable
