"use client"

import { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useDropzone } from 'react-dropzone';
import SignatureCanvas from 'react-signature-canvas';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

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
    setSignatures([...signatures, { id: Date.now().toString(), data: signatureData, x: 50, y: 50 }]);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedSignatures = [...signatures];
    const [movedSignature] = updatedSignatures.splice(result.source.index, 1);
    updatedSignatures.splice(result.destination.index, 0, movedSignature);

    setSignatures(updatedSignatures);
  };

  return (
    <div className="container mx-auto p-4">
      <div {...getRootProps()} className="border-dashed border-2 p-4 text-center cursor-pointer">
        <input {...getInputProps()} />
        <p>Drag & drop a PDF here, or click to select one</p>
      </div>
      {file && (
        <div className="relative mt-4">
          <Document file={file} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="signatures">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {signatures.map((sig, index) => (
                    <Draggable key={sig.id} draggableId={sig.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            position: 'absolute',
                            left: sig.x,
                            top: sig.y,
                            cursor: 'move',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <img src={sig.data} alt="Signature" className="w-32 h-auto" />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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