import React from 'react';

// dependencies
import { useLocation, useHistory } from 'react-router-dom';

// components
import { Container, Card, Ul } from '../tag/tag.component';
import PreviewOrderInfo from './preview-order-info.component';
import PreviewOrderItem from './preview-order-item.component';
import PreviewOrderSale from './preview-order-sale.component';
import SubmitOrReset from '../submit-or-reset/submit-or-reset.component';

// redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOrderEditing } from '../../state/order/order.selectors';

const OrderAdd = ({
  order
}) => {

  const history = useHistory();
  const location = useLocation();

  const { orderInfo, items, orderSale } = order;

  const formSubmit = () => {
  }

  const formReset = () => {

  }

  const goBack = () => {
    history.push(`${location.pathname}`)
  }

  return <>
    <Container width="col" goBack={goBack}>
      <form>
        <div className="row">
          <div className="col-12">
            <PreviewOrderInfo orderInfo={orderInfo} />
          </div>
          <div className="col-12">
            <PreviewOrderItem items={items} />
          </div>
          <div className="col-12">
            <PreviewOrderSale orderSale={orderSale} />
          </div>
          <div className="col-12">
            <Card title="Action">
              <Ul>
                <SubmitOrReset
                  buttonName={'Submit'}
                  buttonDisabled={true}
                  formSubmit={formSubmit}
                  formReset={formReset}
                />   
              </Ul>
            </Card>
          </div>
        </div>
      </form>
    </Container>
  </>
}

const mapStateToProps = createStructuredSelector({
  order: selectOrderEditing
})

export default connect(mapStateToProps)(OrderAdd);