"use client";

import React, { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console or other monitoring tools
    console.error("Global Layout Error Caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased bg-[#FFF8F2]">
        <div className="min-h-screen w-full flex items-center justify-center px-16 py-32">
          <div className="max-w-[480px] w-full text-center p-32 bg-white border border-[#E5E7EB] rounded-[16px] shadow-sm flex flex-col items-center gap-20">
            <div className="w-[56px] h-[56px] rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-8">
              {/* Warning Icon SVG */}
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h1 className="font-heading font-black text-2xl text-slate-800 leading-tight">
              A critical error occurred
            </h1>
            <p className="text-[13px] text-slate-500 leading-relaxed">
              The application layout crashed. Please refresh the browser or click below to retry the initialization.
            </p>
            <button
              onClick={() => reset()}
              type="button"
              className="w-full px-16 py-10 bg-[#D97706] hover:bg-[#B45309] text-white font-bold rounded text-[13px] transition-colors shadow-sm"
            >
              Reset Application State
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
