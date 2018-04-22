import React, {Component} from 'react';
import PropTypes from 'prop-types';

import DataInfoPopup from "./DataInfoPopup";


class TableBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      data: {}
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(newData) {
    this.setState({
      modalIsOpen: true,
      data: newData
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  render() {
    const data = this.props.data;
    return (
      <tbody>
      {data.length === 0 ?
        <td style={{textAlign: 'center'}} colSpan='5'>No data found</td>
        : data.map((person) => (
          <tr onClick={() => this.openModal(person)}>
            <td>{person.id}</td>
            <td>{person['firstName']}</td>
            <td>{person['lastName']}</td>
            <td>{person['email']}</td>
            <td>{person['phone']}</td>
          </tr>
        ))}
      <DataInfoPopup data={this.state.data} onAction={this.closeModal} modal={this.state.modalIsOpen}/>
      </tbody>
    );
  }
}

TableBody.propTypes = {
  data: PropTypes.array.isRequired
};

TableBody.defaultProps = {
  data: []
};

export default TableBody;