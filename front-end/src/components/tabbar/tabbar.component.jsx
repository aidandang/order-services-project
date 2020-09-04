import React from 'react';

// redux
import { connect } from 'react-redux';
import { setSelectedTab } from '../../state/tabbar/tabbar.actions';

const Tabbar = ({ 
  page,
  tabbarList, 
  selectedTab,  
  message,
  setSelectedTab 
}) => {
  return <>
    <div className="card border-0">
      <div className="card-header bg-card-cs">
        {
          tabbarList.map(item => item.id === selectedTab 
            ? <span key={item.id} className="mr-3 tab-active-cs">{item.name}</span> 
            : <a 
                key={item.id} href="/" 
                onClick={(e) => {
                  e.preventDefault(); 
                  setSelectedTab(page, item.id); 
                }} 
                className="tab-link-cs mr-3"
              >
                {item.name}
              </a> 
          )
        }
      </div>
      <div className="card-body bg-card-cs">
        { message.style === ''
          ? <small className='card-text'>{message.text}</small>
          : <small className={`card-text ${message.style}`}>{message.text}</small>
        }
      </div>
    </div>
  </>
}

const mapDispatchToProps = dispatch => ({
  setSelectedTab: (page, tabId) => dispatch(setSelectedTab(page, tabId))
})

export default connect(null, mapDispatchToProps)(Tabbar);