import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import React, { Component, PropTypes } from 'react';
import debounce from 'lodash.debounce';
import { Audit } from '../index';

export class AppUserForm extends Audit(Component) {

  static propTypes = {
    data : PropTypes.shape({
      username : PropTypes.string,
      email : PropTypes.string,
      text : PropTypes.string
    }),
    actions : PropTypes.object.isRequired
  };

  onChange = (event, field) => {
    event.persist();
    debounce(() => this.props.actions.changeForm({ ...this.props.data, [field] : event.target.value }))();
  };

  onChange = (event, field) => {
    event.persist();
    debounce(() => this.props.actions.changeForm({ ...this.props.data, [field] : event.target.value }))();
  };

  render() {

    const error = this.props.error.message ? this.alert(this.props.error.message) : undefined;

    return (

      <Form onSubmit={this.props.onSubmit}>

        { error }

        <FormGroup>
          <Label for="username">Username</Label>
          <Input
            onChange={event => this.onChange(event, 'username')}
            type="text"
            name="username"
            id="username"
            placeholder="yourUsername"
            pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$"
            title="Please write a proper username"
            required />
        </FormGroup>

        { this.props.showEmailInput === true ? (
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              onChange={event => this.onChange(event, 'email')}
              type="email"
              name="email"
              id="email"
              placeholder="your.email@example.com"
              required />
          </FormGroup>
        ) : undefined }

        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            onChange={event => this.onChange(event, 'password')}
            type="password"
            name="password"
            id="password"
            placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
            required />
        </FormGroup>

        <Button>Submit</Button>

      </Form>
    );

  }

}

export default AppUserForm;

