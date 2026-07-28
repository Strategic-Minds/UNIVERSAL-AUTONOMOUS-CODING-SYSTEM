/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
    remotePatterns: [{ protocol: 'https', hostname: '**.supabase.co' }],
  },
  experimental: { serverComponentsExternalPackages: ['@supabase/supabase-js'] },
};
export default nextConfig;
