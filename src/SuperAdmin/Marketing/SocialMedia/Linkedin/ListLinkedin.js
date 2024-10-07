import React from 'react';
import { LinkedInEmbed } from 'react-social-media-embed';

const LinkedInPost = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <LinkedInEmbed
        url="https://www.linkedin.com/company/edufynd/posts/"
        width={325}
        height={570}
      />
    </div>
  );
};

export default LinkedInPost;
