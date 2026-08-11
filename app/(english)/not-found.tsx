import React from "react";

export const metadata = {
  title: "404 — Page Not Found | WeLovePDF",
  description: "The page or tool you requested could not be found. Return to WeLovePDF for 60+ free online PDF tools.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center bg-[#FFF8F2] px-16 py-32">
      <div className="max-w-[480px] w-full text-center p-32 bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm flex flex-col items-center gap-20">
        <div className="w-[64px] h-[64px] rounded-full bg-amber-100 flex items-center justify-center text-[#D97706] mb-4">
          <span className="font-heading font-black text-2xl">404</span>
        </div>
        <h1 className="font-heading font-black text-2xl text-slate-900 leading-tight">
          Page Not Found
        </h1>
        <p className="text-[14px] text-slate-600 leading-relaxed">
          The PDF tool or page you are looking for does not exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-12 w-full mt-12">
          <a
            href="/"
            className="w-full py-12 px-20 bg-[#D97706] hover:bg-[#B45309] text-white font-bold rounded-lg text-[14px] transition-colors text-center shadow-sm"
          >
            Explore All 63+ Tools
          </a>
          <a
            href="/blog"
            className="w-full py-12 px-20 border border-slate-300 hover:border-[#D97706] text-slate-700 hover:text-[#D97706] font-bold rounded-lg text-[14px] transition-colors text-center bg-white"
          >
            View Guides
          </a>
        </div>
      </div>
    </div>
  );
}
