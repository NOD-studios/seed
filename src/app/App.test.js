/* eslint-disable
no-console,
no-unused-vars,
fp/no-let,
fp/no-ifs,
fp/no-nil,
fp/no-mutation,
fp/no-unused-expression,
better/explicit-return,
better/no-ifs */

import 'react-dom'
import nock from 'nock'
import React, { Component } from 'react'
import configureMockStore from 'redux-mock-store'
import ReactTestRenderer from 'react-test-renderer'
import { createEpicMiddleware } from 'redux-observable'
import {
  router,
  fetchIp,
  rejectFetchingOfIp,
  resolveFetchingOfIp,
  cancelFetchingOfIp,
  postRegistrationForm,
  rejectPostingOfRegistrationForm,
  resolvePostingOfRegistrationForm,
  cancelPostingOfRegistrationForm,
  rootEpic,
  fetchIpEpic,
  postRegistrationFormEpic
} from '../index'

describe('app', () => {

  //TODO: enable this again
  // describe('App', () => {
  //
  //   let tree
  //
  //   it('can render', () => {
  //     tree = ReactTestRenderer.create(router())
  //   })
  //
  //
  //   it('matches snapshot', () => {
  //     expect(tree).toMatchSnapshot()
  //   })
  //
  // })

  describe('epics', () => {

    const
      logIfCouldNotNock = log => log.match(': false') ? console.warn(log) : () => {},
      epicMiddleware = createEpicMiddleware(rootEpic),
      mockStore = configureMockStore([ epicMiddleware ]),
      endpoint = nock('https://httpbin.org')
        .log(logIfCouldNotNock)

    let store

    describe('fetchIpEpic', () => {

      const
        data = { origin : '127.0.0.1' },
        fetchIpAction = fetchIp()

      afterAll(() => {
        if (!endpoint.isDone())
          console.error('pending mocks: %j', endpoint.pendingMocks())

      })

      beforeEach(() => {
        store = mockStore()
      })

      afterEach(() => {
        nock.cleanAll()
        epicMiddleware.replaceEpic(fetchIpEpic)
      })

      it('fetching ip', () => {
        endpoint
          .get('/ip')
          .reply(200, data)

        store.dispatch(fetchIpAction)


        expect(store.getActions()).toEqual([ fetchIpAction ])
      })

      it('fetching ip resolved', () => {

        endpoint
          .get('/ip')
          .reply(200, data)

        const action = resolveFetchingOfIp(data)

        store.dispatch(fetchIpAction)
        store.dispatch(action)

        expect(store.getActions()).toEqual([ fetchIpAction, action ])
      })

      it('fetching of ip canceled', () => {

        endpoint
          .get('/ip')
          .reply(200, data)

        const action = cancelFetchingOfIp()

        store.dispatch(fetchIpAction)
        store.dispatch(action)

        expect(store.getActions()).toEqual([ fetchIpAction, action ])
      })

      it('fetching ip rejected', () => {

        const error = new Error('testing')

        endpoint
          .get('/ip')
          .reply(404, error)

        const action = rejectFetchingOfIp(error)
        store.dispatch(fetchIpAction)
        store.dispatch(action)

        expect(store.getActions()).toEqual([ fetchIpAction, action ])
      })

    })

    describe('postRegistrationFormEpic', () => {

      const
        data = {
          username : 'test',
          password : 'test'
        },
        postRegistrationFormAction = postRegistrationForm(data)

      afterAll(() => {
        if (!endpoint.isDone())
          console.error('pending mocks: %j', endpoint.pendingMocks())

      })

      beforeEach(() => {
        store = mockStore()
      })

      afterEach(() => {
        nock.cleanAll()
        epicMiddleware.replaceEpic(postRegistrationFormEpic)
      })

      it('posting form', () => {

        endpoint
          .post('/post', JSON.stringify(data))
          .reply(201, {
            json : data
          })

        store.dispatch(postRegistrationFormAction)
        expect(store.getActions()).toEqual([ postRegistrationFormAction ])
      })

      it('posting form resolved', () => {
        const action = resolvePostingOfRegistrationForm(data, false)

        store.dispatch(postRegistrationFormAction)
        store.dispatch(action)

        expect(store.getActions()).toEqual([ postRegistrationFormAction, action ])
      })

      it('posting form canceled', () => {

        const action = cancelPostingOfRegistrationForm()

        store.dispatch(postRegistrationFormAction)
        store.dispatch(action)

        expect(store.getActions()).toEqual([ postRegistrationFormAction, action ])
      })

      it('posting form rejected', () => {

        const error = new Error('testing')

        const action = rejectPostingOfRegistrationForm(error, false)
        store.dispatch(postRegistrationFormAction)
        store.dispatch(action)

        expect(store.getActions()).toEqual([ postRegistrationFormAction, action ])
      })

    })

  })

})
