import React from "react";
import "../globals.css";
import AppShell from "../../components/AppShell";
import Script from "next/script";

export const metadata = {
  title: "WeLovePDF — मुफ्त ऑनलाइन पीडीएफ टूल्स",
  description: "WeLovePDF सभी 60 पीडीएफ टूल्स मुफ्त में प्रदान करता है - पीडीएफ मर्ज करें, विभाजित करें, कंप्रेस करें, कनवर्ट करें, ओसीआर करें। 100% सुरक्षित और स्थानीय।",
  metadataBase: new URL("https://www.welovepdf.best"),
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.welovepdf.best/hi",
    languages: {
      en: "https://www.welovepdf.best",
      hi: "https://www.welovepdf.best/hi",
      "x-default": "https://www.welovepdf.best",
    }
  }
};

export default function HindiRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-RXLDJ7S34L"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-RXLDJ7S34L');
            gtag('config', 'G-1G49X8GSHB');
          `
        }} />
        {/* Google Tag Manager — must be as high in <head> as possible */}
        <Script
          id="gtm-head"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KCDRXS3J');`,
          }}
        />
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) — immediately after <body> */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KCDRXS3J"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
