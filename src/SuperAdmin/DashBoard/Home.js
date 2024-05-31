import React from 'react';
import HeroContent from './HeroBox';
import SideBar from './sidebar';
import Header from './Header';

const Home = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <aside className="col-lg-2 col-md-3 col-xs-12">
            <SideBar />
          </aside>
        
          <main className="col-lg-10 col-md-9 col-xs-12">
            <Header />
            <HeroContent />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;
