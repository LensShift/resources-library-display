import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { removeEntry } from '../../actions';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import { Percent, Euro } from '../../components/NumberFormat';
import FlatButton from 'material-ui/FlatButton';

import './index.css';

const headers = ['Name', 'Price', 'Tax', 'Quantity', 'Remove'];  

const EntryTable = (props) => (
  <Table>
    <TableHeader
      displaySelectAll={false}
      adjustForCheckbox={false}
      selectable={false}>
      <TableRow>
        {_.map(headers, (headerString, index) => <TableHeaderColumn key={index}>{headerString}</TableHeaderColumn>)}
      </TableRow>
    </TableHeader>
    <TableBody
      displayRowCheckbox={false}>
      {_.map(props.products, ({name, tax, price}, id) => (
        <TableRow key={id}>
          <TableRowColumn>{name}</TableRowColumn>
          <TableRowColumn><Euro value={price} /></TableRowColumn>
          <TableRowColumn><Percent value={tax} /></TableRowColumn>
          <TableRowColumn>{props.meta[id].quantity}</TableRowColumn>
          <TableRowColumn><FlatButton label="Remove" secondary onClick={() => props.removeEntry(id)}/></TableRowColumn>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

EntryTable.propTypes = {
  products: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
}

const mapStateToProps = ({entryReducer: state}) => {
  return {
    products: state.cart.products,
    meta: state.cart.meta
  }
}

export default connect(mapStateToProps, { removeEntry })(EntryTable);
