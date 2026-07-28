# GitHub Secrets Needed for CI/CD
# Add these in: https://github.com/Strategic-Minds/UNIVERSAL-AUTONOMOUS-CODING-SYSTEM/settings/secrets/actions

GOOGLEDRIVE_ACCESS_TOKEN  = (your Drive OAuth token — refresh via Base44 connector)
NEXT_PUBLIC_SUPABASE_URL  = https://prhppuuwcnmfdhwsagug.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = (from Supabase dashboard → Settings → API)
SUPABASE_SERVICE_ROLE_KEY = (from Supabase dashboard → Settings → API)
GITHUB_TOKEN              = (auto-provided by GitHub Actions)
VERCEL_TOKEN              = (from Vercel → Account Settings → Tokens)
BROWSERWORKER_SECRET      = (confirm value in BW Vercel project)

# These are already set in Vercel project environment:
# NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
# SUPABASE_SERVICE_ROLE_KEY, GITHUB_TOKEN, VERCEL_TOKEN,
# CHATGPT_BRIDGE_URL, BROWSERWORKER_URL, UACS_DRIVE_FOLDER_ID
