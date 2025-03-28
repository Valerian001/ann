"use client"

import { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useDropzone } from 'react-dropzone';
import SignatureCanvas from 'react-signature-canvas';
import Draggable from 'react-draggable';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PDFSigner() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [signatures, setSignatures] = useState([]);
  const sigCanvas = useRef(null);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'application/pdf',
  });

  const addSignature = () => {
    const signatureData = sigCanvas.current.getCanvas().toDataURL('image/png');
    setSignatures([...signatures, { id: Date.now(), data: signatureData, x: 50, y: 50 }]);
  };

  return (
    <div className="container mx-auto p-4">
      <div {...getRootProps()} className="border-dashed border-2 p-4 text-center cursor-pointer">
        <input {...getInputProps()} />
        <p>Drag & drop a PDF here, or click to select one</p>
      </div>
      {file && (
        <div className="relative mt-4">
          <Document
            file={file}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
          {signatures.map((sig) => (
            <Draggable
            key={sig.id}
            defaultPosition={{ x: sig.x, y: sig.y }}
            onStop={(event, data) => handleDrag(sig.id, event, data)}
          >
            <div style={{ position: 'absolute', cursor: 'move' }}>
              <img src={sig.data} alt="Signature" className="w-32 h-auto" />
            </div>
          </Draggable>
          ))}
        </div>
      )}
      <div className="mt-4 border p-2">
        <h3>Sign Here:</h3>
        <SignatureCanvas ref={sigCanvas} penColor="black" canvasProps={{ width: 300, height: 100, className: 'border' }} />
        <button className="mt-2 p-2 bg-blue-500 text-white" onClick={addSignature}>Save Signature</button>
      </div>
    </div>
  );
}
