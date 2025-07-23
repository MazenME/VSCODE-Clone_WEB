import { useEffect, useRef } from "react";

interface Props {
  html: string;
  css: string;
  js: string;
}

export default function Preview({ html, css, js }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const documentContent = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;

    const iframe = iframeRef.current;
    if (iframe) {
      const doc = iframe.contentDocument;
      if (doc) {
        doc.open();
        doc.write(documentContent);
        doc.close();
      }
    }
  }, [html, css, js]);

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full bg-white border-none " 
      title="Preview"
    />
  );
}
