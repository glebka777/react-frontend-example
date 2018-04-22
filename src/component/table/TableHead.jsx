import React, {Component} from "react";
import PropTypes from 'prop-types';

import {Col, Container, Row} from "reactstrap";
import ColFilter from "./ColumnFilter";
import ColSorter from "./ColumnSorter";


class TableHead extends Component {
  render() {
    return (
      <thead>
      <tr style={{textAlign: 'center'}}>
        {this.props.columns.map((column) => (
          <th>{column}</th>
        ))}
      </tr>
      <tr>
        {this.props.columns.map((column) => (
          <th>
            <Container>
              <Row noGutters>
                <Col md={{size: 9}}>
                  <ColFilter colId={column}
                             onChange={this.props.onSingleFilter}
                  />
                </Col>
                <Col/>
                <Col md={{size: 1}} style={{marginRight: 10}}>
                  <ColSorter colId={column}
                             onChange={this.props.onSingleSort}
                             dir={this.props.sort.colId === column ? this.props.sort.dir : ''}
                  />
                </Col>
              </Row>
            </Container>
          </th>
        ))}
      </tr>
      </thead>
    )
  }
}

TableHead.propTypes = {
  columns: PropTypes.array.isRequired,
  onSingleFilter: PropTypes.func.isRequired,
  onSingleSort: PropTypes.func.isRequired,
  sort: PropTypes.object.isRequired
};

TableHead.defaultProps = {
  columns: []
};

export default TableHead;