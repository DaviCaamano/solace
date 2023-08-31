import { Dispatch, SetStateAction } from 'react';
import {
  Action,
  EndpointBuilder,
  Reducer as ReduxReducer,
} from '@reduxjs/toolkit';
import { BaseQueryFn } from '@reduxjs/toolkit/src/query/baseQueryTypes';

type TagTypes = string;
type ReducerPath = string;
type Endpoint = EndpointBuilder<BaseQueryFn, TagTypes, ReducerPath>;

declare global {
  /** State Setter for React and React like components */
  interface Setter<T> extends Dispatch<SetStateAction<T>> {}

  /** fetch */
  interface FetchResponse<T> extends Response {
    data: T;
  }

  /* Redux Endpoint for API Service */
  type TagTypes = string;
  type ReducerPath = string;
  type ReduxEndpoint = EndpointBuilder<BaseQueryFn, TagTypes, ReducerPath>;
  interface PreparedAction<T> {
    payload: T;
    meta?: any;
    error?: any;
  }

  type Tailwind = Record<string, string>;
}
