import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductData } from '../../state/product/product.selectors';
import { getReq } from '../../state/api/get-request';

const withData = (WrapperComponent, dataSource) => {
  const WithData = ({ data, getReq, ...props }) => {

    const { pathname, fetchSuccess, queryStr } = dataSource

    useEffect(() => {
      getReq(pathname, fetchSuccess, queryStr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return <>
      {
        data && <WrapperComponent data={data} {...props} />  
      }  
    </> 
  }

  const mapStateToProps = createStructuredSelector({
    data: selectProductData
  })

  const mapDispatchToProps = dispatch => ({
    getReq: (pathname, fetchSuccess, queryStr) => dispatch(
      getReq(pathname, fetchSuccess, queryStr))
  })

  return connect(mapStateToProps, mapDispatchToProps)(WithData);
}

export default withData;