import './App.css'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component, cloneElement } from 'react'
import { withAudit, NavBar, Footer, AppAlert, withBoundActions } from '../'
import * as appActions from './appActions'
import { Container, Row, Col } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-flex.css'

@connect(({ ...state, app }) => ({ ...state, ...app }))
@withBoundActions(appActions)
export class App extends withAudit(Component) {

  static propTypes = {
    postingRegistrationForm : PropTypes.bool.isRequired,
    registrationFormError   : PropTypes.object.isRequired,
    registrationFormResult  : PropTypes.object.isRequired,
    appError                : PropTypes.object.isRequired,
    routing                 : PropTypes.object.isRequired,
    children                : PropTypes.object.isRequired
  }

  render() {

    const { appError: { message: appErrorMessage }, children } = this.props

    return (
      <div className="App">

        <Container fluid={ true } className="p-0">

          <Row>
            <Col>
              <NavBar { ...this.props } />
            </Col>
          </Row>

          <main role="main">

            <Row className="p-2 main-middle flex-items-xs-middle">

              { appErrorMessage ? (

                <Col xs={ { size : 12 } }>
                  <AppAlert error={ appErrorMessage } />
                </Col>

              ) : ''}

              <Col md={ { size : 6 , offset : 3 } }>
                { cloneElement(children, this.props) }
              </Col>

            </Row>

          </main>

          <Row>
            <Col>

              <Footer { ...this.props } />

            </Col>
          </Row>

        </Container>

      </div>
    )

  }

}

export default App
