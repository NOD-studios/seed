import React, { Component } from 'react';
import { Audit, AppLoader, AppRowSpacer, AppUserForm } from '../index';
import { Row, Col, Button } from 'reactstrap';

export class Register extends Audit(Component) {

  onSubmit = event => {
    event.preventDefault();
    this.props.actions.postForm(this.props.data);
  };

  onCancel = event => {
    event.preventDefault();
    this.props.actions.postFormCancelled();
  };

  render() {

    return (
      <Row className="flex-items-xs-middle">
        <Col>

          <Row>
            <Col md={{ size : 6, offset: 3 }}>
              <h1>Register</h1>
            </Col>
          </Row>

          <AppRowSpacer />

          <Row>
            <Col md={{ size : 6, offset: 3 }}>

              { this.props.postingForm ? (
                <div>

                  <AppLoader />

                  <AppRowSpacer />

                  <Button onClick={this.onCancel}>Cancel</Button>

                </div>
              ) : (
                <AppUserForm {...this.props} fields={[
                  'firstAndLastName',
                  'email',
                  'password'
                ]} onSubmit={this.onSubmit} />
              ) }

            </Col>
          </Row>

        </Col>
      </Row>
    );

  }

}

export default Register;
