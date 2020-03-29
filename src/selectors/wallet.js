import { createSelector } from 'reselect';
import Web3 from 'web3';
import { CHAINS } from 'config';

export const web3Selector = createSelector(
  state => state.wallet.chainId,
  state => state.wallet.networkId,
  (chainId, networkId) => {
    return new Web3(
      new Web3.providers.HttpProvider(
        CHAINS[chainId].networks[networkId].providerUrl
      )
    );
  }
);
