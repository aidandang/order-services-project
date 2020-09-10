import React from 'react';

// components
import Title from '../../components/title/title.component';
import Tabbar from '../../components/tabbar/tabbar.component';
import ProductListTab from '../../components/product-list-tab/product-list-tab.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductListTabbar } from '../../state/tabbar/tabbar.selectors';

// ui settings
import './product-list-page.styles.css';
const titleSettings = {
  title: 'Products',
  button: undefined
}

const ProductListPage = ({ productListTabbar }) => {

  const { selectedTab, list } = productListTabbar;

  return <>
    <Title settings={titleSettings} />
    <Tabbar
      page='productList' 
      tabbarList={list} 
      selectedTab={selectedTab}
    />
    { selectedTab === 1 && <ProductListTab /> }
  </>   
}

const mapStateToProps = createStructuredSelector({
  productListTabbar: selectProductListTabbar
})

export default connect(mapStateToProps)(ProductListPage);