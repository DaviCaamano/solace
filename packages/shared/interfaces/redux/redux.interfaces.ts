import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
} from '@reduxjs/toolkit/dist/query/react';
import {
  UseQuery,
  UseMutation,
  UseLazyQuery,
} from '@reduxjs/toolkit/src/query/react/buildHooks';
import { QueryDefinition } from '@reduxjs/toolkit/query';

/** Redux Query Hook response status */
export enum ReduxStatus {
  uninitialized = 'uninitialized',
  pending = 'pending',
  fulfilled = 'fulfilled',
}

/** List of all Tags used by Redux Query */
export const tagTypes = ['Note', 'User'] as const;
export type TagTypes = (typeof tagTypes)[number];

/** Redux Query Endpoint Builder */
export type ReduxQueryBuilder<Tags extends TagTypes = TagTypes> =
  EndpointBuilder<
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      {},
      FetchBaseQueryMeta
    >,
    Tags,
    'api'
  >;

/** Redux Query Hook Definitions
 * Redux does not type well with Intellij IDE's
 * The following are manually typed Hooks for the purposes of inferred typing
 */
interface FetchResponse<T> extends Response {
  data: T;
}
export type UseQueryHook<
  Argument, //Argument for Query
  EndpointResponse, //Endpoint Response Data
  Tags extends string | TagTypes, //tags
  ReduxReducerPath extends string = 'api',
> = UseQuery<
  QueryDefinition<
    Argument,
    BaseQueryFn<Argument, FetchResponse<EndpointResponse>>,
    Tags,
    EndpointResponse,
    ReduxReducerPath
  >
>;

export type UseMutationHook<
  Argument, //Argument for Query
  EndpointResponse, //Endpoint Response Data
  Tags extends string | TagTypes, //tags
  ReduxReducerPath extends string = 'api',
> = UseMutation<
  MutationDefinition<
    Argument,
    BaseQueryFn<Argument, FetchResponse<EndpointResponse>>,
    Tags,
    EndpointResponse,
    ReduxReducerPath
  >
>;

export type UseLazyQueryHook<
  Argument, //Argument for Query
  EndpointResponse, //Endpoint Response Data
  Tags extends string | TagTypes, //tags
  ReduxReducerPath extends string = 'api',
> = UseLazyQuery<
  QueryDefinition<
    Argument,
    BaseQueryFn<Argument, FetchResponse<EndpointResponse>>,
    Tags,
    EndpointResponse,
    ReduxReducerPath
  >
>;
