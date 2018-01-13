import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Col, Container, Row, Table} from 'reactstrap';
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";
import RowsPerPageDropDown from "./RowsPerPageDropDown";
import TableHead from "./TableHead";


class SortingFilteringTableWithPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageSize: 25,
      currentPage: 1,
      filters: {},
      sort: {dir: '', colId: ''}
    };
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleChangePageSize = this.handleChangePageSize.bind(this);
  }


  handleChangePage(page) {
    this.setState({
      currentPage: page
    });
  }

  handleChangePageSize(pageSize) {
    this.setState({
      currentPage: 1,
      pageSize: pageSize
    });
  }

  handleSort(colId, dir) {
    this.setState(prevState => {
      const sort = prevState.sort;
      sort.colId = colId;
      sort.dir = dir;
      return {
        currentPage: 1,
        sort: sort
      }
    })
  }

  handleFilterChange(colId, value) {
    this.setState(prevState => {
      const filters = prevState.filters;
      filters[colId] = value;
      return {
        currentPage: 1,
        filters: filters
      }
    })
  }

  render() {
    let filteredData = this.processFilteredData();
    let sortedData = this.processSortedData(filteredData);
    let visibleData = this.processVisibleData(sortedData);
    return (
      <Container style={{border: '2px solid gray', borderRadius: 10}}>
        <Row style={{marginTop: 15}}>
          <Col md={{size: 'auto'}}>
            <TablePagination current={this.state.currentPage}
                             dataSize={filteredData.length}
                             pageSize={this.state.pageSize}
                             onChangePage={this.handleChangePage}
            />
          </Col>
          <Col>
            <RowsPerPageDropDown onChange={this.handleChangePageSize}
                                 rowsPerPage={this.state.pageSize}
            />
          </Col>
        </Row>
        <Row>
          <Col md={{size: 12}}>
            <Table hover bordered style={{tableLayout: 'fixed'}}>
              <TableHead columns={this.props.columns}
                         onSingleFilter={this.handleFilterChange}
                         onSingleSort={this.handleSort}
                         sort={this.state.sort}/>
              <TableBody
                data={visibleData}
                pageSize={this.state.pageSize}
                page={this.state.currentPage}
              />
            </Table>
          </Col>
        </Row>
        <Row>
          <Col md={{size: 'auto'}}>
            <TablePagination current={this.state.currentPage}
                             dataSize={filteredData.length}
                             pageSize={this.state.pageSize}
                             onChangePage={this.handleChangePage}
            />
          </Col>
          <Col>
            <RowsPerPageDropDown onChange={this.handleChangePageSize}
                                 rowsPerPage={this.state.pageSize}
            />
          </Col>
        </Row>
      </Container>
    );
  }

  processVisibleData(sortedData) {
    let start = (this.state.currentPage - 1) * this.state.pageSize;
    let end = start + this.state.pageSize;
    return sortedData.slice(start, end);
  }

  processSortedData(filteredData) {
    let sortedData = filteredData.slice();
    let func;
    if (this.state.sort.dir === 'ASC')
      func = (a, b) => {
        if (typeof a[this.state.sort.colId] === 'number') {
          return a[this.state.sort.colId] - b[this.state.sort.colId];
        }
        else
          return a[this.state.sort.colId].toString().localeCompare(b[this.state.sort.colId].toString());
      };
    else if (this.state.sort.dir === 'DESC')
      func = (a, b) => {
        if (typeof a[this.state.sort.colId] === 'number')
          return b[this.state.sort.colId] - a[this.state.sort.colId];
        else
          return b[this.state.sort.colId].toString().localeCompare(a[this.state.sort.colId].toString())
      };
    else
      func = null;
    if (func !== null)
      sortedData = sortedData.sort(func);
    return sortedData;
  }

  processFilteredData() {
    let filteredData = this.props.originalData.slice();
    this.props.columns.forEach(col => {
      const value = this.state.filters[col] === undefined ? '' : this.state.filters[col];
      if (value !== '')
        filteredData = filteredData.filter(data => data[col].toString().toLowerCase().includes(value.toLowerCase()));
    });
    return filteredData;
  }
}

SortingFilteringTableWithPagination.propTypes = {
  columns: PropTypes.array.isRequired,
  originalData: PropTypes.array.isRequired
};

SortingFilteringTableWithPagination.defaultProps = {
  originalData: []
};

export default SortingFilteringTableWithPagination;