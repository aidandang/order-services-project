import React from 'react';

import logo from '../../logo.svg';

import { Link } from 'react-router-dom';
import uuid from 'react-uuid';

export default function Navbar({ settings, navbarItemList, collapseItemList }) {
  return <>
    {/* navbar */}
    <nav className={`${settings.bg} sticky-top`}>
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
              {navbarItemList.map(item =>
                <span key={uuid()} className="mr-3"><Link to={item.link} className="navbar-link text-light">{item.text}</Link></span>
              )}
            </div>
            
            <div className="col text-md-right">
              {localStorage.getItem('name') 
                ? <Link to="/" className="text-light mx-md-2" onClick={e => localStorage.clear()}><i className="fas fa-sign-out-alt fa-lg"></i></Link>
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
        {collapseItemList.map(item =>
          <div key={uuid()} className="col-12 sidebar-link py-2">
            <Link to={item.link} className="list-group-item-action text-light sidebar-link">
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
    {/* end of navbar */}
  </>
}