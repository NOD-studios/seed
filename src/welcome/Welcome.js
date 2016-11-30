import React, { Component, PropTypes } from 'react';
import { Jumbotron, Tag } from 'reactstrap';
import { Audit, AppLoader, AppRowSpacer } from '../index';

export class Welcome extends Audit(Component) {

  static propTypes = {
    data : PropTypes.shape({
      origin : PropTypes.string
    })
  };

  componentWillMount() {
    this.props.actions.fetchIp();
  }

  componentWillUnmount() {
    this.props.actions.fetchIpCancelled();
  }

  render() {

    const { data, fetching } = this.props;

    return (
      <Jumbotron className="text-xs-center">

        <h1 className="display-4">Welcome</h1>

        <AppRowSpacer />

        { fetching === false && data.origin ? (
          <p className="lead">Your IP address is <Tag color="info">{ data.origin }</Tag></p>
        ) : (
          <AppLoader />
        )}

      </Jumbotron>
    );

  }

}

export default Welcome;
