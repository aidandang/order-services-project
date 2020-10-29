import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, Link } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import ProductSearchForm from './product-search-form.component';
import ProductCards from './product-cards.component';
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
const ProductList = () => {

  const location = useLocation();

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
              <Link
                to={{
                  pathname: location.pathname,
                  search: location.search ? `${location.search}&action=product-add` : `?action=product-add`,
                  state: {
                    from: location.pathname + location.search
                  }
                }}
                className="a-link-cs"
              >
                ( + ) Add a New Product
              </Link>
            </div>
          </div>
        </Li>
      </Ul>
    </Card>
    <ProductCards
      pathname='/products'
      queryStr={queryObj.str}
      queryObj={queryObj}
      setQueryObj={setQueryObj}
    />
  </>
}


export default ProductList;