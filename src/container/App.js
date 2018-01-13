import React, {Component} from 'react';
import './App.css';

import {Col, Container, Row} from "reactstrap";

import Header from '../component/Header';
import ToolsPanel from '../component/ToolsPanel';
import SortingFilteringTableWithPagination from "../component/table/Table";


const columns = [
  'id',
  'firstName',
  'lastName',
  'email',
  'phone'
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.loadData = this.loadData.bind(this);
  }

  loadData(newData) {
    this.setState({
      data: newData
    });
  }

  render() {
    return (
      <div>
        <Container>
          <Row style={{marginTop: 20}}>
            <Col>
              <Header/>
            </Col>
          </Row>
          <Row>
            <Col>
              <ToolsPanel onLoad={this.loadData}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <SortingFilteringTableWithPagination
                originalData={this.state.data}
                columns={columns}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
