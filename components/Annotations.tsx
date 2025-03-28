import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Annotation } from "./types";


interface AnnotationsProps {
  onSave: (annotation: Annotation) => void;
}

const Annotations: React.FC<AnnotationsProps> = ({ onSave }) => {
  const sigCanvas = useRef<SignatureCanvas | null>(null);

  const saveSignature = () => {
    // if (sigCanvas.current) {
    //   const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png");
    //   onSave({ type: "signature", data: signatureData }); // Use correct type
    //   sigCanvas.current.clear();
    // }
    if (sigCanvas.current) {
      console.log(sigCanvas.current); // Debugging step
      console.log(typeof sigCanvas.current.getCanvas); // Should log "function"
  
      if (typeof sigCanvas.current.getTrimmedCanvas === "function") {
        const signatureData = sigCanvas.current.getCanvas().toDataURL("image/png");
        onSave({ type: "signature", data: signatureData }); // Use correct type
        sigCanvas.current.clear();
      } else {
        console.error("getTrimmedCanvas is not available.");
      }
    }
  };

  return (
    <div className="mt-4 border p-2">
      <h3>Sign Here:</h3>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ width: 300, height: 100, className: "border" }}
      />
      <button className="mt-2 p-2 bg-blue-500 text-white" onClick={saveSignature}>
        Save Signature
      </button>
    </div>
  );
};

export default Annotations;