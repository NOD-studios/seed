import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Alert } from 'reactstrap'
import { withAudit, AppRowSpacer } from '../index'

export class Success extends withAudit(Component) {

  static propTypes = {
    registrationFormResult : PropTypes.shape({
      username         : PropTypes.string,
      firstAndLastName : PropTypes.string
    })
  }

  componentWillMount() {
    const {
      redirect,
      registrationFormResult: { username, firstAndLastName }
    } = this.props

    return username
      ? true
      : firstAndLastName
        ? true
        : redirect('/register')
  }

  render() {

    const { registrationFormResult: { firstAndLastName, username } } = this.props

    return (
      <Row className="flex-items-xs-middle">
        <Col>

          <Row>
            <Col md={ { size : 6 , offset : 3 } }>
              <h1>Success</h1>
            </Col>
          </Row>

          <AppRowSpacer />

          <Row>
            <Col md={ { size : 6 , offset : 3 } }>

              <Alert color="info">
                Cheers <strong>{ firstAndLastName || username } !</strong>
              </Alert>

            </Col>
          </Row>

        </Col>
      </Row>
    )

  }

}

export default Success
