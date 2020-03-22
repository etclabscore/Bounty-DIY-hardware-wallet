import { ACTION_TYPE_UPDATE_DATA } from 'config';

export function updateData(payload) {
  return {
    type: ACTION_TYPE_UPDATE_DATA,
    payload,
  };
}

export function loadStuff() {
  return async(dispatch, getState) => {
    try {
      await dispatch(
        console.log('x')
      );
    } catch (e) {
      console.warn(e);
    }
  };
}
