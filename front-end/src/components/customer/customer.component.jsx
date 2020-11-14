import React, { useEffect } from 'react';

// components
import { Container } from '../tag/tag.component';
import CustomerList from './customer-list.component';
import CustomerAdd from './customer-add.component';
import CustomerEdit from './customer-edit.component';
import CustomerShippingInfo from './customer-shipping-info.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCustomerComp } from '../../state/customer/customer.selectors';
import { setCustomerComp } from '../../state/customer/customer.actions';

// main component
const Customer = ({
  comp,
  setCustomerComp
}) => {

  const { directory, currComp } = comp;

  const goBack = () => {
    setCustomerComp(directory[currComp].parent)
  }

  useEffect(() => {
    return () => {
      setCustomerComp('customer-list')
    }
    // eslint-disable-next-line
  }, [])

  return <>
    <Container 
      goBack={(currComp !== 'customer-list' && currComp !== 'customer-info') ? goBack : null} 
    >
      { (currComp === 'customer-list' || currComp === 'customer-info') && <CustomerList /> }
      { currComp === 'customer-add' && <CustomerAdd /> }
      { currComp === 'customer-edit' && <CustomerEdit /> }
      { currComp === 'customer-shipping-info' && <CustomerShippingInfo /> }
    </Container>
  </>
}

const mapStateToProps = createStructuredSelector({
  comp: selectCustomerComp
})

const mapDispatchToProps = dispatch => ({
  setCustomerComp: currComp => dispatch(setCustomerComp(currComp))
})

export default connect(mapStateToProps, mapDispatchToProps)(Customer);