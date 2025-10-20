import path from "path";
const __dirname = path.resolve();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // SVG를 React 컴포넌트로 변환하는 설정
    config.module.rules.push({
      test: /\.svg$/,
      include: path.resolve(__dirname, "src/assets"),
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "search1.kakaocdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "t1.daumcdn.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
