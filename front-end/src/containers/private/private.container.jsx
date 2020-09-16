import React from 'react';

// dependencies
import { Switch, Route } from 'react-router-dom';

// components
import Navbar from '../../components/navbar/navbar.component';
import Footer from '../../components/footer/footer.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import DashboardPage from '../../pages/dashboard-page/dashboard-page.component';
import ProductRoutes from '../../components/product-routes/product-routes.component';

// ui settings
import './private.styles.css';
const isPrivate = true;

const Private = () => {
  return <>
    <div className="container-fluild">
      <div className="row m-0 p-0 justify-content-end">
        <Sidebar />
        <div className="col-md-9 col-xl-10 p-0 m-0">
          <div className="private-main-wrapper">
            <header>
              <Navbar isPrivate={isPrivate} />
            </header>
            <main>
              <div className="row p-0 m-0 px-2 pt-4 pb-5">
                <div className="col">
                  <Switch>
                    <Route path="/app/product" render={() => <ProductRoutes />} />
                    <Route exact path="/app" render={() => <DashboardPage />} />
                  </Switch>
                </div>
              </div>
            </main>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Private;