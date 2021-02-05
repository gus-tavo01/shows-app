import { LOADSHOWSLIST, LOADCURRENTSHOW } from './action-types';

export const loadShowsList = (payload) => ({
  type: LOADSHOWSLIST,
  payload,
});

export const loadCurrentShow = (payload) => ({
  type: LOADCURRENTSHOW,
  payload,
});