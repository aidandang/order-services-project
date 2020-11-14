import React, { useEffect } from 'react';

// components
import { Container } from '../tag/tag.component';
import ProductList from './product-list.component';
import ProductEdit from './product-edit.component';
import ProductAdd from './product-add.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductComp } from '../../state/product/product.selectors';
import { setProductComp } from '../../state/product/product.actions';

// main component
const Product = ({
  comp,
  setProductComp,
  goRoot
}) => {

  const { directory, currComp } = comp;

  const goBack = () => {
    setProductComp(directory[currComp].parent)
  }

  useEffect(() => {
    return () => {
      setProductComp('product-list')
    }
    // eslint-disable-next-line
  }, [])
  
  return <>
    {
      (currComp === 'product-list' || currComp === 'product-info') 
      ? 
      <ProductList />
      :
      <Container 
        goBack={goBack}
      >
        { currComp === 'product-add' && <ProductAdd /> }  
        { currComp === 'product-edit' && <ProductEdit /> }
      </Container>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  comp: selectProductComp
})

const mapDispatchToProps = dispatch => ({
  setProductComp: currComp => dispatch(setProductComp(currComp))
})

export default connect(mapStateToProps, mapDispatchToProps)(Product);