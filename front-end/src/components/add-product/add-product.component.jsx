import React from 'react';

// components
import Tabbar from '../tabbar/tabbar.component';
import AddStyle from './add-style.component';
import AddColor from './add-color.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectAddProductTabbar } from '../../state/tabbar/tabbar.selectors';

const AddProduct = ({
  addProductTabbar
}) => {
  const { list, selectedTab } = addProductTabbar;

  return <>
    <Tabbar 
      page='addProduct'
      list={list}
      selectedTab={selectedTab}
    />
    {
      selectedTab === 1 && <AddStyle />
    }
    {
      selectedTab === 2 && <AddColor />
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  addProductTabbar: selectAddProductTabbar,
})

export default connect(mapStateToProps)(AddProduct);