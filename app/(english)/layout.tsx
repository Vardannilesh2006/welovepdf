import React from "react";
import "../globals.css";
import AppShell from "../../components/AppShell";
import Script from "next/script";
import CookieBanner from "../../components/CookieBanner";

export const metadata = {
  title: "WeLovePDF — 100% Private PDF Engine (Runs in Browser, Zero Upload)",
  description: "Process, merge, compress & edit PDFs privately inside your browser memory sandbox. Zero server uploads, zero data tracking, instant WebAssembly speed. 100% free forever.",
  metadataBase: new URL("https://www.welovepdf.best"),
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.welovepdf.best",
    languages: {
      en: "https://www.welovepdf.best",
      hi: "https://www.welovepdf.best/hi",
      "x-default": "https://www.welovepdf.best",
    }
  },
  openGraph: {
    title: "WeLovePDF — 100% Private PDF Engine (Runs in Browser, Zero Upload)",
    description: "Process, merge, compress & edit PDFs privately inside your browser memory sandbox. Zero server uploads, zero data tracking, instant WebAssembly speed. 100% free forever.",
    url: "https://www.welovepdf.best",
    siteName: "WeLovePDF",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WeLovePDF™ — 100% Private PDF Engine (Runs in Browser, Zero Upload)",
    description: "Process, merge, compress & edit PDFs privately inside your browser memory sandbox. Zero server uploads, zero data tracking, instant WebAssembly speed. 100% free forever.",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) — G-J28XZEQQ83 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J28XZEQQ83"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J28XZEQQ83');
          `}
        </Script>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://www.welovepdf.best/#organization",
                  "name": "WeLovePDF",
                  "url": "https://www.welovepdf.best",
                  "logo": "https://www.welovepdf.best/icon.svg",
                  "sameAs": [
                    "https://twitter.com/welovepdf",
                    "https://github.com/welovepdf"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.welovepdf.best/#website",
                  "url": "https://www.welovepdf.best",
                  "name": "WeLovePDF",
                  "publisher": {
                    "@id": "https://www.welovepdf.best/#organization"
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://www.welovepdf.best/?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                },
                {
                  "@type": "WebApplication",
                  "@id": "https://www.welovepdf.best/#webapp",
                  "name": "WeLovePDF",
                  "url": "https://www.welovepdf.best",
                  "applicationCategory": "UtilitiesApplication",
                  "operatingSystem": "All",
                  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                  "description": "100% Private in-browser PDF processor. Merge, compress, and convert PDFs with zero server uploads."
                }
              ]
            })
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
        <CookieBanner />
      </body>
    </html>
  );
}
