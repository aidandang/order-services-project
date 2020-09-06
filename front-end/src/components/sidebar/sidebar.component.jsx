import React from 'react';

// dependencies
import { Link } from 'react-router-dom';

// assets
import logo from '../../assets/logo.svg';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSidebarSections } from '../../state/sidebar/sidebar.selectors';

// ui settings
import './sidebar.styles.css';

const Sidebar = ({ sidebarSections }) => {

  return <>
    {/* <!-- sidebar --> */}
    <div className="col-md-3 col-xl-2 d-none d-md-block sidebar">
      <div className="row justify-content-center mb-2 py-3 px-2">
        <div className="col-12 text-left">
          <Link to="/"><img src={logo} width="32" alt="logo" /></Link>
        </div>
      </div>
      <div className="row flex-column">
        {sidebarSections.length > 0 
          ? sidebarSections.map(item => 
            <div key={item.id} className="col-12 py-2 pl-4 pr-3 sidebar-link">
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

const mapStateToProps = createStructuredSelector({
  sidebarSections: selectSidebarSections
})

export default connect(mapStateToProps)(Sidebar);
