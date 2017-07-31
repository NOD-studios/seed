import {
  CHANGE_REGISTRATION_FORM,
  POST_REGISTRATION_FORM,
  POST_REGISTRATION_FORM_CANCELED,
  POST_REGISTRATION_FORM_RESOLVED,
  POST_REGISTRATION_FORM_REJECTED,

  FETCH_IP,
  FETCH_IP_CANCELED,
  FETCH_IP_RESOLVED,
  FETCH_IP_REJECTED
} from '../index'

export const appReducer = (state = {
  appError                : {},
  fetchingIpResult        : {},
  fetchingIp              : false,
  fetchingIpError         : {},
  registrationFormResult  : {},
  registrationFormError   : {},
  postingRegistrationForm : false,
  messages                : [],
  fetchingMessages        : false,
  fetchingMessagesError   : {},
  users                   : [],
  fetchingUsers           : false,
  fetchingUsersError      : {},
}, {
  type,
  fetchingIpError,
  fetchingIp,
  fetchingIpResult,
  registrationFormResult,
  registrationFormError,
  postingRegistrationForm,
  messages,
  fetchingMessages,
  fetchingMessagesError,
  users,
  fetchingUsers,
  fetchingUsersError
}) => ({
  [ CHANGE_REGISTRATION_FORM ] : { ...state, registrationFormResult },
  [ POST_REGISTRATION_FORM ]   : {
    ...state,
    registrationFormResult,
    postingRegistrationForm
  },
  [ POST_REGISTRATION_FORM_RESOLVED ] : {
    ...state,
    registrationFormResult,
    postingRegistrationForm
  },
  [ POST_REGISTRATION_FORM_REJECTED ] : {
    ...state,
    registrationFormError,
    postingRegistrationForm
  },
  [ POST_REGISTRATION_FORM_CANCELED ] : { ...state, postingRegistrationForm },
  [ FETCH_IP ]                        : { ...state, fetchingIp },
  [ FETCH_IP_RESOLVED ]               : { ...state, fetchingIp, fetchingIpResult },
  [ FETCH_IP_CANCELED ]               : { ...state, fetchingIp },
  [ FETCH_IP_REJECTED ]               : {
    ...state,
    fetchingIpError,
    fetchingIp
  }
})[ type ] || state

export default appReducer
