import React from 'react'
import HeroContent from './HeroContent'
import Sidebar from '../../compoents/sidebar'

 const StudentDashboard = () => {
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-xs-12 col-md-3 col-lg-2">
       
       <Sidebar/>
        </div>
        <div className="col-xs-12 col-md-9 col-lg-10">
         
          <HeroContent/>
        </div>
      </div>


    </div>
  )
}
export default StudentDashboard