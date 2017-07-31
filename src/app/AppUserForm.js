import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withAudit, AppAlert } from '../index'
import debounce from 'lodash.debounce'

export class AppUserForm extends withAudit(Component) {

  static propTypes = {
    fields                 : PropTypes.array.isRequired,
    registrationFormError  : PropTypes.object,
    registrationFormResult : PropTypes.shape({
      email            : PropTypes.string,
      username         : PropTypes.string,
      password         : PropTypes.string,
      firstAndLastName : PropTypes.string
    })
  }

  onChange = ( event, field) => [
    event.persist(),
    debounce(() =>
      this.props.changeRegistrationForm({
        ...this.props.registrationFormResult,
        [field] : event.target.value
      }))()
  ]

  fieldTemplates = {

    username : (
      <FormGroup key="AppUserFormUsername">
        <Label for="username">Username</Label>
        <Input
          onChange={ event => this.onChange(event, 'username') }
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
          onChange={ event => this.onChange(event, 'firstAndLastName') }
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
          onChange={ event => this.onChange(event, 'email') }
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
          onChange={ event => this.onChange(event, 'password') }
          type="password"
          name="password"
          id="password"
          placeholder="&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;"
          required />
      </FormGroup>
    )

  }

  getFields = fields => {
    const fieldKeys = Object
      .keys(this.fieldTemplates)
      .filter(field =>
        fields.includes(field))
    return fieldKeys.map((fieldKey, i) => this.fieldTemplates[fieldKey])
  }

  render() {
    const { registrationFormError: { message }, fields, onSubmit } = this.props
    const
      error = message && ( <AppAlert error={ message } /> ),
      formFields = this.getFields(fields)

    return (

      <Form onSubmit={ onSubmit }>

        { error }

        { formFields }

        <Button>Submit</Button>

      </Form>
    )

  }

}

export default AppUserForm
