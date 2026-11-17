"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { Download, Loader2, Minus, Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { openPdf, renderPage } from "@/lib/pdf";

const LABELS = {
  en: { page: "Page", of: "of", zoomIn: "Zoom in", zoomOut: "Zoom out", download: "Download PDF", loading: "Loading the guide…", error: "The guide could not be loaded. Please refresh the page." },
  pl: { page: "Strona", of: "z", zoomIn: "Powiększ", zoomOut: "Pomniejsz", download: "Pobierz PDF", loading: "Wczytywanie poradnika…", error: "Nie udało się wczytać poradnika. Odśwież stronę." },
  fr: { page: "Page", of: "sur", zoomIn: "Zoom avant", zoomOut: "Zoom arrière", download: "Télécharger le PDF", loading: "Chargement du guide…", error: "Impossible de charger le guide. Veuillez actualiser la page." },
} as const;

const ZOOMS = [0.75, 1, 1.25, 1.5, 2];
const MAX_PAGE_WIDTH = 900;

interface Props {
  url: string;
  title: string;
  /** Shows a download button when set. */
  downloadUrl?: string | null;
}

/**
 * Full PDF reader embedded in the page: every page is drawn on a canvas inside
 * a scrollable frame (no browser PDF viewer, no new tab). Pages render lazily
 * as they come near the visible area.
 */
export default function PdfViewer({ url, title, downloadUrl }: Props) {
  const { language } = useLanguage();
  const l = LABELS[(language in LABELS ? language : "en") as keyof typeof LABELS];

  const frameRef = useRef<HTMLDivElement>(null);
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [ratio, setRatio] = useState(1.414);
  const [error, setError] = useState(false);
  const [frameWidth, setFrameWidth] = useState(0);
  const [zoomIndex, setZoomIndex] = useState(1);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    let active = true;
    openPdf(url)
      .then(async (d) => {
        const first = await d.getPage(1);
        const vp = first.getViewport({ scale: 1 });
        if (!active) return;
        setRatio(vp.height / vp.width);
        setDoc(d);
      })
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, [url]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const ro = new ResizeObserver(([entry]) => setFrameWidth(entry.contentRect.width));
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  const fitWidth = Math.max(0, Math.min(frameWidth - 32, MAX_PAGE_WIDTH));
  const pageWidth = Math.round(fitWidth * ZOOMS[zoomIndex]);
  const pageCount = doc?.numPages ?? 0;

  return (
    <div className="overflow-hidden rounded-[2rem] bg-aspol-dark ring-1 ring-aspol-line">
      {/* Toolbar */}
      <div className="on-dark flex flex-wrap items-center justify-between gap-3 bg-aspol-navy px-4 py-3 text-white sm:px-6">
        <p className="text-sm font-semibold tabular-nums" aria-live="polite">
          {pageCount > 0 ? `${l.page} ${current} ${l.of} ${pageCount}` : " "}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoomIndex((z) => Math.max(0, z - 1))}
            disabled={zoomIndex === 0}
            aria-label={l.zoomOut}
            className="grid size-9 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white/25 disabled:opacity-40"
          >
            <Minus className="size-4" aria-hidden="true" />
          </button>
          <span className="w-12 text-center text-sm font-semibold tabular-nums">{Math.round(ZOOMS[zoomIndex] * 100)}%</span>
          <button
            type="button"
            onClick={() => setZoomIndex((z) => Math.min(ZOOMS.length - 1, z + 1))}
            disabled={zoomIndex === ZOOMS.length - 1}
            aria-label={l.zoomIn}
            className="grid size-9 place-items-center rounded-full bg-white/15 transition-colors hover:bg-white/25 disabled:opacity-40"
          >
            <Plus className="size-4" aria-hidden="true" />
          </button>
          {downloadUrl && (
            <a
              href={`${downloadUrl}?dl=`}
              className="ml-2 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-aspol-dark transition-colors hover:bg-aspol-mist"
            >
              <Download className="size-4" aria-hidden="true" />
              <span className="hidden sm:inline">{l.download}</span>
            </a>
          )}
        </div>
      </div>

      {/* Scrollable pages */}
      <div
        ref={frameRef}
        className="h-[75vh] min-h-[28rem] overflow-auto overscroll-contain bg-aspol-mist select-none"
        onContextMenu={(e) => e.preventDefault()}
        role="document"
        aria-label={title}
      >
        {error ? (
          <p className="p-8 text-center text-aspol-ink-soft">{l.error}</p>
        ) : !doc || pageWidth === 0 ? (
          <p className="flex h-full items-center justify-center gap-3 text-aspol-ink-soft">
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            {l.loading}
          </p>
        ) : (
          <div className="mx-auto flex w-max min-w-full flex-col items-center gap-4 p-4">
            {Array.from({ length: pageCount }, (_, i) => (
              <PdfPage
                key={i + 1}
                doc={doc}
                pageNumber={i + 1}
                width={pageWidth}
                placeholderHeight={Math.round(pageWidth * ratio)}
                root={frameRef}
                onVisible={setCurrent}
                label={`${title} - ${l.page} ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface PageProps {
  doc: PDFDocumentProxy;
  pageNumber: number;
  width: number;
  placeholderHeight: number;
  root: React.RefObject<HTMLDivElement | null>;
  onVisible: (page: number) => void;
  label: string;
}

function PdfPage({ doc, pageNumber, width, placeholderHeight, root, onVisible, label }: PageProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chain = useRef<Promise<unknown>>(Promise.resolve());
  const [near, setNear] = useState(false);
  const [height, setHeight] = useState<number | null>(null);

  // Render only pages near the visible area; report the page that fills the middle of the frame.
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const lazy = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { root: root.current, rootMargin: "150% 0px" });
    const middle = new IntersectionObserver(([e]) => e.isIntersecting && onVisible(pageNumber), {
      root: root.current,
      rootMargin: "-50% 0px -50% 0px",
    });
    lazy.observe(box);
    middle.observe(box);
    return () => {
      lazy.disconnect();
      middle.disconnect();
    };
  }, [root, onVisible, pageNumber]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!near || !canvas) return;
    let active = true;
    // pdf.js cannot draw twice on one canvas at the same time, so renders are queued.
    chain.current = chain.current
      .catch(() => undefined)
      .then(() => (active ? renderPage(doc, pageNumber, canvas, width) : null))
      .then((h) => {
        if (active && typeof h === "number") setHeight(h);
      });
    return () => {
      active = false;
    };
  }, [near, doc, pageNumber, width]);

  return (
    <div
      ref={boxRef}
      className="relative bg-white shadow-[0_8px_30px_-12px_rgba(18,35,72,0.35)]"
      style={{ width, height: height ?? placeholderHeight }}
    >
      <canvas ref={canvasRef} role="img" aria-label={label} draggable={false} className="block" />
    </div>
  );
}
