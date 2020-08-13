import React from 'react';

import logo from '../../logo.svg';

// import dependencies
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';

import { sidebarItemList } from '../../state/actions/uiSettings';

export default function Sidebar() {

  return <>
    {/* <!-- sidebar --> */}
    <div className="col-md-3 col-xl-2 d-none d-md-block sidebar">
      <div className="row justify-content-center mb-2 py-3 px-2">
        <div className="col-12 text-left">
          <Link to="/"><img src={logo} width="32" alt="logo" /></Link>
        </div>
      </div>
      <div className="row flex-column">
        {sidebarItemList.length > 0 
          ? sidebarItemList.map(item => 
            <div key={uuid()} className="col-12 sidebar-link py-2 pl-4 pr-3">
              <Link to={item.link} className="text-light list-group-item-action">
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
          ) 
          : null
        }
      </div>
    </div>
    {/* <!-- end of sidebar --> */}
  </>
}