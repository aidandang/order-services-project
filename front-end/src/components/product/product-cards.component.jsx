import React from 'react';

// dependencies
import queryString from 'query-string';

// components
import withProductData from '../api/withProductData';
import PaginationBar from '../pagination-bar/pagination-bar.component';
import ProductCard from './product-card.component';

const ProductCards = ({ 
  data,
  queryObj,
  setQueryObj
}) => {

  const { allIds } = data;

  // handle search form 
  const onPageChange = (e, page) => {
    e.preventDefault();

    const obj = queryString.parse(queryObj.str);
    let queryStr = null;

    if (obj.page) {
      obj.page = page;
      queryStr = '?' + queryString.stringify(obj);
    } else {
      queryStr = queryObj.str ? `${queryObj.str}&page=${page}` : `?page=${page}`
    }
    
    setQueryObj(prevState => ({
      ...prevState,
      str: queryStr,
      page
    }))
  }

  return <>
    <PaginationBar  
      numberOfPages={data.info.pages}
      limit={5}
      onPageChange={onPageChange}
      page={queryObj.page}
    />

    {/* product cards */}
    <div className="row">
      {
        allIds.map(product => 
          <div key={product._id} className="col-12">
            <div className="card my-3">
              <div className="card-header bg-card-cs">
                <div className="row">
                  <div className="col font-weight-bold">
                    {product.name}
                  </div>
                </div>
              </div>
              <ul className="list-group list-group-flush"> 
                <ProductCard product={product} />
              </ul>
            </div>
          </div>
      )}
    </div> 
    {/* <!-- end of product cards --> */}

    <PaginationBar  
      numberOfPages={data.info.pages}
      limit={5}
      onPageChange={onPageChange}
      page={queryObj.page}
    />
  </>
}

export default withProductData(ProductCards);