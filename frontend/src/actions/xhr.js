import NProgress from 'nprogress';
import { rpcClientSelector } from 'selectors/xhr';
// import { ERR_UNKNOWN } from '@open-rpc/client-js';
import { history } from 'store';
import sl from 'utils/sl';

export function rpc(method, ...payload) {
  return async(dispatch, getState) => {
    NProgress.start();
    NProgress.set(0.4);

    const state = getState();
    const client = rpcClientSelector(state);

    try {
      const result = await client.request(method, payload);
      if (result.error) {
        showError(result.error);
        throw result.error;
      }
      return result;
    } catch (e) {
      // if (e.code === ERR_UNKNOWN) {
      if (e.message === 'Failed to fetch') {
        sl(
          'error',
          `Could not connect to server at ${state.wallet.signatoryServerUrl}. Configure settings?`,
          'Connection Error',
          () => history.push(`/settings?back-to=${window.location.pathname}`),
          {
            showCancelButton: true,
          }
        );
      } else {
        showError(e);
      }
      throw e;
    } finally {
      NProgress.done();
    }
  };
}

function showError(e) {
  sl('error', e.message);
}
