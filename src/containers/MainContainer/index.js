import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import db from '../../products.json';
import { addEntry } from '../../actions';

import EntryTable from '../EntryTable';
// import CartTotals from '../CartTotals';
import RaisedButton from 'material-ui/RaisedButton';

import './index.css';

class MainContainer extends Component {
  render() {
    return (
      <div>

        <EntryTable />

        {/* <CartTotals /> */}

        {/*TODO: move this into its own component --
        render a +button for each possible product, if it is not in the cart*/}
        <div className="flex-list">
          {_.map(db, ({name}, id) => (
            !this.props.products.hasOwnProperty(id) && <RaisedButton
              key={id}
              label={name}
              style={{marginRight: 6}}
              icon={<span className="add-icon">+</span>}
              onClick={() => this.props.addEntry(id)}
            />
          ))}
        </div>

      </div>
    );
  }
}

MainContainer.propTypes = {
  products: PropTypes.object.isRequired
}

const mapStateToProps = ({ entryReducer: state }) => {
  return {
    products: state.cart.products
  }
};

export default connect(mapStateToProps, { addEntry })(MainContainer);
