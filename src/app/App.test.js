import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { router, fetchIp, fetchIpSaga, Api, fetchResolve } from '../index';
import { call, put } from 'redux-saga/effects';
import ReactTestRenderer from 'react-test-renderer';

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

  let
    api = new Api(),
    data = {
      ip : '127.0.0.1'
    },
    fetching = false,
    state = { data, fetching },
    getState = () => state;

  describe('sagas', () => {

    describe('fetchIp', () => {

      let generator = fetchIpSaga(getState);
      let next;

      it('yield Api.fetchIp', () => {
        next = generator.next(fetchIp());
        data = call([api, api.fetchIp]);
        expect(next.value).toEqual(data);
      });

      it('yield fetchResolve action', () => {
        next = generator.next(data);

        expect(next.value).toEqual(put(fetchResolve(data, fetching)));
      });

    })

  });

});
