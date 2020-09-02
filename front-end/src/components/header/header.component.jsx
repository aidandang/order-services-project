import React from 'react';

// dependencies
import { Link } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { setCurrentUser } from '../../state/user/user.actions';

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
  setCurrentUser,
  settings 
}) => {

  const handleClick = e => {
    e.preventDefault();
    localStorage.clear();
    setCurrentUser(null)
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
                ? <Link 
                    to="/" 
                    className="text-light mx-md-2" 
                    onClick={handleClick}
                  >
                    <i className="fas fa-sign-out-alt fa-lg"></i>
                  </Link>
                : <Link to="/login" className="text-light mx-md-2"><i className="fas fa-sign-in-alt fa-lg"></i></Link>            
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

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);