import { Audit } from '../index';
import React, { Component} from 'react';
import { Row, Col, Jumbotron } from 'reactstrap';

export class NotFound extends Audit(Component) {

  render() {

    return (
      <Row className="flex-items-xs-middle">
        <Col>
          <Jumbotron className="text-xs-center">
            <h1 className="display-4">Oops</h1>
            <p className="lead">The page that you requested is not found, sorry.</p>
          </Jumbotron>
        </Col>
      </Row>
    );

  }

}

export default NotFound;
