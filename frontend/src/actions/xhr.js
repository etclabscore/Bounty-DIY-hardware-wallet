import NProgress from 'nprogress';
import { rpcClient } from 'selectors/xhr';

class RPCError extends Error {
  constructor({ code, data, message }) {
    super(JSON.stringify(data, null, 2));
    this.name = 'RPCError';
    this.code = code;
    this.data = data;
  }
}

export function rpc(method, ...payload) {
  return async(dispatch, getState) => {
    NProgress.start();
    NProgress.set(0.4);

    const client = rpcClient(getState());

    try {
      const result = await client.request(method, payload);
      if (result.error) {
        throw new RPCError(result.error);
      }
      return result;
    } finally {
      NProgress.done();
    }
  };
}
