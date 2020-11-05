import React, { useState } from 'react';

// dependencies
import * as Yup from "yup";
import { useLocation, Redirect, useHistory } from 'react-router-dom'; 
import queryString from 'query-string';

// components
import { Container, Card, Ul } from '../tag/tag.component';
import { useForm } from '../hook/use-form';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';
import OrderCostForm from './order-cost-form.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { saveOrderCost } from '../../state/order/order.actions';
import { selectOrderEditing } from '../../state/order/order.selectors';

// initial form state
const formSchema = Yup.object().shape({
  shippingCost: Yup
    .string(),
  saleTax: Yup
    .string(),
  totalCost: Yup
    .string()
    .required()
})

const formState = {
  shippingCost: "",
  saleTax: "",
  totalCost: ""
}

// main component
const OrderCost = ({
  order,
  saveOrderCost
}) => {

  const location = useLocation();
  const history = useHistory();
  const queryStr = queryString.parse(location.search);
  const { comp } = queryStr;
  const [redirect, setRedirect] = useState(false)

  const { cost } = order;
  let orderEditing = null;

  if (cost) {
    orderEditing = {
      ...formState,
      shippingCost: cost.shippingCost,
      saleTax: cost.saleTax,
      totalCost: cost.totalCost
    }
  }

  const [
    formData,
    errors, 
    onInputChange, 
    buttonDisabled,
    setValues
  ] = useForm(orderEditing ? orderEditing : formState, formState, formSchema);

  const formSubmit = () => {
    const obj = { ...formData }
    
    saveOrderCost(obj)
    setRedirect(true);
  }

  const formReset = () => {
    setValues(formState);
  }

  const goBack = () => {
    history.push(`${location.pathname}?comp=${comp}`)
  }

  return <>

    {
      redirect && <Redirect to={`${location.pathname}?comp=${comp}`} />
    }
    
    <Container width="col" goBack={goBack}>
      <Card width="col" title="Local Costs">
        <Ul>
          <form onSubmit={formSubmit}>
            <OrderCostForm
              formData={formData}
              errors={errors} 
              onInputChange={onInputChange}
            />
            <SubmitOrReset
              buttonName={'Save'}
              buttonDisabled={buttonDisabled}
              formSubmit={formSubmit}
              formReset={formReset}
            />
          </form>
        </Ul>
      </Card>
    </Container>
  
  </>
}

const mapStateToProps = createStructuredSelector({
  order: selectOrderEditing
})

const mapDispatchToProps = dispatch => ({
  saveOrderCost: payload => dispatch(saveOrderCost(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCost);