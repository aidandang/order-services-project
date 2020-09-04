import React from 'react';

// dependencies
import { Link } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../state/user/user.selectors';
import { UserActionTypes } from '../../state/user/user.types';

// assets
import logo from '../../assets/logo.svg';

// ui settings
import './header.styles.css';
const navbarItems = [
  {
    id: 1,
    text: 'Application',
    link: '/app',
    icon: 'fas fa-briefcase'
  },
  {
    id: 2,
    text: 'Read Me',
    link: '/app',
    icon: 'fab fa-readme'
  }
];
const collapseItems = [
  {
    id: 1,
    text: 'Application',
    link: '/app',
    icon: 'fas fa-briefcase'
  },
  {
    id: 2,
    text: 'Read Me',
    link: '/app',
    icon: 'fab fa-readme'
  }
];

// MAIN COMPONENT
const Header = ({ 
  currentUser,
  settings,
  dispatch 
}) => {

  const handleLogOut = e => {
    e.preventDefault();
    localStorage.clear();
    dispatch({ type: UserActionTypes.USER_LOGGED_OUT })
  }

  return <>
    <nav className={`sticky-top ${settings.navBg}`}>
      <div className="row p-0 m-0 align-items-center py-3">
        <div className="col-2 text-center d-md-none">
          <a 
            className="text-light" 
            data-toggle="collapse" 
            href="#multiCollapse" 
            role="button" 
            aria-expanded="false" 
            aria-controls="multiCollapse"
          >
            <i className="fas fa-bars fa-lg"></i>
          </a>
        </div>
        <div className="col-8 text-center d-md-none">
          <Link to="/"><img src={logo} width="32" alt="logo" /></Link>
        </div>
        <div className="col-2 col-md-12 text-center">
          <div className="row align-items-center">
            
            <div className="col d-none d-md-block text-md-left ml-2">
              {settings.isLogo &&
                <span className="text-light mr-4"><Link to="/"><img src={logo} width="32" alt="logo" /></Link></span>
              }
              {navbarItems.map(item =>
                <span key={item.id} className="mr-3"><Link to={item.link} className="navbar-link text-light">{item.text}</Link></span>
              )}
            </div>
            
            <div className="col text-md-right">
              {
                currentUser 
                ? <div className="btn-group text-light mx-md-2">
                    <div className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-user fa-lg"></i>
                    </div>
                    <div className="dropdown-menu dropdown-menu-right header-dropdown-bg">
                      <div className="dropdown-header text-uppercase">{currentUser.displayName}</div>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item header-dropdown-item text-light" type="button" onClick={handleLogOut}>Log Out</button>
                    </div>
                  </div>
                : <Link to="/login" className="text-light mx-md-2"><i className="far fa-user fa-lg"></i></Link>            
              }
            </div>

          </div>
        </div>
      </div>

      {/* start of collapse navigation */}
      <div className="row p-0 m-0 collapse multi-collapse d-md-none" id="multiCollapse">
        <div className="col-12 py-2">
          <div className="row">
            <div className="col-2 text-center">
            </div>
            <div className="col-10 text-left text-light text-uppercase">
              navigation
            </div>
          </div>
        </div>
        {collapseItems.map(item =>
          <div key={item.id} className="col-12 py-2 collapse-link">
            <Link to={item.link} className="list-group-item-action text-light collapse-link">
              <div className="row">
                <div className="col-2 text-center">
                  <i className={item.icon}></i>
                </div>
                <div className="col-10 text-left">
                  {item.text}
                </div>
              </div>
            </Link>
          </div>
        )}
        <div className="col-12 py-2">
          <div className="row">
            <div className="col-2 text-center">
            </div>
            <div className="col-10 text-left text-light text-uppercase">
              {null}
            </div>
          </div>
        </div>
      </div>
      {/* end of collapse navigation */}
      
    </nav>
  </>
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

export default connect(mapStateToProps)(Header);