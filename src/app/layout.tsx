import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReactQueryProvider } from "@/shared/config";
import { Header } from "@/shared/ui";
import { IndexedDBInitializer } from "@/shared/components/IndexedDBInitializer";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  preload: true,
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "CERTICOS BOOKS - 도서 검색 및 즐겨찾기 플랫폼",
    template: "CERTICOS BOOKS",
  },
  description:
    "도서 검색 API를 활용한 도서 검색 및 즐겨찾기 관리 플랫폼입니다. 원하는 도서를 검색하고 개인 즐겨찾기 목록을 관리할 수 있습니다.",
  keywords: [
    "도서 검색",
    "책 검색",
    "도서 관리",
    "즐겨찾기",
    "도서 API",
    "책 추천",
    "독서",
    "도서관리",
  ],
  authors: [{ name: "CERTICOS" }],
  creator: "CERTICOS",
  publisher: "CERTICOS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("http://localhost:3000"), // 실제 도메인으로 변경
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "CERTICOS BOOKS",
    title: "CERTICOS BOOKS - 도서 검색 및 즐겨찾기 플랫폼",
    description:
      "도서 검색 API를 활용한 도서 검색 및 즐겨찾기 관리 플랫폼입니다.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "technology",
  classification: "도서 검색 및 관리 서비스",
  referrer: "origin-when-cross-origin",
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
  manifest: "/manifest.json", // PWA 매니페스트 파일
  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        rel="preconnect"
        href={process.env.NEXT_PUBLIC_KAKAO_API_BASE_URL}
      />
      <link
        rel="dns-prefetch"
        href={process.env.NEXT_PUBLIC_KAKAO_API_BASE_URL}
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <IndexedDBInitializer />
          <Header />
          <main className="pt-16 min-h-screen bg-gray-50">{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
