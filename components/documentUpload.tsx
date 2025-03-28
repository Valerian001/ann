import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DocumentUploaderProps {
  onFileSelect: (file: File) => void;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onFileSelect }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
  });

  return (
    <div
      {...getRootProps()}
      className="border-dashed border-2 p-4 text-center cursor-pointer"
    >
      <input {...getInputProps()} />
      <p>Drag & drop a PDF here, or click to select one</p>
    </div>
  );
};

export default DocumentUploader;
