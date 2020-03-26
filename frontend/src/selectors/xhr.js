import { createSelector } from 'reselect';
import { RequestManager, HTTPTransport, Client } from '@open-rpc/client-js';

export const rpcClient = createSelector(
  state => state.wallet.signatoryServerUrl,
  url => {
    const transport = new HTTPTransport(url);
    return new Client(new RequestManager([transport]));
  }
);
