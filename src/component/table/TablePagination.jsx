import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Pagination, PaginationItem, PaginationLink} from "reactstrap";


const MAX_PAGE_COUNT_FOR_VIEW = 7;

const paginationLinkStyle = {width: 55, textAlign: 'center'};

class TablePagination extends Component {
  constructor(props) {
    super(props);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleLast = this.handleLast.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleFirst = this.handleFirst.bind(this);
  }

  handlePage(page) {
    const pageCount = this.getPageCount();
    if (page > pageCount || page <= 0) return;
    this.props.onChangePage(page);
  }

  handleNext() {
    this.handlePage(this.props.current + 1)
  }

  handlePrev() {
    this.handlePage(this.props.current - 1)
  }

  handleFirst() {
    this.handlePage(1)
  }

  handleLast() {
    this.handlePage(this.getPageCount())
  }

  getPaginationItem(page, currentPage) {
    return (<PaginationItem className={page === currentPage ? 'active' : ''}>
      <PaginationLink style={paginationLinkStyle}
                      onClick={() => this.handlePage(page)}>
        {page}
      </PaginationLink>
    </PaginationItem>);
  }

  getPageCount() {
    let pageCount;
    if (this.props.dataSize <= this.props.pageSize)
      pageCount = 1;
    else {
      let even = ((this.props.dataSize % this.props.pageSize) === 0);
      pageCount = this.props.dataSize / this.props.pageSize;
      if (!even)
        pageCount += 1;
    }
    return Math.floor(pageCount);
  }

  render() {
    let pageCount = this.getPageCount();
    let pages = [];
    const current = this.props.current;
    if (pageCount < MAX_PAGE_COUNT_FOR_VIEW) {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(
          this.getPaginationItem(i, current)
        )
      }
    } else {
      if (current <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(
            this.getPaginationItem(i, current)
          )
        }
      } else if (current >= (pageCount - 2)) {
        for (let i = (pageCount - 4); i <= pageCount; i++) {
          pages.push(
            this.getPaginationItem(i, current)
          )
        }
      } else {
        for (let i = current - 2; i <= current + 2; i++) {
          if (i <= 0 || i > pageCount) continue;
          pages.push(
            this.getPaginationItem(i, current)
          )
        }
      }
    }

    return (
      <Pagination>
        <PaginationLink style={paginationLinkStyle} onClick={this.handleFirst}>
          ««
        </PaginationLink>
        <PaginationItem>
          <PaginationLink style={paginationLinkStyle} previous onClick={this.handlePrev}/>
        </PaginationItem>
        {pages}
        <PaginationItem>
          <PaginationLink style={paginationLinkStyle} next onClick={this.handleNext}/>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink style={paginationLinkStyle} onClick={this.handleLast}>
            »»
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    )
  }

}

TablePagination.propTypes = {
  current: PropTypes.number.isRequired,
  dataSize: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired
};

export default TablePagination;