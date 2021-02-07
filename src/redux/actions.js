import { LOADSHOWSLIST, LOADCURRENTSHOW, SORTSHOWS } from './action-types';

export const loadShowsList = (payload) => ({
  type: LOADSHOWSLIST,
  payload,
});

export const loadCurrentShow = (payload) => ({
  type: LOADCURRENTSHOW,
  payload,
});

export const sortShows = (payload) => ({
  type: SORTSHOWS,
  payload,
});