import React from 'react';

// import dependencies
import { connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import * as Yup from "yup";

// import custom components as helpers
import { useForm } from '../../../../utils/useForm';
import { searchFormValidation } from '../../../../utils/searchFormValidation';

// import _shared components
import PaginationBar from '../../../_shared/PaginationBar';

// import child components
import SearchProductCard from '../../components/SearchProductCard';
import ProductCard from '../../components/ProductCard';

// import redux middleware, actions and settings
import { getData } from '../../../../state/_shared/middleware/api';
import { FetchType } from '../../../../state/actions/data';
import { setPageActive } from '../../../../state/actions/ui';

// CONSTANCE DECLARATION //
// redux state and dispatch map to props
const mapStateToProps = (state) => ({
  products: state.data.products.allIds,
  pages: parseInt(state.data.products.info.pages),
  pageWrapper: state.ui.pageWrapper
});
const pageActive = (page) => dispatch => {
  dispatch(setPageActive(page));
}

// set form schema
const formSchema = Yup.object().shape({
  search: Yup
    .string(),
  page: Yup
    .number()
});

// set initial form state
const initialState = {
  search: "",
  page: 1
}

// MAIN COMPONENT
const ProductListPage = ({ 
  getData,
  products, 
  pages,
  pageWrapper,
  pageActive
}) => {  

  const { tab } = pageWrapper.tabbar.active;

  const location = useLocation();
  const history = useHistory();

  // set custom form hook
  const [
    formData,
    errors, 
    onInputChange,
    buttonDisabled,
    setValues
  ] = useForm(initialState, initialState, formSchema);

  // form submit function
  const formSubmit = (e, page) => {
    e.preventDefault();

    // get form validated before make a query to the database
    const { data, search } = searchFormValidation(e, page, formData);

    if (Object.keys(data).length > 0) {
      setValues(data);
      getData('/products?', search, FetchType, { name: 'PRODUCT_LIST' });
    }
  }

  const onClickCard = (id) => {
    if (tab === 'PRODUCT_LIST') history.push(`${location.pathname}/${id}`)
    if (tab === 'ADD_ORDER') getData('/products/' + id, location.search, FetchType, { name: 'COLOR_LIST', id: ''});
  }

  return <>
    <div className="row">
      {/* Search Product Card */}
      <div className="col-lg-6">
        <SearchProductCard
          formSubmit={formSubmit} 
          formData={formData}
          errors={errors}
          onInputChange={onInputChange}
          buttonDisabled={buttonDisabled}
          pageActive={pageActive}
          page={{ name: 'ADD_PRODUCT' }}
        />
      </div>
    </div>
    
    { products.length > 0 && <>
      <div className="row">
        {products.map(product => Object.keys(product.colors).length > 0 &&
          <div key={product._id} className="col-lg-6 col-xl-4"> 
            <ProductCard 
              product={product}
              onClickCard={onClickCard} 
            />
          </div>
        )}
      </div>  
      <PaginationBar 
        page={formData.page}
        onPageChange={formSubmit}
        pages={pages} 
        itemLimit={5}
      />
    </>}
  </>
}

export default connect(mapStateToProps, { getData, pageActive })(ProductListPage);