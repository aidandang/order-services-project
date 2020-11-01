import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";

// components
import { Container, Card, Ul, Li } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import ProductSearchForm from './product-search-form.component';
import ProductCards from './product-cards.component';
import ProductInfo from './product-info.component';
import ProductEdit from './product-edit.component';
import ProductAdd from './product-add.component';
import { convertSearchFormToQueryString } from '../utils/convert-search-form-to-query-string';

// initial values
const formSchema = Yup.object().shape({
  search: Yup
    .string()
});
const formState = {
  search: ''
}

// main component
const Product = () => {

  const [comp, setComp] = useState('')

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
  
  return <>
    {
      comp === '' && <>
        <Container width="col">
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
                        setComp('product-add')
                      }}
                    >
                      ( + ) Add a New Product
                    </a>
                  </div>
                </div>
              </Li>
            </Ul>
          </Card>
          {/* queryObj, setQueryObj, setComp are ownProps */}
          <ProductCards
            pathname='/products'
            queryStr={queryObj.str}
            component='product-cards'
            queryObj={queryObj}
            setQueryObj={setQueryObj}
            setComp={setComp}
          />
        </Container>
      </>
    }
    {
      comp === 'product-info' && <>
        <ProductInfo setComp={setComp} />
      </>
    }
    {
      comp === 'product-edit' && <>
        <ProductEdit
          setComp={setComp}
        />
      </>
    }
    {
      comp === 'product-add' && <>
        <ProductAdd
          setComp={setComp}
        />
      </>
    }
  </>
}


export default Product;