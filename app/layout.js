import "./globals.css";
import "./auth-polish.css";
import "./contrast-fix.css";
import "./language-colors.css";
import "./performance-polish.css";
import "./lingobridge-v2.css";

export const metadata = {
  title: "LingoBridge — Chinese, English & Amharic",
  description: "A secure multilingual Chinese translation and learning experience for English and Amharic speakers.",
  applicationName: "LingoBridge",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#08111f",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Noto+Sans+Ethiopic:wght@400;600;700&family=Noto+Sans+SC:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
