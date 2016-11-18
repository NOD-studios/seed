import React, { Component } from 'react';
import { Alert, Row, Col } from 'reactstrap';

export class AppAlert extends Component {

  render() {

    return (
      <Row>
        <Col>

          { this.props.error ? (
            <Alert color="danger">
              <strong>Error:</strong> { this.props.error }
            </Alert>
          ) : ''}

        </Col>
      </Row>
    );

  }

}

export default AppAlert;
