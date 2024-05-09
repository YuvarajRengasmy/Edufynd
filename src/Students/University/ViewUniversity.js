import React from 'react'
import Sidebar from "./sidebar";
import CenterBox from "./centerbox";
import Header from "../Home/HeaderHome";

const UserProfile = () => {
  return (
    <>
      <div className='scroll-bar' style={{}}>
        <div className='container mb-5' >
        <Header />
          <div className='container-fluid d-flex flex-column border-start border-end gap-2  bg-white mt-5'>
            <div className='row gap-lg-2 gap-md-2 gap-2 p-0 mt-5 d-flex justify-content-center'>
              <div className='container mt-5'>
                <div className='row'>
                  <div className='col-lg-4'>
                    <Sidebar />
                  </div>
                  <div className='col-lg-8 scroll-hide' style={{ maxHeight: 'calc(100vh - 50px)', overflow: 'auto'}}>
                      <CenterBox />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default UserProfile