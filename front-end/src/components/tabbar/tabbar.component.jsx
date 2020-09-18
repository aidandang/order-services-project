import React from 'react';

// redux
import { connect } from 'react-redux';
import { setSelectedTab } from '../../state/tabbar/tabbar.actions';

// ui settings
import './tabbar.styles.css';

const Tabbar = ({
  page, 
  list, 
  selectedTab, 
  setSelectedTab 
}) => {
  
  const { message } = list.find(item => item.id === selectedTab);

  return <>
    <div className="card border-0">
      <div className="card-header bg-card-cs">
        {
          list.map(item => item.id === selectedTab 
            ? <span key={item.id} className="mr-3 tab-selected">{item.name}</span> 
            : <a 
                key={item.id} href="/" 
                onClick={(e) => {
                  e.preventDefault(); 
                  setSelectedTab(page, item.id); 
                }} 
                className="mr-3 tab-a-link"
              >
                {item.name}
              </a> 
          )
        }
      </div>
      <div className="card-body bg-card-cs py-2">
        <small className='card-text text-muted'>{message}</small>
      </div>
    </div>
  </>
}

const mapDispatchToProps = dispatch => ({
  setSelectedTab: (page, tabId) => dispatch(setSelectedTab(page, tabId))
})

export default connect(null, mapDispatchToProps)(Tabbar);