import React from 'react';
import HeroContent from './HeroBox';
import SideBar from './sidebar';
import Header from './Header';

const Home = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <aside className="col-lg-1 d-none d-lg-block">
            <SideBar />
          </aside>
        
          <main className="col-lg-11">
            <Header />
            <HeroContent />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
