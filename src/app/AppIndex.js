import React, { Component } from 'react';
import { Audit, Welcome } from '../index';

export class AppIndex extends Audit(Component) {

  render() {

    return (
      <Welcome {...this.props} />
    );

  }

}

export default AppIndex;
