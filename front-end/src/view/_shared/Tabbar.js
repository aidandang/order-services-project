import React from 'react';
import uuid from 'react-uuid';

export default function Tabbar({ tabbar, active, tabActive, message }) {

  const activeTabObj = tabbar.find(item => item.name === active);

  return <>
    <div className="card border-0 mt-2">
      <div className="card-header bg-card-cs">
        {
          tabbar.map(item => item.name === active 
            ? <span key={uuid()} className="mr-3 tab-active-cs">{item.text}</span> 
            : <a 
                key={uuid()} href="/" 
                onClick={(e) => {
                  e.preventDefault(); 
                  tabActive({ 
                    tab: item.name, 
                    page: {} 
                  }) 
                }} 
                className="tab-link-cs mr-3"
              >
                {item.text}
              </a> 
          )
        }
      </div>
      <div className="card-body bg-card-cs">
        { message.style === ""
          ? <small className='card-text'>
              {activeTabObj 
                ? (activeTabObj.message === '' || activeTabObj.message === undefined)
                  ? message.text
                  : activeTabObj.message
                : message.text
              }
            </small>
          : <small className={`card-text ${message.style}`}>{message.status !== 'error' ? null : 'ERROR:'} {message.text}</small>
        }
      </div>
    </div>
  </>
}