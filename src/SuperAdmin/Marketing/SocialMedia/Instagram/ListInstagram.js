import React, { useEffect, useState, useRef } from "react";

import Sidebar from "../../../../compoents/sidebar";
import { InstagramEmbed } from 'react-social-media-embed';

const ListInstagram = () => {


  return (
    <div >
    <Sidebar />
   <div className="content-wrapper" style={{ fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
      <div className="content-header  bg-light shadow-sm sticky-top">
        <div className="container-fluid">
   
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <InstagramEmbed url="https://www.instagram.com/edufynd/?utm_source=ig_embed&ig_rid=2e630601-823d-4624-9b1d-a9d3b25fc912" width={1000} height={900} />
    </div>

</div>
</div>
</div>
   
</div>
  )
}

export default ListInstagram
