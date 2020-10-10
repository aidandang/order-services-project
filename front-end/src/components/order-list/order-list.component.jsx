import React, { useState } from 'react';

// dependencies
import { useLocation, useHistory } from 'react-router-dom';
import * as Yup from "yup";
// components
import { useForm } from '../custom-hooks/use-form';
import Title from '../title/title.component';
import OrderSearchForm from './order-search-form.component';
import PreviewOrders from './preview-orders.component';
import PaginationBar from '../pagination-bar/pagination-bar.component';
import AlertMesg from '../alert-mesg/alert-mesg.component';
import { convertSearchFormToQueryString } from '../utils/convert-search-form-to-query-string';
// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderData } from '../../state/order/order.selectors';
import { getReq } from '../../state/api/get-request';
import { OrderActionTypes } from '../../state/order/order.types';
import { selectAlertMessage } from '../../state/alert/alert.selectors';

// set form schema
const formSchema = Yup.object().shape({
  search: Yup
    .string()
});
// set form state
const formState = {
  search: ''
}

const title = {
  name: 'Order List',
  message: 'An order can be searched by either its number or created date.'
}

const OrderList = ({ 
  getReq, 
  data, 
  alertMessage
}) => {
  
  const location = useLocation();
  const history = useHistory();

  title.button = {
    text: 'Add',
    link: `${location.search}?type=add`
  }

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

    const fetchSuccess = OrderActionTypes.ORDER_FETCH_SUCCESS;
    
    let queryStr = convertSearchFormToQueryString(e, formData);

    if (queryStr !== undefined) {
      if (page) queryStr = queryStr + `${queryStr === '' ? '?' : '&'}page=${page}`;
      getReq('/orders', fetchSuccess, queryStr);
      setActive(page)
    }
  }

  const handleOnClick = (e, order) => {
    e.preventDefault();
    history.push(location.pathname + '/' + order._id)
  }
  
  return <>
    <Title title={title} />
    { 
      alertMessage 
      ? <AlertMesg />
      : <> 
        <OrderSearchForm
          formSubmit={formSubmit} 
          formData={formData}
          errors={errors}
          onInputChange={onInputChange}
          buttonDisabled={buttonDisabled}
        />
        {
          data && data.info && <>
            <PaginationBar  
              numberOfPages={data.info.pages}
              limit={5}
              onPageChange={formSubmit}
              page={active}
            />
            <PreviewOrders handleOnClick={handleOnClick} />
            <PaginationBar 
              numberOfPages={data.info.pages}
              limit={10}
              onPageChange={formSubmit}
              page={active}
            /> 
          </>
        }
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage,
  data: selectOrderData
})

const mapDispatchToProps = dispatch => ({
  getReq: (pathname, fetchSuccess, queryStr) => dispatch(getReq(pathname, fetchSuccess, queryStr))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);