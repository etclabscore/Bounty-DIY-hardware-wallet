import NProgress from 'nprogress';
const {
  RequestManager,
  HTTPTransport,
  Client,
} = require('@open-rpc/client-js');
const transport = new HTTPTransport('http://localhost:1999');
const client = new Client(new RequestManager([transport]));

class RPCError extends Error {
  constructor({ code, data, message }) {
    super(JSON.stringify(data, null, 2));
    this.name = 'RPCError';
    this.code = code;
    this.data = data;
  }
}

export async function rpc(method, ...payload) {
  NProgress.start();
  NProgress.set(0.4);

  try {
    const result = await client.request(method, payload);
    if (result.error) {
      throw new RPCError(result.error);
    }
    return result;
  } finally {
    NProgress.done();
  }
}

export default rpc;
