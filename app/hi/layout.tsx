import React from "react";
import "../globals.css";
import AppShell from "../../components/AppShell";
import Script from "next/script";
import CookieBanner from "../../components/CookieBanner";

export const metadata = {
  title: "WeLovePDF — 100% सुरक्षित और निजी PDF इंजन (जीरो सर्वर अपलोड)",
  description: "अपने ब्राउज़र मेमोरी में पीडीएफ मर्ज, कंप्रेस, कन्वर्ट और एडिट करें बिना किसी सर्वर अपलोड के। 100% प्राइवेट, वेबअसेंबली स्पीड, हमेशा के लिए मुफ्त।",
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
  },
  openGraph: {
    title: "WeLovePDF — 100% सुरक्षित और निजी PDF इंजन (जीरो सर्वर अपलोड)",
    description: "अपने ब्राउज़र मेमोरी में पीडीएफ मर्ज, कंप्रेस, कन्वर्ट और एडिट करें बिना किसी सर्वर अपलोड के। 100% प्राइवेट, वेबअसेंबली स्पीड, हमेशा के लिए मुफ्त।",
    url: "https://www.welovepdf.best/hi",
    siteName: "WeLovePDF",
    locale: "hi_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WeLovePDF™ — 100% सुरक्षित और निजी PDF इंजन (जीरो सर्वर अपलोड)",
    description: "अपने ब्राउज़र मेमोरी में पीडीएफ मर्ज, कंप्रेस, कन्वर्ट और एडिट करें बिना किसी सर्वर अपलोड के। 100% प्राइवेट, वेबअसेंबली स्पीड, हमेशा के लिए मुफ्त।",
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
                  "url": "https://www.welovepdf.best/hi",
                  "logo": "https://www.welovepdf.best/icon.svg",
                  "sameAs": [
                    "https://twitter.com/welovepdf",
                    "https://github.com/welovepdf"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://www.welovepdf.best/hi/#website",
                  "url": "https://www.welovepdf.best/hi",
                  "name": "WeLovePDF",
                  "publisher": {
                    "@id": "https://www.welovepdf.best/#organization"
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://www.welovepdf.best/hi/?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
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
