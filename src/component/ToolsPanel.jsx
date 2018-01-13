import React, {Component} from 'react';
import PropTypes from 'prop-types';

import svgLoader from '../img/svg-loader.svg';
import {Alert, Button, ButtonGroup, Col, Row} from 'reactstrap';
import {loadBig, loadHuge, loadSmall} from "../api/api";

class ToolsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      errorMsg: ''
    };
    this.handleClear = this.handleClear.bind(this);
    this.handleLoadBig = this.handleLoadBig.bind(this);
    this.handleLoadHuge = this.handleLoadHuge.bind(this);
    this.handleLoadSmall = this.handleLoadSmall.bind(this);
    this.handleNewData = this.handleNewData.bind(this);
    this.handleUILoad = this.handleUILoad.bind(this);
    this.handleLoadingIndicator = this.handleLoadingIndicator.bind(this);
  }

  handleLoadingIndicator() {
    this.setState((prevState) => {
      return {
        isLoading: !prevState.isLoading
      }
    });
  }

  handleUILoad(msg) {
    this.setState({
      errorMsg: msg
    }, () => this.handleLoadingIndicator())
  }

  handleClear() {
    this.props.onLoad([]);
    this.setState({
      errorMsg: '',
      isLoading: false
    })
  }

  handleNewData(newData) {
    this.props.onLoad(newData);
    this.handleUILoad('');
  }

  handleLoadBig() {
    this.handleUILoad('');
    loadBig(this.handleNewData, this.handleUILoad);

  }

  handleLoadSmall() {
    this.handleUILoad('');
    loadSmall(this.handleNewData, this.handleUILoad);
  }

  handleLoadHuge() {
    this.handleUILoad('');
    loadHuge(this.handleNewData, this.handleUILoad);
  }

  render() {
    return (
      <Alert color='secondary'>
        <Row style={{alignItems: 'center'}}>
          <Col md={{size: 5}} style={{alignItems: 'left'}}>
            <ButtonGroup>
              <Button
                disabled={this.state.isLoading}
                color='secondary'
                onClick={this.handleLoadHuge}>
                Load huge data
              </Button>
              <Button
                disabled={this.state.isLoading}
                color='secondary'
                onClick={this.handleLoadBig}>
                Load big data
              </Button>
              <Button
                disabled={this.state.isLoading}
                color='secondary'
                onClick={this.handleLoadSmall}>
                Load small data
              </Button>
              <Button
                disabled={this.state.isLoading}
                color='secondary'
                onClick={this.handleClear}>
                Clear
              </Button>
            </ButtonGroup>
          </Col>
          <Col md={{size: 2}} style={{alignItems: 'center'}}>
            {this.state.isLoading ? (<img src={svgLoader} alt='Loading...'/>) : (<div/>)}
          </Col>
          <Col>
            <div>
              <Alert color='danger'
                     isOpen={this.state.errorMsg !== ''}
                     style={{lineHeight: '50%', textAlign: 'centerLeft', marginBottom: 0}}
              >
                {this.state.errorMsg}
              </Alert>
            </div>
          </Col>
        </Row>
      </Alert>

    );
  }
}

ToolsPanel.propTypes = {
  onLoad: PropTypes.func.isRequired
};

export default ToolsPanel;