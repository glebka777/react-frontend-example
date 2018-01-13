import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Button} from "reactstrap";
import {MdKeyboardArrowDown, MdKeyboardArrowUp, MdUnfoldMore} from "react-icons/lib/md/index";


class ColSorter extends Component {
  constructor(props) {
    super(props);
    this.changeDir = this.changeDir.bind(this);
  }

  changeDir() {
    let newDir;
    switch (this.props.dir) {
      case '': {
        newDir = 'ASC';
        break;
      }
      case 'ASC': {
        newDir = 'DESC';
        break;
      }
      default:
      case 'DESC': {
        newDir = '';
        break;
      }
    }
    this.props.onChange(this.props.colId, newDir)
  }

  render() {
    let button;
    const dir = this.props.dir;
    switch (dir) {
      case 'ASC': {
        button = (
          <Button color='primary' size='xs' onClick={this.changeDir}>
            <MdKeyboardArrowUp/>
          </Button>
        );
        break;
      }
      case 'DESC': {
        button = (
          <Button color='primary' size='xs' onClick={this.changeDir}>
            <MdKeyboardArrowDown/>
          </Button>
        );
        break;
      }
      default: {
        button = (
          <Button color='secondary' size='xs' onClick={this.changeDir}>
            <MdUnfoldMore/>
          </Button>
        );
        break;
      }
    }
    return (
      <div>
        {button}
      </div>
    );
  }
}

ColSorter.propTypes = {
  colId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  dir: PropTypes.string.isRequired
};

export default ColSorter;
