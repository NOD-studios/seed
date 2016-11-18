import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

export class AppRowSpacer extends Component {
  render() {
    return (
      <Row>
        <Col>&nbsp;</Col>
      </Row>
    );
  }
}

export default AppRowSpacer;
