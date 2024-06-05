import React from 'react'
import HeroContent from './HeroContent'
import Sidebar from '../../compoents/sidebar'

 const StudentDashboard = () => {
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className=" col-lg-2">
       
       <Sidebar/>
        </div>
        <div className=" col-lg-10">
         
          <HeroContent/>
        </div>
      </div>


    </div>
  )
}
export default StudentDashboard