import React from 'react';

// dependencies
import { Switch, Route, Redirect } from 'react-router-dom';

// components
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import LandingPage from '../../pages/landing-page/landing-page.component';
import RegisterPage from '../../pages/register-page/register-page.component';
import LoginPage from '../../pages/login-page/login-page.component';

// redux
import { connect } from 'react-redux';

// ui settings
import './public.styles.css';
const Background = {
  NAV_LANDING_BG: 'nav-landing-page',
  NAV_PUBLIC_BG: 'nav-public-page'
}
const bgImage = 'https://firebasestorage.googleapis.com/v0/b/order-services-media.appspot.com/o/landing-page%2Fcover-logistics-01.jpg?alt=media&token=0b141ceb-510d-4b8c-bf51-1cd1bffb48ea';

// MAIN FUNCTION
const Public = ({ match, currentUser }) => {
  
  const headerSettings = { navBg: "", isLogo: true };
  const backgroundStyles = {
    style: {}
  };
  
  // if route is landing page or another, 
  // isExact equals true if the route is landing page '/'
  if (match.isExact) {
    headerSettings.navBg = Background.NAV_LANDING_BG;
    backgroundStyles.style.backgroundImage = `url(${bgImage})`;
    backgroundStyles.class = 'row m-0 p-0 main-wrapper landing-bg';
  } else {
    headerSettings.navBg = Background.NAV_PUBLIC_BG;
    backgroundStyles.class = 'row m-0 p-0 main-wrapper';
  }

  return <>
    <div className="container-fluild">
      <div 
        className={backgroundStyles.class}
        style={backgroundStyles.style}
      >
        <div className="col-12 p-0 m-0">
          <Header settings={headerSettings} />
          
          {/* main container */}
          <div className="row p-0 m-0 px-2 py-4">
            <div className="col">
              <Switch>
                <Route exact path="/" render={() => <LandingPage />} />
                <Route exact path="/register" render={() => currentUser ? <Redirect to='/' /> : <RegisterPage />} />
                <Route exact path="/login" render={() => currentUser ? <Redirect to='/' /> : <LoginPage />} />
              </Switch>
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

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Public);