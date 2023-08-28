import { createSelector } from '@reduxjs/toolkit';
import { loginEndpoint } from '@context/redux/user';
import { apiSlice } from '@context/redux/api';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder: ReduxEndpoint) => ({
    login: loginEndpoint(builder),
  }),
});

export const { useGetUserQuery, useLoginMutation } = userSlice;

/** memoized selectors */
export const selectUserResult = userSlice.endpoints.login.select();

const selectUserData = createSelector(
  selectUserResult,
  (postsResult) => postsResult.data, // normalized state object with ids & entities
);
