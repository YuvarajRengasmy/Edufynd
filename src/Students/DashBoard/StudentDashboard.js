import React from 'react'
import HeroContent from './HeroContent'
import Sidebar from '../../compoents/sidebar'

 const StudentDashboard = () => {
  return (
    <div className='container-fluid'>
     
        <div className=" navbar navbar-vertical navbar-expand-lg">
       
       <Sidebar/>
        </div>
        <div className="content-wrapper">
         
          <HeroContent/>
        </div>
   


    </div>
  )
}
export default StudentDashboard