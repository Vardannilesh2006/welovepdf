"use client";

import React, { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console or other monitoring tools
    console.error("Application Render Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center bg-[#FFF8F2] px-16 py-32">
      <div className="max-w-[480px] w-full text-center p-32 bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm flex flex-col items-center gap-20">
        <div className="w-[56px] h-[56px] rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-8">
          {/* Warning Icon SVG */}
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="font-heading font-black text-2xl text-slate-800 leading-tight">
          Something went wrong
        </h1>
        <p className="text-[13px] text-slate-500 leading-relaxed">
          We encountered an unexpected error while processing your request. Please try reloading the tool page or return home.
        </p>
        
        {error.message && (
          <div className="w-full p-12 bg-slate-50 rounded border border-slate-200 text-left text-[11px] font-mono text-red-600 overflow-auto max-h-[120px] whitespace-pre-wrap leading-normal">
            {error.name}: {error.message}
          </div>
        )}

        <div className="flex items-center gap-12 w-full mt-8">
          <button
            onClick={() => reset()}
            type="button"
            className="flex-1 px-16 py-10 bg-[#D97706] hover:bg-[#B45309] text-white font-bold rounded text-[13px] transition-colors flex items-center justify-center gap-8 shadow-sm"
          >
            Try Again
          </button>
          <a
            href="/"
            className="flex-1 px-16 py-10 border border-[#E5E7EB] hover:border-[#D97706] text-slate-600 hover:text-[#D97706] font-bold rounded text-[13px] transition-colors flex items-center justify-center gap-8 bg-white"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
