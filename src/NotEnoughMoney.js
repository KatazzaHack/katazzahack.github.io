import React from 'react';
import Modal from 'react-bootstrap/Modal';

class NEM extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  onNEMShow() {
    this.setState({ show: true });
  }

  hideNem() {
    this.setState({ show: false });
  }


  render() {
    return (
      <Modal size="sm" show={this.state.show} onHide={() => {this.hideNem()}} aria-labelledby="example-modal-sizes-title-sm">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Малява от разрабов.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Мало лавэ. Делай что-то другое.
        </Modal.Body>
      </Modal>
    );
  }
}

export default NEM;