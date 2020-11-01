import React, { useState } from 'react';

// components
import * as Yup from "yup";
import { useLocation, Link } from 'react-router-dom';

// components
import { Card, Ul, Li } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import OrderSearchForm from './order-search-form.component';
import OrderListTable from './order-list-table.component';
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
const Order = () => {

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
    <Card width="col" title="Search For Orders" >
      <Ul>
        <OrderSearchForm
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
                  pathname: location.search,
                  search: '?comp=add',
                  state: {
                    from: location.search
                  }
                }}
                className="a-link-cs"
              >
                ( + ) Add a New Order
              </Link>
            </div>
          </div>
        </Li>
      </Ul>
    </Card>
    <OrderListTable
      pathname='/orders'
      queryStr={queryObj.str}
      queryObj={queryObj}
      setQueryObj={setQueryObj}
    />
  </>
}

export default Order;