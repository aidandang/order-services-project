import React from 'react';

// dependencies
import { Switch, Route, Redirect } from 'react-router-dom';

// components
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import LandingPage from '../../pages/landing-page/landing-page.component';
import PageNotFound from '../../pages/page-not-found/page-not-found.component';
import RegisterPage from '../../pages/register-page/register-page.component';
import LoginPage from '../../pages/login-page/login-page.component';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page.component';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../state/user/user.selectors';
import { selectNavbarSections }  from '../../state/navbar/navbar.selectors';

// ui settings
import './public.styles.css';
const Background = {
  NAV_LANDING_BG: 'nav-landing-page',
  NAV_PUBLIC_BG: 'nav-public-page'
}
const bgImage = 'https://firebasestorage.googleapis.com/v0/b/order-services-media.appspot.com/o/landing-page%2Fcover-logistics-01.jpg?alt=media&token=0b141ceb-510d-4b8c-bf51-1cd1bffb48ea';

const Public = ({ match, currentUser, navbarSections }) => {
  const headerSettings = { navBg: "", isLogo: true };
  const backgroundStyles = {
    style: {}
  };
  
  // if route is landing page or another, 
  // isExact equals true if the route is landing page '/'
  if (match.isExact) {
    headerSettings.navBg = Background.NAV_LANDING_BG;
    backgroundStyles.style.backgroundImage = `url(${bgImage})`;
    backgroundStyles.class = 'row m-0 p-0 public-main-wrapper landing-bg';
  } else {
    headerSettings.navBg = Background.NAV_PUBLIC_BG;
    backgroundStyles.class = 'row m-0 p-0 public-main-wrapper';
  }

  return <>
    <div className="container-fluild">
      <div className={backgroundStyles.class} style={backgroundStyles.style}>
        <div className="col-12 p-0 m-0">
          <Header settings={headerSettings} navbarSections={navbarSections} collapseSections={navbarSections} />
          
          {/* main container */}
          <div className="row p-0 m-0 px-2 pt-4 pb-5">
            <div className="col">
              <Switch>
                <Route exact path="/register" render={() => currentUser ? <Redirect to='/' /> : <RegisterPage />} />
                <Route exact path="/login" render={() => currentUser ? <Redirect to='/' /> : <LoginPage />} />
                <Route exact path="/forgot-password" render={() => currentUser ? <Redirect to='/' /> : <ForgotPasswordPage />} />
                <Route exact path="/reset-password/:token" render={() => currentUser ? <Redirect to='/' /> : <ResetPasswordPage />} />
                <Route exact path="/" render={() => <LandingPage />} />
                <Route path="/" render={() => <PageNotFound />} />
              </Switch>
            </div>
          </div>
          {/* end of main container */}
          
        </div>
      </div>
      <Footer />
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  navbarSections: selectNavbarSections
})

export default connect(mapStateToProps)(Public);