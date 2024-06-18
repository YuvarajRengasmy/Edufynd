import React from 'react'
import HeroContent from '../Components/HeroContent/HeroContent'
import Header from '../Components/Header/Header'
import Sidebar from '../Components/SideBar/Sidebar'

export const Home = () => {
  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-xs-12 col-md-12 col-lg-2">
          <Sidebar />
        </div>
        <div className="col-xs-12 col-md-12 col-lg-10">
          <Header />
          <HeroContent />
        </div>
      </div>


    </div>
  )
}
export default Home