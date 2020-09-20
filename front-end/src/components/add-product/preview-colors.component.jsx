import React from 'react';

// dependencies
import { useLocation, Link } from 'react-router-dom';
import uuid from 'react-uuid';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductObj } from '../../state/product/product.selectors';
import { removeProductColor } from '../../state/product/product.actions';
// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const PreviewColors = ({
  productObj,
  removeProductColor
}) => {

  const location = useLocation();

  return <>
    <div className="card my-3">
      <div className="card-header bg-card-cs">
        <div className="row">
          <div className="col text-uppercase font-weight-bold">Product Colors</div>
        </div>
      </div>
      <ul className="list-group list-group-flush">
    
        <li className={liClassName}>
          <div className="row"> 
            <div className="col-12 align-self-center text-center">
              <Link 
                to={`${location.pathname}?action=add-color`} 
                className="a-link-cs"
              >
                (+) Add a New Color 
              </Link>
            </div>
          </div>
        </li>
        { 
          productObj.colors.length > 0 && 
            productObj.colors.map((color, index) => 
              <li key={uuid()} className={liClassName}>
                <div className="row"> 
                  <div className="col align-self-center text-center">
                    <img
                      className="my-2 product-img"
                      src={color.image} alt={color.color}
                    />
                  </div>
                  <div className="col align-self-center">
                    <span>{color.color}</span><br />
                    <span className="on-click" onClick={e => removeProductColor(index)}>Remove</span>
                  </div>
                </div>
              </li>
            )
        }  
      </ul>
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  productObj: selectProductObj
})

const mapDispatchToProps = dispatch => ({
  removeProductColor: index => dispatch(removeProductColor(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviewColors);