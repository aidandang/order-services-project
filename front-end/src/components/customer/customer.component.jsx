import React, { useState, useEffect } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation } from 'react-router-dom';

// components
import { Container, Card, Ul, Li } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import CustomerSearchForm from './customer-search-form.component';
import CustomerListTable from './customer-list-table.component';
import CustomerAdd from './customer-add.component';
import CustomerInfo from './customer-info.component';
import CustomerEdit from './customer-edit.component';
import CustomerShippingInfo from './customer-shipping-info.component';
import { convertSearchFormToQueryString } from '../utils/convert-search-form-to-query-string';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCustomerComp } from '../../state/customer/customer.selectors';
import { setCustomerComp } from '../../state/customer/customer.actions';
import { setIsSelectingCustomer } from '../../state/order/order.actions';

// initial values
const formSchema = Yup.object().shape({
  search: Yup
    .string()
});
const formState = {
  search: ''
}

// main component
const Customer = ({
  comp,
  setCustomerComp,
  setIsSelectingCustomer
}) => {

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

  const goBack = () => {
    setIsSelectingCustomer(false)
  }

  useEffect(() => {
    return () => {
      setCustomerComp('')
    }
    // eslint-disable-next-line
  }, [])

  return <>
    {
      comp === '' && <>
        <Container width="col" goBack={location.search ? goBack : undefined}>
          <Card width="col" title="Search For Customers" >
            <Ul>
              <CustomerSearchForm
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
                        setCustomerComp('customer-add')
                      }}
                    >
                      ( + ) Add a New Customer
                    </a>
                  </div>
                </div>
              </Li>
            </Ul>
          </Card>
          <CustomerListTable
            pathname='/customers'
            queryStr={queryObj.str}
            queryObj={queryObj}
            setQueryObj={setQueryObj}
          />
        </Container>
      </>
    }
    { comp === 'customer-add' && <CustomerAdd /> }
    { comp === 'customer-info' && <CustomerInfo /> }
    { comp === 'customer-edit' && <CustomerEdit /> }
    { comp === 'customer-shipping-info' && <CustomerShippingInfo /> }
  </>
}

const mapStateToProps = createStructuredSelector({
  comp: selectCustomerComp
})

const mapDispatchToProps = dispatch => ({
  setIsSelectingCustomer: payload => dispatch(setIsSelectingCustomer(payload)),
  setCustomerComp: comp => dispatch(setCustomerComp(comp))
})

export default connect(mapStateToProps, mapDispatchToProps)(Customer);