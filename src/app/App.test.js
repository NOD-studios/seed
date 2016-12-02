import 'react-dom';
import nock from 'nock';
import React, { Component } from 'react';
import configureMockStore from 'redux-mock-store';
import ReactTestRenderer from 'react-test-renderer';
import { createEpicMiddleware } from 'redux-observable';
import {
  router,
  fetchIp,
  fetchIpReject,
  fetchIpResolve,
  fetchIpCancelled,
  postForm,
  postFormReject,
  postFormResolve,
  postFormCancelled,
  rootEpic,
  fetchIpEpic,
  postFormEpic
} from '../index';

describe('app', () => {

  describe('App', () => {

    let tree;

    it('can render', () => {
      tree = ReactTestRenderer.create(router());
    });

    it('matches snapshot', () => {
      expect(tree).toMatchSnapshot();
    });

  });

  describe('epics', () => {

    const
      logIfCouldNotNock = log => log.match(': false') ? console.warn(log) : () => {},
      epicMiddleware = createEpicMiddleware(rootEpic),
      mockStore = configureMockStore([epicMiddleware]),
      endpoint = nock('https://httpbin.org')
        .log(logIfCouldNotNock);

    let store;

    describe('fetchIpEpic', () => {

      const
        data = { origin : '127.0.0.1' },
        fetchIpAction = fetchIp();

      afterAll(() => {
        if (!endpoint.isDone()) {
          console.error('pending mocks: %j', endpoint.pendingMocks());
        }
      });

      beforeEach(() => {
        store = mockStore();
      });

      afterEach(() => {
        nock.cleanAll();
        epicMiddleware.replaceEpic(fetchIpEpic);
      });

      it('fetching ip', () => {
        endpoint
          .get('/ip')
          .reply(200, data);

        store.dispatch(fetchIpAction);


        expect(store.getActions()).toEqual([fetchIpAction]);
      });

      it('fetching ip resolved', () => {

        endpoint
          .get('/ip')
          .reply(200, data);

        const action = fetchIpResolve(data);

        store.dispatch(fetchIpAction);
        store.dispatch(action);

        expect(store.getActions()).toEqual([fetchIpAction, action]);
      });

      it('fetching ip cancelled', () => {

        endpoint
          .get('/ip')
          .reply(200, data);

        const action = fetchIpCancelled();

        store.dispatch(fetchIpAction);
        store.dispatch(action);

        expect(store.getActions()).toEqual([fetchIpAction, action]);
      });

      it('fetching ip rejected', () => {

        const error = new Error('testing');

        endpoint
          .get('/ip')
          .reply(404, error);

        const action = fetchIpReject(error);
        store.dispatch(fetchIpAction);
        store.dispatch(action);

        expect(store.getActions()).toEqual([fetchIpAction, action]);
      });

    });

    describe('postFormEpic', () => {

      const
        data = {
          username : 'test',
          password : 'test'
        },
        postFormAction = postForm(data);

      afterAll(() => {
        if (!endpoint.isDone()) {
          console.error('pending mocks: %j', endpoint.pendingMocks());
        }
      });

      beforeEach(() => {
        store = mockStore();
      });

      afterEach(() => {
        nock.cleanAll();
        epicMiddleware.replaceEpic(postFormEpic);
      });

      it('posting form', () => {

        endpoint
          .post('/post', JSON.stringify(data))
          .reply(201, {
            json : data
          });

        store.dispatch(postFormAction);
        expect(store.getActions()).toEqual([postFormAction]);
      });

      it('posting form resolved', () => {
        const action = postFormResolve(data, false);

        store.dispatch(postFormAction);
        store.dispatch(action);

        expect(store.getActions()).toEqual([postFormAction, action]);
      });

      it('posting form cancelled', () => {

        const action = postFormCancelled();

        store.dispatch(postFormAction);
        store.dispatch(action);

        expect(store.getActions()).toEqual([postFormAction, action]);
      });

      it('posting form rejected', () => {

        const error = new Error('testing');

        const action = postFormReject(error, false);
        store.dispatch(postFormAction);
        store.dispatch(action);

        expect(store.getActions()).toEqual([postFormAction, action]);
      });

    });

  });

});
