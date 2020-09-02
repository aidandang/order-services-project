// import react and react components
import React from 'react';

// import dependencies
import { connect, batch } from 'react-redux';

// import _shared components.
import Stagebar from '../../../_shared/Stagebar';

// import child components
import CustomerListPage from '../../../customers/containers/pages/CustomerListPage';
import AddCustomer from '../../../customers/containers/pages/AddCustomer';
import AddressList from '../../../customers/containers/pages/AddressList';
import AddAddress from '../../../customers/containers/pages/AddAddress';
import ItemList from '../pages/ItemList';
import CustomerInfo from '../pages/CustomerInfo';
import CustomerInfoCard from '../../components/CustomerInfoCard';
import ProductListPage from '../../../products/containers/pages/ProductListPage';
import ColorList from '../../../products/containers/pages/ColorList';
import ItemDetails from '../pages/ItemDetails';
import AddColor from '../../../products/containers/pages/AddColor';
import AddProduct from '../../../products/containers/pages/AddProduct';
import PreviewAndSubmit from '../pages/PreviewAndSubmit';

// import redux middleware, actions and settings
import { saveCustomerToOrder } from '../../../../state/actions/data';
import { setPageActive, setStageActive } from '../../../../state/actions/ui';

// CONSTANCE DECLARATION //
// map states and dispatches to the props
const mapStateToProps = (state) => ({
  pageWrapper: state.ui.pageWrapper,
  customer: state.data.customers.byId,
  order: state.data.orders.byId
});
const pageActive = (page) => dispatch => {
  dispatch(setPageActive(page))
}
const stageActive = (payload) => dispatch => {
  dispatch(setStageActive(payload))
};
const saveCustomer = (payload, page) => dispatch => {
  batch(() => {
    dispatch(saveCustomerToOrder(payload));
    dispatch(setPageActive(page));
  })
};

const pageTitle = {
  PRODUCT_LIST: "Select Product",
  COLOR_LIST: "Select Color"
}

// MAIN COMPONENT //
const AddOrder = ({
  order,
  customer,
  pageActive,
  stageActive,
  pageWrapper,
  saveCustomer
}) => {

  const { stage, page } = pageWrapper.tabbar.active;
  const stageList = pageWrapper.tabbar.list.find(element => element.name === 'ADD_ORDER').stages

  const handleStage = e => {
    e.preventDefault();
    stageActive(e.target.name);
  }

  // render starts
  return <>
    <Stagebar
      stageList={stageList}
      active={stage}
      onClickHandler={handleStage}
    />

    {
      stage === 'SELECT_CUSTOMER' && <> 
        {
          order.customer && order.address
          ? 
            <CustomerInfoCard 
              customer={order.customer} 
              address={order.address}
              saveCustomer={saveCustomer}
            /> 
          : <>
            {
              (
                page.name === 'CUSTOMER_LIST' || 
                page.name === undefined
              ) && <CustomerListPage />
            }
            { page.name === 'ADD_CUSTOMER' && <AddCustomer /> }
            { page.name === 'ADDRESS_LIST' && <AddressList /> }
            { page.name === 'CUSTOMER_INFO' && <CustomerInfo /> }
            { page.name === 'ADD_ADDRESS' && <AddAddress /> }
          </>
        }
      </>
    }
    { 
      stage === 'ADD_ITEMS' && <>
        { 
          (
            page.name === 'ITEM_LIST' ||
            page.name === undefined
          ) && <ItemList />
        }
        {
          (
            page.name === 'PRODUCT_LIST' ||
            page.name === 'COLOR_LIST'
          ) && <div className="card my-3">
            <div className="card-header bg-card-cs">
              <div className="row">
                <div className="col text-uppercase font-weight-bold">{pageTitle[page.name]}</div>
                <div className="col text-right">
                  <a 
                    href="/" 
                    className="a-link-cs" 
                    name="accountInfo" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      pageActive({ name: page.name === 'COLOR_LIST' ? 'PRODUCT_LIST' : 'ITEM_LIST' })
                    }}
                  >
                    Close
                  </a>
                </div>
              </div>
            </div>
            <div className="card-body bg-card-cs">
              { page.name === 'PRODUCT_LIST' && <ProductListPage /> }
              { page.name === 'COLOR_LIST' && <ColorList /> } 
            </div>
          </div>
        }
        { page.name === 'ITEM_DETAILS' && <ItemDetails /> }
        { page.name === 'ADD_COLOR' && <AddColor /> }
        { page.name === 'ADD_PRODUCT' && <AddProduct />}
      </>
    }
    {
      stage === 'SUBMIT_ORDER' && <PreviewAndSubmit />
    }
  </>
}

export default connect(mapStateToProps, { pageActive, stageActive, saveCustomer })(AddOrder);