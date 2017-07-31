import React, { Component } from 'react'
import { withAudit, Welcome } from '../index'

export class AppIndex extends withAudit(Component) {

  render() {

    return (
      <Welcome { ...this.props } />
    )

  }

}

export default AppIndex
