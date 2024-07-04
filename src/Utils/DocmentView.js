
import React from 'react';
import { useParams } from 'react-router-dom';

const ViewDocument = () => {
  const { documentUrl } = useParams();

  return (
    <div className="document-viewer">
      <h5 className="text-center text-uppercase">View Document</h5>
      <iframe
        src={decodeURIComponent(documentUrl)}
        title="Document Viewer"
        width="100%"
        height="600px"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default ViewDocument;
