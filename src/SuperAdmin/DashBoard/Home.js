import React from 'react';
import HeroContent from './HeroBox';
import SideBar from './sidebar';
import Header from './Header';

const Home = () => {
  return (
    <>
      <div >
       
        
            <SideBar />
         
         
        
          <main className="content-wrapper" style={{  fontFamily: 'Plus Jakarta Sans', fontSize: '14px' }}>
          
            <HeroContent />
          </main>
      
      </div>
    </>
  );
};

export default Home;
