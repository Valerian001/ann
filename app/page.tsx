import { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useDropzone } from 'react-dropzone';
import SignatureCanvas from 'react-signature-canvas';
import Draggable from 'react-draggable';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
    const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
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
            <Draggable key={sig.id} defaultPosition={{ x: sig.x, y: sig.y }}>
              <img src={sig.data} alt="Signature" className="absolute cursor-move w-32 h-auto" />
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
