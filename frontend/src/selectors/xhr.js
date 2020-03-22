import { createSelector } from 'reselect';
const {
  RequestManager,
  HTTPTransport,
  Client,
} = require('@open-rpc/client-js');

export const rpcClient = createSelector(
  state => state.wallet.signatoryServerUrl,
  url => {
    const transport = new HTTPTransport(url);
    return new Client(new RequestManager([transport]));
  }
);
