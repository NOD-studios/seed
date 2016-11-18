import React, { Component } from 'react';
import window from 'window-or-global';
import { Audit } from '../index';

export class Footer extends Audit(Component) {

  render() {

    return (
      <footer className="text-xs-center">
        <p><small>&copy; { new window.Date().getFullYear() }</small></p>
      </footer>
    );

  }

}

export default Footer;
