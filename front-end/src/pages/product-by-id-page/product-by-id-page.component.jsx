import React, { useEffect } from 'react';

// dependencies
import { useParams } from 'react-router-dom'; 

// components
import Title from '../../components/title/title.component';
import Tabbar from '../../components/tabbar/tabbar.component';
import ProductStyleTab from '../../components/product-style-tab/product-style-tab.component';
import ProductColorTab from '../../components/product-color-tab/product-color-tab.component';
import AlertMesg from '../../components/alert-mesg/alert-mesg.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAlertMessage } from '../../state/alert/alert.selectors';
import { getReq } from '../../state/api/get-request';
import { ProductActionTypes } from '../../state/product/product.types';

// ui settings
import './product-by-id-page.styles.css';

const titleSettings = {
  title: 'Product Details',
  button: undefined
}

const ProductByIdPage = ({ 
  getReq,
  productByIdTabbar,
  alertMessage 
}) => {

  const params = useParams();
  const { selectedTab, list } = productByIdTabbar;

  useEffect(() => {
    getReq(`/products/${params.id}`, ProductActionTypes.PRODUCT_GET_SUCCESS)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>
    <Title settings={titleSettings} />
    <Tabbar
      page='productById' 
      tabbarList={list} 
      selectedTab={selectedTab}
    />
    { 
      alertMessage 
      ? <AlertMesg /> 
      : <>
        { selectedTab === 1 && <ProductStyleTab /> }
        { selectedTab === 2 && <ProductColorTab /> }
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  alertMessage: selectAlertMessage
})

const mapDispatchToProps = dispatch => ({
  getReq: (
    pathname, 
    fetchSuccess, 
    queryStr
  ) => dispatch(getReq(pathname, fetchSuccess, queryStr))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductByIdPage);