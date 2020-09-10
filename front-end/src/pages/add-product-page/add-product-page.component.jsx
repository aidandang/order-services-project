import React from 'react';

// components
import Title from '../../components/title/title.component';
import Tabbar from '../../components/tabbar/tabbar.component';
import AddProductTab from '../../components/add-product-tab/add-product-tab.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAddProductTabbar} from '../../state/tabbar/tabbar.selectors';

// ui settings
const titleSettings = {
  title: 'Add Product',
  button: undefined
}

const AddProductPage = ({ addProductTabbar }) => {

  const { selectedTab, list } = addProductTabbar;

  return <>
    <Title settings={titleSettings} />
    <Tabbar
      page='addProduct' 
      tabbarList={list} 
      selectedTab={selectedTab}
    />
    { selectedTab === 1 && <AddProductTab /> }
  </>
}

const mapStateToProps = createStructuredSelector({
  addProductTabbar: selectAddProductTabbar
})

export default connect(mapStateToProps)(AddProductPage);