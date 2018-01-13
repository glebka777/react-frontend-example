import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';


const rowsPerPageVars = [10, 25, 50, 100];

class RowsPerPageDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropDownOpen: false
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggle() {
    this.setState((prevState) => {
      return {
        isDropDownOpen: !prevState.isDropDownOpen
      }
    });
  }

  handleChange(count) {
    this.props.onChange(count)
  }

  render() {
    return (
      <Dropdown isOpen={this.state.isDropDownOpen} toggle={this.toggle}>
        <DropdownToggle color='primary' caret>
          {this.props.rowsPerPage}
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Rows per page</DropdownItem>
          {rowsPerPageVars.map((vr => (<DropdownItem onClick={() => this.handleChange(vr)}>{vr}</DropdownItem>)))}
        </DropdownMenu>
      </Dropdown>
    )
  }
}

RowsPerPageDropDown.propTypes = {
  onChange: PropTypes.func.isRequired
};

RowsPerPageDropDown.defaultProps = {
  rowsPerPage: 10
};

export default RowsPerPageDropDown;