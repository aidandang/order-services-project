import React from 'react';

// dependencies
import { useLocation, Link } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductData } from '../../state/product/product.selectors';

// ui settings
const liClassName = "list-group-item bg-item-list-cs list-group-item-action";

const ProductColorsUpdate = ({
  data
}) => {

  const location = useLocation();

  const { byId } = data;

  return <>
   
    <div className="row">
      <div className="col-12">
        <div className="card my-3">
          <div className="card-header bg-card-cs">
            <div className="row">
              <div className="col text-uppercase font-weight-bold">Color Information</div>
              <div className="col font-weight-bold text-right">
                <Link 
                  to={`${location.pathname}?action=product-info`} 
                  className="a-link-cs"
                >
                  Close
                </Link>
              </div>
            </div>
          </div>
          <ul className="list-group list-group-flush">
            {
              byId.colors.length > 0 &&
                <li className={liClassName}>
                  <div className="row">
                    {
                      byId.colors.map((color, index) =>
                        <div key={index} className="col-md-6 col-lg-4 col-xl-3 align-self-center">
                          <div className="card my-3">
                            <ul className="list-group list-group-flush">
                              <li className={liClassName}>
                                <img className="product-img my-2" src={color.image} alt={byId.name} />
                              </li>
                              <li className={liClassName}>{color.color}</li>
                              <li className={liClassName}>
                                <Link to={`${location.pathname}?action=product-color-edit&id=${color._id}`} className="a-link-cs">Edit</Link>
                                <span>{' | '}</span>
                                <Link to={`${location.pathname}?action=product-color-remove&id=${color._id}`} className="a-link-cs">Remove</Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </li>
            }
            
            <li className={liClassName}>
              <div className="row">
                <div className="col">
                  <Link to={`${location.pathname}?action=product-color-add`} className="a-link-cs">
                    ( + ) Add a New Color
                  </Link>
                </div>  
              </div>
            </li>

          </ul>
        </div>
      </div>        
    </div>
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectProductData
})

export default connect(mapStateToProps)(ProductColorsUpdate);