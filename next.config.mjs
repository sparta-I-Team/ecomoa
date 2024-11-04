/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "abofyjttdmlkgxhmvqik.supabase.co",
        pathname: "/storage/v1/object/public/avatars/**"
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**"
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
        pathname: "/**"
      }
    ],
    domains: ["abofyjttdmlkgxhmvqik.supabase.co"]
  }
};

export default nextConfig;
