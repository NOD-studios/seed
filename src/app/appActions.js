import {
  CHANGE_REGISTRATION_FORM,

  POST_REGISTRATION_FORM,
  POST_REGISTRATION_FORM_CANCELED,
  POST_REGISTRATION_FORM_RESOLVED,
  POST_REGISTRATION_FORM_REJECTED,

  FETCH_IP,
  FETCH_IP_CANCELED,
  FETCH_IP_RESOLVED,
  FETCH_IP_REJECTED,

} from '../index'
import { push } from 'react-router-redux'

export const

  redirect = location => push(location),

  changeRegistrationForm = registrationFormResult => ({
    registrationFormResult,
    type : CHANGE_REGISTRATION_FORM
  }),

  postRegistrationForm = registrationFormResult => ({
    registrationFormResult,
    type                    : POST_REGISTRATION_FORM,
    postingRegistrationForm : true,
  }),

  cancelPostingOfRegistrationForm = () => ({
    type                    : POST_REGISTRATION_FORM_CANCELED,
    postingRegistrationForm : false
  }),

  resolvePostingOfRegistrationForm = registrationFormResult => ({
    registrationFormResult,
    type                    : POST_REGISTRATION_FORM_RESOLVED,
    postingRegistrationForm : false
  }),

  rejectPostingOfRegistrationForm = registrationFormError => ({
    registrationFormError,
    postingRegistrationForm : false,
    type                    : POST_REGISTRATION_FORM_REJECTED,
  }),

  fetchIp = () => ({ type : FETCH_IP, fetchingIp : true }),

  cancelFetchingOfIp = () => ({ type : FETCH_IP_CANCELED, fetchingIp : false }),

  rejectFetchingOfIp = fetchingIpError => ({
    fetchingIpError,
    type       : FETCH_IP_REJECTED,
    fetchingIp : false
  }),

  resolveFetchingOfIp = fetchingIpResult => ({
    fetchingIpResult,
    fetchingIp : false,
    type       : FETCH_IP_RESOLVED
  })
