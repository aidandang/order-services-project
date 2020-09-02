import React from 'react';

export default function Tabbar({ 
  tabbarList, 
  active, 
  handleClick, 
  message 
}) {
  return <>
    <div className="card border-0">
      <div className="card-header bg-card-cs">
        {
          tabbarList.map(item => item.id === active 
            ? <span key={item.id} className="mr-3 tab-active-cs">{item.name}</span> 
            : <a 
                key={item.id} href="/" 
                onClick={(e) => {
                  e.preventDefault(); 
                  handleClick(item.id); 
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