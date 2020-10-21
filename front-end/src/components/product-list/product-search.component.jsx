import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, Link } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import ProductSearchForm from './product-search-form.component';
import PreviewProducts from './preview-products.component';
import PaginationBar from '../pagination-bar/pagination-bar.component';
import { convertSearchFormToQueryString } from '../utils/convert-search-form-to-query-string';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductData } from '../../state/product/product.selectors';
import { getReq } from '../../state/api/get-request';
import { ProductActionTypes } from '../../state/product/product.types';

// initial values
const formSchema = Yup.object().shape({
  search: Yup
    .string()
});

const formState = {
  search: ''
}

// main component
const ProductSearch = ({ 
  getReq, 
  data
}) => {

  const location = useLocation();

  const [
    formData,
    errors, 
    onInputChange,
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  const [active, setActive] = useState(null);

  // handle search form 
  const formSubmit = (e, page) => {
    e.preventDefault();

    const fetchSuccess = ProductActionTypes.PRODUCT_FETCH_SUCCESS;
    
    let queryStr = convertSearchFormToQueryString(e, formData);

    if (queryStr !== undefined) {
      if (page) queryStr = queryStr + `${queryStr === '' ? '?' : '&'}page=${page}`;
      getReq('/products', fetchSuccess, queryStr);
      setActive(page)
    }
  }
  
  return <>
    <Card width="col" title="Search For Products" >
      <Ul>

        <ProductSearchForm 
          formSubmit={formSubmit} 
          formData={formData}
          errors={errors}
          onInputChange={onInputChange}
          buttonDisabled={buttonDisabled}
        />

        <Li>
          <div className="row">
            <div className="col">
              <Link
                to={{
                  pathname: location.pathname,
                  search: location.search ? `${location.search}&action=product-add` : `?action=product-add`,
                  state: {
                    key: location.key,
                    path: location.pathname + location.search
                  }
                }}
                className="a-link-cs"
              >
                ( + ) Add a New Product
              </Link>
            </div>
          </div>
        </Li>

      </Ul>
    </Card>
    {
      data && data.allIds && data.allIds.length > 0 && data.info && <>
        <PaginationBar  
          numberOfPages={data.info.pages}
          limit={5}
          onPageChange={formSubmit}
          page={active}
        />
        <PreviewProducts />
        <PaginationBar 
          numberOfPages={data.info.pages}
          limit={5}
          onPageChange={formSubmit}
          page={active}
        /> 
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  data: selectProductData
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(getReq(pathname, fetchSuccess, queryStr))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductSearch);