import { createSelector } from 'reselect';
import { RequestManager, HTTPTransport, Client } from '@open-rpc/client-js';

export const rpcClientSelector = createSelector(
  state => state.wallet.signatoryServerUrl,
  url => {
    const transport = new HTTPTransport(url);
    return new Client(new RequestManager([transport]));
  }
);
