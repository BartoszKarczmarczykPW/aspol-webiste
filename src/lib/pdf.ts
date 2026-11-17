"use client";

import type { PDFDocumentProxy } from "pdfjs-dist";

type PdfJs = typeof import("pdfjs-dist");

let pdfjs: Promise<PdfJs> | null = null;
const documents = new Map<string, Promise<PDFDocumentProxy>>();

/** pdf.js is loaded only in the browser and only when a guide is on screen. */
function loadPdfJs(): Promise<PdfJs> {
  pdfjs ??= import("pdfjs-dist").then((lib) => {
    lib.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();
    return lib;
  });
  return pdfjs;
}

/** Opens a PDF once per URL; the card previews and the full viewer share it. */
export function openPdf(url: string): Promise<PDFDocumentProxy> {
  let doc = documents.get(url);
  if (!doc) {
    doc = loadPdfJs().then((lib) => lib.getDocument({ url }).promise);
    doc.catch(() => documents.delete(url));
    documents.set(url, doc);
  }
  return doc;
}

/**
 * Draws one page into `canvas` at `cssWidth` CSS pixels wide, sharp on high-DPI
 * screens. Returns the rendered CSS height.
 */
export async function renderPage(doc: PDFDocumentProxy, pageNumber: number, canvas: HTMLCanvasElement, cssWidth: number) {
  const page = await doc.getPage(pageNumber);
  const base = page.getViewport({ scale: 1 });
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const viewport = page.getViewport({ scale: (cssWidth / base.width) * ratio });
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${(cssWidth * base.height) / base.width}px`;
  const task = page.render({ canvas, viewport });
  await task.promise;
  return (cssWidth * base.height) / base.width;
}
