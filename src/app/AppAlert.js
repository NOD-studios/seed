import React, { PureComponent } from 'react'
import { Alert, Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'

export class AppAlert extends PureComponent {

  static propTypes = {
    error : PropTypes.string
  }

  render() {

    const { error } = this.props

    return (
      <Row>
        <Col>

          { error ? (
            <Alert color="danger">
              <strong>Error:</strong> { error }
            </Alert>
          ) : '' }

        </Col>
      </Row>
    )

  }

}

export default AppAlert
