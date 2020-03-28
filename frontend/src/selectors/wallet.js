import { createSelector } from 'reselect';
import Web3 from 'web3';
import { ETH_CHAIN, ETC_CHAIN, CHAINS, INFURA_API_KEY } from 'config';

export const web3Selector = createSelector(
  state => state.wallet.chainId,
  state => state.wallet.networkId,
  (chainId, networkId) => {
    switch (chainId) {
      case ETH_CHAIN: {
        return new Web3(
          new Web3.providers.HttpProvider(
            `https://${CHAINS[chainId].networks[networkId]}.infura.io/v3/${INFURA_API_KEY}`
          )
        );
      }
      case ETC_CHAIN: {
        return null;
      }

      default:
        console.error('unsupported chain(%s) network(%s)', chainId, networkId);
    }
  }
);
