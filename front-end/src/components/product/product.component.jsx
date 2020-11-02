import React, { useState, useEffect } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation } from 'react-router-dom';

// components
import { Container, Card, Ul, Li } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import ProductSearchForm from './product-search-form.component';
import ProductCards from './product-cards.component';
import ProductInfo from './product-info.component';
import ProductEdit from './product-edit.component';
import ProductAdd from './product-add.component';
import { convertSearchFormToQueryString } from '../utils/convert-search-form-to-query-string';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductComp } from '../../state/product/product.selectors';
import { setProductComp } from '../../state/product/product.actions';
import { setIsSelectingProduct } from '../../state/order/order.actions';

// initial values
const formSchema = Yup.object().shape({
  search: Yup
    .string()
});
const formState = {
  search: ''
}

// main component
const Product = ({
  comp,
  setIsSelectingProduct,
  setProductComp
}) => {

  const location = useLocation()

  const [queryObj, setQueryObj] = useState({
    str: "",
    page: null
  });

  const [
    formData,
    errors, 
    onInputChange,
    buttonDisabled
  ] = useForm(formState, formState, formSchema);

  const formSubmit = (e) => {
    e.preventDefault();
    
    let queryStr = convertSearchFormToQueryString(e, formData);

    if (queryStr !== undefined) {
      setQueryObj(prevState => ({
        ...prevState,
        str: queryStr,
        page: null
      }))
    }
  }

  const goBack = () => {
    setIsSelectingProduct(false)
  }

  useEffect(() => {
    return () => {
      setProductComp('')
    }
    // eslint-disable-next-line
  }, [])
  
  return <>
    {
      comp === '' && <>
        <Container width="col" goBack={location.search ? goBack : undefined}>
          <Card width="col" title="Search For Products" >
            <Ul>
              <ProductSearchForm 
                formSubmit={formSubmit} 
                formData={formData}
                errors={errors}
                onInputChange={onInputChange}
                buttonDisabled={buttonDisabled}
              />
              <Li>
                <div className="row">
                  <div className="col">
                    <a
                      href="/"
                      className="a-link-cs"
                      onClick={e => {
                        e.preventDefault();
                        setProductComp('product-add')
                      }}
                    >
                      ( + ) Add a New Product
                    </a>
                  </div>
                </div>
              </Li>
            </Ul>
          </Card>
          {/* queryObj, setQueryObj are ownProps */}
          <ProductCards
            pathname='/products'
            queryStr={queryObj.str}
            component='product-cards'
            queryObj={queryObj}
            setQueryObj={setQueryObj}
          />
        </Container>
      </>
    }
    {
      comp === 'product-info' && <>
        <ProductInfo />
      </>
    }
    {
      comp === 'product-edit' && <>
        <ProductEdit />
      </>
    }
    {
      comp === 'product-add' && <>
        <ProductAdd />
      </>
    }
  </>
}

const mapStateToProps = createStructuredSelector({
  comp: selectProductComp
})

const mapDispatchToProps = dispatch => ({
  setIsSelectingProduct: payload => dispatch(setIsSelectingProduct(payload)),
  setProductComp: comp => dispatch(setProductComp(comp))
})

export default connect(mapStateToProps, mapDispatchToProps)(Product);