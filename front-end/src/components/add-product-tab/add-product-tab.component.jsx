import React from 'react';

// components
import AddProducStyle from './add-product-style.component';

// redux

const AddProductTab = ({ doneAddingStyle }) => {
  return <>
    { !doneAddingStyle && <AddProducStyle /> }
  </>
}

export default AddProductTab;