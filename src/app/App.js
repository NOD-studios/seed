import React, { Component, cloneElement, PropTypes } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Audit, NavBar, Footer, AppAlert, actions } from '../index';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-flex.css';

@connect((state) => state)
export class App extends Audit(Component) {

  static propTypes = {
    app : PropTypes.shape({
      postingForm : PropTypes.bool.isRequired,
      fetchingIp : PropTypes.bool.isRequired,
      formError : PropTypes.object.isRequied,
      error : PropTypes.object.isRequied,
      data : PropTypes.object.isRequired
    }),
    routing : PropTypes.object.isRequired,
    dispatch : PropTypes.func.isRequired,
    children : PropTypes.object.isRequired
  };

  componentWillMount() {

    this.actions = bindActionCreators(actions, this.props.dispatch);

  }

  getChildProps() {
    return { actions : this.actions, ...this.props.app };
  }

  render() {

    const childProps = this.getChildProps();

    return (
      <div className="App">

        <Container fluid={true} className="p-0">

          <Row>
            <Col>
              <NavBar {...childProps} />
            </Col>
          </Row>

          <main role="main">

            <Row className="p-2 main-middle flex-items-xs-middle">

              { childProps.error.message ? (

                <Col xs={{ size : 12 }}>
                  <AppAlert error={ childProps.error.message } />
                </Col>

              ) : ''}

              <Col md={{ size : 6 , offset: 3 }}>

                { cloneElement(this.props.children, childProps) }

              </Col>
            </Row>

          </main>

          <Row>
            <Col>

              <Footer {...childProps} />

            </Col>
          </Row>

        </Container>

      </div>
    );

  }

}

export default App;
