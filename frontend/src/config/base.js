export const APP_SLUG = 'shw';
export const SECONDARY_COLOR = '#19a79a';
export const DANGER_COLOR = SECONDARY_COLOR;

export const { REACT_APP_IS_DEV: IS_DEV } = process.env;
export const { REACT_APP_INFURA_API_KEY: INFURA_API_KEY } = process.env;

export const LOGIC_TYPES_KEYFILE = 'LOGIC_TYPES_KEYFILE';
export const LOGIC_TYPES_MNEMONIC = 'LOGIC_TYPES_MNEMONIC';

export const ETH_CHAIN = 1;
export const ETC_CHAIN = 61;
export const CHAINS = {
  [ETH_CHAIN]: {
    name: 'Ethereum',
    networks: {
      3: 'ropsten',
      42: 'kovan',
      4: 'rinkeby',
      5: 'goerli',
      1: 'mainnet',
    },
  },
  [ETC_CHAIN]: {
    name: 'Ethereum Classic',
    networks: { 1: 'mainnet' },
  },
};

export const DEFAULT_SIGNATORY_SERVER_URL = `${window.location.protocol}//${window.location.hostname}:1999`;
export const DEFAULT_CHAIN_ID = ETH_CHAIN;
export const DEFAULT_NETWORK_ID = 1;
