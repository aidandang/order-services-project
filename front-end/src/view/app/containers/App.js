import React from 'react';

// import dependencies

// import custom components as helpers

// import _shared components
import Navbar from '../../_shared/Navbar';
import Sidebar from '../../_shared/Sidebar';
import Footer from '../../_shared/Footer';

// import child components
import Routes from '../../../routes/Routes';

// import redux middleware, actions and settings
import { 
  navbarSettingsUser, 
  navbarItemListUser, 
  sidebarItemList 
} from '../../../state/actions/uiSettings';

// MAIN COMPONENT
const App = () => {
  return <>
    <div className="container-fluild">
      <div className="row m-0 p-0 justify-content-end">
        <Sidebar />
        <div className="col-md-9 col-xl-10 right-wrapper p-0 m-0">
          <div className="main-wrapper">
            <Navbar 
              settings={navbarSettingsUser} 
              navbarItemList={navbarItemListUser} 
              collapseItemList={sidebarItemList} 
            />

            {/* main container */}
            <div className="row m-0 px-2 py-0">
              <div className="col">
                <Routes />
              </div>
            </div>
            {/* end of main container */}
            
          </div>
          <div className="row p-0 m-0 px-2 py-3">
            <div className="col">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default App;