import React from 'react';

// import components, actions and settings
const liClassName = "list-group-item list-group-item-action bg-item-list-cs";

export default function ColorCard({
  color,
  pageActive,
  tab
}) {
  return <>
    <div className="card my-3">

      <div className="card-header bg-card-cs">
        <div className="row">
          <div className="col font-weight-bold">{color.color}</div>
          {tab !== 'ADD_ORDER' &&
            <div className="col text-right">
              <a 
                href="/" 
                className="a-link-cs mr-2" 
                name="editColor" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  pageActive({ name: 'EDIT_COLOR', id: color._id }) 
                }}
              >
                Edit
              </a>{'|'}
              <a 
                href="/" 
                className="a-link-cs ml-2" 
                name="removeColor" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  pageActive({ name: 'REMOVE_COLOR', id: color._id }) 
                }}
              >
                Remove
              </a>
            </div>
          }
        </div>
      </div>

      <ul 
        className="list-group list-group-flush"
        onClick={e => {
          e.preventDefault();
          if (tab === 'ADD_ORDER') pageActive({ name: 'ITEM_DETAILS', colorId: color._id })
        }}
      >
        <li className={liClassName}>
          <div className="row"> 
            <div className="col-12 align-self-center text-center">
              <img 
                className="product-img my-2" 
                src={color.image} alt={color.color} 
              />
            </div>
          </div>
        </li>
        <li className={liClassName}>
          <div className="row"> 
            <div className="col-12 align-self-center">
              <a className="a-link-cs" href={color.url}>Official Website</a>
            </div>
          </div>
        </li>  
      </ul>

    </div>  
  </>
}