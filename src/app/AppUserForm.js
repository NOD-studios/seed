import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import React, { Component, PropTypes } from 'react';
import debounce from 'lodash.debounce';
import { Audit, AppAlert } from '../index';

export class AppUserForm extends Audit(Component) {

  static propTypes = {
    fields : PropTypes.array.isRequired,
    formError : PropTypes.object,
    data : PropTypes.shape({
      email : PropTypes.string,
      username : PropTypes.string,
      password : PropTypes.string,
      firstAndLastName : PropTypes.string
    }),
    actions : PropTypes.object.isRequired
  };

  onChange = (event, field) => {
    event.persist();
    debounce(() => this.props.actions.changeForm({ ...this.props.data, [field] : event.target.value }))();
  };

  fieldTemplates = {

    username : (
      <FormGroup key="AppUserFormUsername">
        <Label for="username">Username</Label>
        <Input
          onChange={event => this.onChange(event, 'username')}
          type="text"
          name="username"
          id="username"
          placeholder="yourUsername"
          pattern="^[a-z ,.'-]+$"
          title="Please write a proper username"
          required />
      </FormGroup>
    ),

    firstAndLastName : (
      <FormGroup key="AppUserFormFirstAndLastName">
        <Label for="firstAndLastName">First and Last Name</Label>
        <Input
          onChange={event => this.onChange(event, 'firstAndLastName')}
          type="text"
          name="firstAndLastName"
          id="firstAndLastName"
          placeholder="First and Last Name"
          pattern="([A-z0-9À-ž\s]){4,}"
          title="Please write your full name correctly"
          minLength="4"
          required />
      </FormGroup>
    ),

    email : (
      <FormGroup key="AppUserFormEmail">
        <Label for="email">Email</Label>
        <Input
          onChange={event => this.onChange(event, 'email')}
          type="email"
          name="email"
          id="email"
          placeholder="your.email@example.com"
          required />
      </FormGroup>
    ),

    password : (
      <FormGroup key="AppUserFormPassword">
        <Label for="password">Password</Label>
        <Input
          onChange={event => this.onChange(event, 'password')}
          type="password"
          name="password"
          id="password"
          placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
          required />
      </FormGroup>
    )

  };

  getFields = fields => {
    const fieldKeys = Object.keys(this.fieldTemplates).filter(field => fields.includes(field));
    return fieldKeys.map((fieldKey, i) => this.fieldTemplates[fieldKey]);
  };

  render() {

    const
      error = this.props.formError.message ? (
        <AppAlert error={ this.props.formError.message } />
      ) : undefined,
      fields = this.getFields(this.props.fields);

    return (

      <Form onSubmit={this.props.onSubmit}>

        { error }

        { fields }

        <Button>Submit</Button>

      </Form>
    );

  }

}

export default AppUserForm;

