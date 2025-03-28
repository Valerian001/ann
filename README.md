# PDF Signer & Annotator

A single-page document signer and annotation tool that allows users to work with PDF documents. This application enables users to upload PDFs, add signatures, highlight and underline text, add comments, and export the annotated document.

## Features

### Core Functionality

#### Document Upload

- Upload PDF documents via drag-and-drop or file selection dialog
- Display uploaded document in the viewport

#### Annotation Features

- Draw and place signatures anywhere on the document
- Highlight text with customizable colors
- Underline text with customizable colors
- Add comments attached to specific parts of the document
- Drag and move annotations freely on the document

#### Document Export

- Export the annotated document as a PDF
- All annotations and signatures are embedded in the exported PDF
- Exported document maintains the quality of the original

### Technical Implementation

- Built with Next.js as a single-page application (SPA)
- Responsive design that works well on different screen sizes
- Clean, intuitive, and professional UI/UX
- Real-time annotation preview

## Libraries and Tools Used

- **Next.js** – Chosen for its performance benefits, including server-side rendering and static generation.
- **react-pdf** – For rendering PDF documents in the browser.
- **react-signature-canvas** – Enables users to create digital signatures.
- **pdf-lib** – Allows manipulation of PDFs, embedding annotations into exported files.
- **react-dropzone** – Provides an intuitive drag-and-drop file upload experience.
- **Tailwind CSS** – Used for styling the application efficiently.
- **shadcn/ui** – Provides reusable UI components for a clean interface.
- **Lucide React** – Used for lightweight and modern icons.
- **pdfjs-dist**: PDF.js library for PDF parsing and rendering
- **react-signature-canvas**: For creating digital signatures
- **@hello-pangea/dnd**: For improved drag-and-drop handling
- **react-dropzone**: For drag-and-drop file upload functionality
- **@radix-ui/react-label**: Accessibility-friendly form labels
- **@radix-ui/react-popover**: For pop-up interactions
- **@radix-ui/react-slot**: For component composition
- **@radix-ui/react-tooltip**: For tooltips
- **class-variance-authority**: Utility for managing className variants
- **tailwind-merge**: Optimizes Tailwind CSS class merging

## Setup and Running Instructions

### Prerequisites

Ensure you have **Node.js** and **npm** installed on your system.

### Installation Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/Valerian001/ann.git
   cd ann
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build and Run for Production

To create a production build and serve it:

```sh
npm run build
npm run start
```

## Challenges and Solutions

### 1. PDF Annotation Positioning

- **Challenge**: Accurately positioning annotations on PDF pages, especially when dealing with different zoom levels and scrolling.
- **Solution**: Implemented a coordinate system that tracks the position of annotations relative to the PDF container and adjusts for scaling and scrolling.

### 2. Text Selection for Highlighting

- **Challenge**: Capturing text selections and applying highlight/underline styles accurately.
- **Solution**: Used the browser's Selection API to get the selected text and its bounding rectangles, then created overlay elements positioned precisely over the selected text.

### 3. PDF Export with Annotations

- **Challenge**: Embedding annotations in the exported PDF while preserving them across different PDF viewers.
- **Solution**: Used **pdf-lib** to manipulate the PDF document and add annotations programmatically before export.

### 3. PDF Export with Annotations

- **Challenge**: getting highlighing to stop redacting text when exported 
- **Solution**: currently unsolved


## Future Improvements

With more time, I would add the following features:

1. **Annotation Persistence**: Save annotations to a database to allow users to continue editing later.
2. **Collaboration**: Allow multiple users to annotate the same document simultaneously.
3. **More Annotation Types**: Add shapes, arrows, and freehand drawing tools.
4. **Text Editing**: Allow users to add and edit text directly on the PDF.
5. **Mobile Optimization**: Further improve the mobile experience with touch-friendly controls.
6. **Undo/Redo Functionality**: Add history tracking for all annotation actions.
7. **PDF Form Filling**: Support for filling out PDF forms.
8. **Annotation Search**: Allow users to search through comments and highlighted text.
9. **Performance Optimization**: Improve rendering performance for large documents.
10. **Accessibility Improvements**: Ensure the application is fully accessible to users with disabilities.
11. **login and signup**: Ensure the application is fully accessible to users by improving scalabilty.



