import React from 'react';

// components
import AddProducStyle from './add-product-style.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDoneAddingStyle } from '../../state/product/product.selectors';

const AddProductTab = ({ doneAddingStyle }) => {
  return <>
    { !doneAddingStyle && <AddProducStyle /> }
  </>
}

const mapStateToProps = createStructuredSelector({
  doneAddingStyle: selectDoneAddingStyle
})

export default connect(mapStateToProps)(AddProductTab);