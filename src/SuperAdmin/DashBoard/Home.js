import React from 'react'
import HeroContent from './HeroBox'
import SideBar from './sidebar'
import Header from './Header'


export const Home = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-md-3 col-lg-2">
            <SideBar/>
          </div>
          <div className="col-xs-12 col-md-9 col-lg-10">
            <Header/>
            <HeroContent/>
          </div>
        </div>
      </div>
     
   
    </div>
  )
}
export default Home