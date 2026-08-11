"use client";

import React, { useEffect, useRef, useState } from "react";
import { FileText, Loader2 } from "lucide-react";

interface PdfPreviewCardProps {
  file: File;
  className?: string;
}

export default function PdfPreviewCard({ file, className = "" }: PdfPreviewCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    const renderThumbnail = async () => {
      try {
        if (!file.name.toLowerCase().endsWith(".pdf")) {
          // If not a PDF (e.g. image tool), render image object URL directly
          setLoading(false);
          return;
        }

        // Dynamically import pdfjs-dist
        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        if (!active) return;

        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 0.3 });

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        if (active) setLoading(false);
      } catch (err) {
        console.warn("Failed to render PDF thumbnail:", err);
        if (active) {
          setError(true);
          setLoading(false);
        }
      }
    };

    renderThumbnail();

    return () => {
      active = false;
    };
  }, [file]);

  if (file.name.toLowerCase().match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
    // Render image preview
    return (
      <div className={`w-full h-full relative flex items-center justify-center bg-[#FBF1E9]/40 ${className}`}>
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          className="w-full h-full object-contain rounded"
        />
      </div>
    );
  }

  return (
    <div className={`w-full h-full relative flex items-center justify-center bg-[#FBF1E9]/40 border-[0.5px] border-[#EFE1D2] rounded overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
          <Loader2 className="w-5 h-5 animate-spin text-[#E8792A]" />
        </div>
      )}
      {error ? (
        <div className="flex flex-col items-center justify-center p-2 text-center">
          <FileText className="w-8 h-8 text-[#E8792A]/60 mb-1" />
          <span className="text-[10px] text-[#9C9488] font-medium uppercase">{file.name.split('.').pop()}</span>
        </div>
      ) : (
        <canvas ref={canvasRef} className="w-full h-full object-contain" />
      )}
    </div>
  );
}
