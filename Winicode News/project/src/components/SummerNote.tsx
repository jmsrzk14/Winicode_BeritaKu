import React, { useEffect, useRef } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  getContentRef: (fn: () => Promise<string>) => void;
  placeholder?: string;
}

const SummernoteEditor: React.FC<Props> = ({ value, onChange, getContentRef, placeholder }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const initializedRef = useRef(false);

  // Escape value untuk mencegah script injection
  const escapedValue = JSON.stringify(value).replace(/<\/script/g, '<\\/script');

  const editorHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.css" rel="stylesheet">
      <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js"></script>
    </head>
    <body>
      <div id="editor"></div>
      <script>
        window.addEventListener('message', function(event) {
          const { type, value } = event.data || {};
          if (type === 'setContent') {
            $('#editor').summernote('code', value || '');
          } else if (type === 'getContent') {
            const content = $('#editor').summernote('code');
            parent.postMessage({ type: 'editorContent', value: content }, '*');
          }
        });

        $(document).ready(function() {
          $('#editor').summernote({
            height: 300,
            placeholder: '${placeholder || 'Masukkan deskripsi berita...'}',
            callbacks: {
              onChange: function(contents) {
                parent.postMessage({ type: 'contentChanged', value: contents }, '*');
              }
            }
          });
          $('#editor').summernote('code', ${escapedValue});
        });
      </script>
    </body>
    </html>
  `;

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || initializedRef.current) return;

    iframe.srcdoc = editorHtml;
    initializedRef.current = true;

    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === 'contentChanged') {
        console.log('Konten dari iframe:', e.data.value); // Debug log
        onChange(e.data.value || '');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [onChange]);

  // Perbarui konten editor saat value berubah
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({ type: 'setContent', value: value || '' }, '*');
    }
  }, [value]);

  useEffect(() => {
    if (!iframeRef.current) return;

    const getContent = () => {
      return new Promise<string>((resolve) => {
        const listener = (e: MessageEvent) => {
          if (e.data?.type === 'editorContent') {
            console.log('Konten dari getContent:', e.data.value); // Debug log
            resolve(e.data.value || '');
            window.removeEventListener('message', listener);
          }
        };
        window.addEventListener('message', listener);
        iframeRef.current!.contentWindow?.postMessage({ type: 'getContent' }, '*');
      });
    };

    getContentRef(getContent);
  }, [getContentRef]);

  return (
    <iframe
      ref={iframeRef}
      style={{ width: '100%', height: 350 }}
      sandbox="allow-scripts allow-same-origin"
    />
  );
};

export default SummernoteEditor;