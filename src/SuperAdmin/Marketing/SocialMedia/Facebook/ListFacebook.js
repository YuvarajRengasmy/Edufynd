import React, { useEffect, useState, useRef } from "react";

import Sidebar from "../../../../compoents/sidebar";
import { FacebookEmbed } from 'react-social-media-embed';
const ListInstagram = () => {


  return (
    <div >
    <Sidebar />
   <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
      <div className="content-header  bg-light shadow-sm sticky-top">
        <div className="container-fluid">
   
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <FacebookEmbed url="https://www.facebook.com/photo/?fbid=122194797584034205" width={1000} height={900} />
    </div>

</div>
</div>
</div>
   
</div>
  )
}

export default ListInstagram
