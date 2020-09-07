import React from 'react';

// dependencies
import { Switch, Route } from 'react-router-dom';

// components
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import DashboardPage from '../../pages/dashboard-page/dashboard-page.component';
import ProductRoutes from '../../components/product-routes/product-routes.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSidebarSections }  from '../../state/sidebar/sidebar.selectors';
import { selectNavbarSections } from '../../state/navbar/navbar.selectors';

// ui settings
import './private.styles.css';
const Background = {
  NAV_PRIVATE_BG: 'nav-private-page'
}

const Private = ({ navbarSections, sidebarSections }) => {
  const headerSettings = { navBg: Background.NAV_PRIVATE_BG, isLogo: false };

  return <>
    <div className="container-fluild">
      <div className="row m-0 p-0 justify-content-end">
        <Sidebar />
        <div className="col-md-9 col-xl-10 p-0 m-0 private-main-wrapper">
          <div className="private-main-wrapper">
            <Header settings={headerSettings} navbarSections={navbarSections} collapseSections={sidebarSections} />
            
            {/* main container */}
            <div className="row p-0 m-0 px-2 pt-4 pb-5">
              <div className="col">
                <Switch>
                  <Route path="/app/product" render={() => <ProductRoutes />} />
                  <Route exact path="/app" render={() => <DashboardPage />} />
                </Switch>
              </div>
            </div>
            {/* end of main container */}
          
          </div>
          <Footer />
        </div>
      </div>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  navbarSections: selectNavbarSections,
  sidebarSections: selectSidebarSections
})

export default connect(mapStateToProps)(Private);