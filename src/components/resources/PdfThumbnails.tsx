"use client";

import { useEffect, useRef, useState } from "react";
import { openPdf, renderPage } from "@/lib/pdf";

interface Props {
  url: string;
  title: string;
  pageLabel: string;
  count?: number;
}

/** The first pages of a PDF drawn side by side, as a preview on a guide card. */
export default function PdfThumbnails({ url, title, pageLabel, count = 3 }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  const canvases = useRef<(HTMLCanvasElement | null)[]>([]);
  const [visible, setVisible] = useState(false);
  const [pages, setPages] = useState(count);
  const [failed, setFailed] = useState(false);

  // Start loading the PDF only when the card is close to the screen.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { rootMargin: "400px 0px" });
    io.observe(grid);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let active = true;
    openPdf(url)
      .then(async (doc) => {
        const n = Math.min(count, doc.numPages);
        if (!active) return;
        setPages(n);
        for (let i = 0; i < n; i++) {
          const canvas = canvases.current[i];
          if (!active || !canvas) return;
          const width = canvas.parentElement?.clientWidth || 240;
          await renderPage(doc, i + 1, canvas, width);
        }
      })
      .catch(() => active && setFailed(true));
    return () => {
      active = false;
    };
  }, [visible, url, count]);

  if (failed) return null;

  return (
    <div ref={gridRef} className="grid grid-cols-3 gap-3 select-none sm:gap-5" onContextMenu={(e) => e.preventDefault()}>
      {Array.from({ length: pages }, (_, i) => (
        <div key={i} className="relative aspect-[1/1.414] overflow-hidden rounded-xl bg-aspol-mist ring-1 ring-aspol-line">
          <canvas
            ref={(el) => {
              canvases.current[i] = el;
            }}
            role="img"
            aria-label={`${title} - ${pageLabel} ${i + 1}`}
            className="block"
          />
        </div>
      ))}
    </div>
  );
}
