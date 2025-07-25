import { useEffect, useMemo, useRef } from "react";

interface Props {
  html: string;
  css: string;
  js: string;
}

export default function Preview({ html, css, js }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const documentContent = useMemo(() => {
    return `
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
 }, [html, css, js]);
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(documentContent);
    doc.close();
  }, [documentContent]);

  return (
    <iframe
      ref={iframeRef}
      title="Preview"
      className="w-full h-full bg-white border-none"
      sandbox="allow-scripts"
    />
  );
}
