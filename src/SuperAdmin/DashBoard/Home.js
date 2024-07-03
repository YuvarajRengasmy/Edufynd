import React from 'react';
import HeroContent from './HeroBox';
import SideBar from './sidebar';
import Header from './Header';

const Home = () => {
  return (
    <div>
      <div className="container-fluid">
       
          <nav className=" navbar navbar-vertical navbar-expang-lg">
            <SideBar />
          </nav>
          <nav className=" navbar navbar-top navbar-expand">
              <Header />
          </nav>
        
          <main className="content-wrapper" style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
          
            <HeroContent />
          </main>
      
      </div>
    </div>
  );
};

export default Home;
