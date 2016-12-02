import React, { Component, PropTypes } from 'react';
import { Row, Col, Alert } from 'reactstrap';
import { Audit, AppRowSpacer } from '../index';

export class Success extends Audit(Component) {

  static propTypes = {
    data : PropTypes.shape({
      username : PropTypes.string,
      firstAndLastName : PropTypes.string
    })
  };

  componentWillMount() {

    const { username, firstAndLastName } = this.props.data;

    if (username) {
      return true;
    }
    if (firstAndLastName) {
      return true;
    }

    this.props.actions.redirect('/register');
  }

  render() {

    return (
      <Row className="flex-items-xs-middle">
        <Col>

          <Row>
            <Col md={{ size : 6 , offset: 3 }}>
              <h1>Success</h1>
            </Col>
          </Row>

          <AppRowSpacer />

          <Row>
            <Col md={{ size : 6 , offset: 3 }}>

              <Alert color="info">
                Cheers <strong>{this.props.data.firstAndLastName || this.props.data.username } !</strong>
              </Alert>

            </Col>
          </Row>

        </Col>
      </Row>
    );

  }

}

export default Success;
