import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Image from "next/image";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Annotation } from "./types";
import Draggable from 'react-draggable';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PDFViewProps {
  file: File | null;
  annotations: Annotation[];
}

const PDFView: React.FC<PDFViewProps> = ({ file, annotations }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  if (!file) return null;

  return (
    <div className="mt-4">
      <Document file={pdfUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
        {numPages &&
          Array.from({ length: numPages }, (_, index) => (
            <div key={`page_${index + 1}`} className="relative">
              <Page pageNumber={index + 1} />
              {/* Render annotations */}
              {annotations.map((annotation, idx) => (
                annotation.type === "signature" && (
                  <Draggable key={`annotation_${idx}`} defaultPosition={{ x: annotation.x, y: annotation.y }}>
                    <Image
                      width={100}
                      height={100}
                      src={annotation.data}
                      alt="Signature"
                      className="absolute left-10 bottom-10 w-32 h-auto"
                    />
                  </Draggable>
                )
              ))}
            </div>
          ))}
      </Document>
    </div>
  );
};

export default PDFView;
