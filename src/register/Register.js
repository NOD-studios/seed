import React, { Component } from 'react'
import { withAudit, AppLoader, AppRowSpacer, AppUserForm } from '../index'
import { Row, Col, Button } from 'reactstrap'

export class Register extends withAudit(Component) {

  onSubmit = event => [
    event.preventDefault(),
    this.props.postRegistrationForm(this.props.registrationFormResult)
  ]

  onCancel = event => [ event.preventDefault(), this.props.postRegistrationFormCanceled() ]

  render() {

    return (
      <Row className="flex-items-xs-middle">
        <Col>

          <Row>
            <Col md={ { size : 6, offset : 3 } }>
              <h1>Register</h1>
            </Col>
          </Row>

          <AppRowSpacer />

          <Row>
            <Col md={ { size : 6, offset : 3 } }>

              { this.props.postingForm ? (
                <div>

                  <AppLoader />

                  <AppRowSpacer />

                  <Button onClick={ this.onCancel }>
                    Cancel
                  </Button>

                </div>
              ) : (
                <AppUserForm { ...this.props } fields={ [
                  'firstAndLastName',
                  'email',
                  'password'
                ] } onSubmit={ event => this.onSubmit( event ) } />
              ) }

            </Col>
          </Row>

        </Col>
      </Row>
    )

  }

}

export default Register
