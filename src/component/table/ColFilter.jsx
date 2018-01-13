import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Input, InputGroup, InputGroupButton} from 'reactstrap';


class ColFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.clear = this.clear.bind(this);
  }

  clear() {
    this.setState({
      value: ''
    }, () => this.props.onChange(this.props.colId, this.state.value))
  }

  render() {
    return (
      <div>
        <InputGroup>
          <Input
            type='text'
            value={this.state.value}
            onChange={e => {
              this.setState({
                value: e.target.value
              }, () => this.props.onChange(this.props.colId, this.state.value));
            }}/>
          <InputGroupButton color='secondary' onClick={this.clear}>
            x
          </InputGroupButton>
        </InputGroup>
      </div>
    );
  }
}

ColFilter.propTypes = {
  colId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ColFilter;
