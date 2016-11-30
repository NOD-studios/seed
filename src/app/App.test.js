import 'react-dom';
import nock from 'nock';
import React, { Component } from 'react';
import configureMockStore from 'redux-mock-store';
import ReactTestRenderer from 'react-test-renderer';
import { createEpicMiddleware } from 'redux-observable';
import {
  router,
  fetchIp,
  fetchReject,
  fetchResolve,
  fetchIpCancelled,
  rootEpic,
  fetchIpEpic
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
      epicMiddleware = createEpicMiddleware(rootEpic),
      mockStore = configureMockStore([epicMiddleware]);

    let store;

    beforeEach(() => {
      store = mockStore();
    });

    describe('fetchIpEpic', () => {

      const
        data = { origin : '127.0.0.1' },
        fetchAction = fetchIp();

      nock('https://httpbin.org/')
        .get('/ip')
        .reply(200, data);

      afterEach(() => {
        nock.cleanAll();
        epicMiddleware.replaceEpic(fetchIpEpic);
      });

      it('fetching ip', () => {
        store.dispatch(fetchAction);

        expect(store.getActions()).toEqual([fetchAction]);
      });

      it('fetching ip resolved', () => {
        const action = fetchResolve(data, false);
        store.dispatch(fetchAction);
        store.dispatch(action);

        expect(store.getActions()).toEqual([fetchAction, action]);
      });

      it('fetching ip cancelled', () => {

        const action = fetchIpCancelled();

        store.dispatch(fetchAction);
        store.dispatch(action);

        expect(store.getActions()).toEqual([fetchAction, action]);
      });

      it('fetching ip rejected', () => {

        const error = new Error('testing');

        nock('https://httpbin.org/')
          .get('/ip')
          .reply(404, error);

        const action = fetchReject(error, false);
        store.dispatch(fetchAction);
        store.dispatch(action);

        expect(store.getActions()).toEqual([fetchAction, action]);
      });

    });

  });

});
