export type AnnotationType = "signature"; // Extend this if needed.

export interface Annotation {
  y: unknown;
  x: unknown;
  type: AnnotationType;
  data: string;
}
