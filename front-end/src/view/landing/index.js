import React from 'react';

// import _shared components
import Navbar from '../_shared/Navbar';
import Footer from '../_shared/Footer';
import { navbarItemList } from '../../state/actions/uiSettings';

const settings = {
  bg: 'navbar-bg-landing',
  isLogo: true
}

const LandingPage = () => {
  return <>
    <div className="container-fluild">
      <div className="row m-0 p-0 main-wrapper landing-bg">
        <div className="col-12 p-0 m-0">
          <Navbar settings={settings} navbarItemList={navbarItemList} collapseItemList={navbarItemList} />
          
          {/* main container */}
          <div className="row p-0 m-0 px-2 py-4">
            <div className="col">
              {null}
            </div>
          </div>
          {/* end of main container */}
          
        </div>
      </div>
      <div className="row m-0 p-0 text-light">
        <div className="col-12 p-0 m-0 footer">
          <footer>
            <div className="row p-0 m-0 px-2 py-2">
              <div className="col">
                <Footer />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  </>
}

export default LandingPage;