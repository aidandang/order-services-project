import React from 'react';

// components
import Title from '../../components/title/title.component';
import Tabbar from '../../components/tabbar/tabbar.component';
import ProductInfo from '../../components/product-info/product-info.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductByIdTabbar } from '../../state/tabbar/tabbar.selectors';

// ui settings
import './product-by-id-page.styles.css';
const titleSettings = {
  title: 'Product Details',
  button: undefined
}

const ProductByIdPage = ({ productByIdTabbar }) => {

  const { selectedTab, list } = productByIdTabbar;

  return <>
    <Title settings={titleSettings} />
    <Tabbar
      page='productById' 
      tabbarList={list} 
      selectedTab={selectedTab}
    />
    { selectedTab === 1 && <ProductInfo /> }
  </>
}

const mapStateToProps = createStructuredSelector({
  productByIdTabbar: selectProductByIdTabbar
})

export default connect(mapStateToProps)(ProductByIdPage);