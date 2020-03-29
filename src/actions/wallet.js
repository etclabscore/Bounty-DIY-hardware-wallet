import Promise from 'bluebird';
import filePicker from 'component-file-picker';
import cache from 'utils/cache';
import {
  ACTION_TYPE_UPDATE_WALLET,
  LOGIC_TYPES_KEYFILE,
  LOGIC_TYPES_MNEMONIC,
} from 'config';
import { history } from 'store';
import { rpc } from './xhr';

export function updateWallet(payload) {
  return { type: ACTION_TYPE_UPDATE_WALLET, payload };
}

export function addAccount() {
  return async(dispatch, getState) => {
    const {
      wallet: { accounts, passphrase, wallet },
    } = getState();
    const account = await dispatch(
      rpc('getAccountFromMnemonic', {
        uuid: wallet,
        passphrase,
        index: accounts.length,
      })
    );
    dispatch({
      type: ACTION_TYPE_UPDATE_WALLET,
      payload: { accounts: accounts.concat(account) },
    });
    dispatch(chooseAccount(account));
  };
}

export function chooseAccount(account) {
  return async(dispatch, getState) => {
    dispatch({ type: ACTION_TYPE_UPDATE_WALLET, payload: { account } });
    const {
      wallet: { accounts },
    } = getState();
    cache('account', account);
    cache('accounts', accounts);
  };
}

export function logout() {
  return async(dispatch, getState) => {
    ['wallet', 'passphrase', 'accounts', 'account'].forEach(k =>
      cache(k, null)
    );
    dispatch({
      type: ACTION_TYPE_UPDATE_WALLET,
      payload: {
        account: null,
        wallet: null,
        passphrase: null,
        accounts: [],
      },
    });
    history.push('/');
  };
}

export function importMnemonic(mnemonic, passphrase, hdPath) {
  return async(dispatch, getState) => {
    const wallet = await dispatch(
      rpc('importMnemonic', {
        name: 'Default',
        passphrase,
        mnemonic,
        hdPath,
      })
    );

    const account = await dispatch(
      rpc('getAccountFromMnemonic', {
        uuid: wallet,
        passphrase,
        index: 0,
      })
    );
    const accounts = [account];

    cache('login_type', LOGIC_TYPES_MNEMONIC);
    cache('wallet', wallet);
    cache('account', account);
    cache('passphrase', passphrase);
    cache('accounts', accounts);

    dispatch({
      type: ACTION_TYPE_UPDATE_WALLET,
      payload: {
        type: LOGIC_TYPES_MNEMONIC,
        account,
        wallet,
        passphrase,
        accounts,
      },
    });
  };
}

export function importKeystorage(keyfile, passphrase) {
  return async(dispatch, getState) => {
    const account = await dispatch(rpc('importKeyfile', passphrase, keyfile));
    const accounts = [account];

    cache('login_type', LOGIC_TYPES_KEYFILE);
    cache('wallet', null);
    cache('account', account);
    cache('passphrase', passphrase);
    cache('accounts', accounts);

    dispatch({
      type: ACTION_TYPE_UPDATE_WALLET,
      payload: {
        type: LOGIC_TYPES_KEYFILE,
        account,
        wallet: null,
        passphrase,
        accounts,
      },
    });
  };
}

export function importKeyfile() {
  return (dispatch, getState) => {
    return new Promise(resolve => {
      filePicker(([file]) => {
        const reader = new FileReader();
        reader.onload = function() {
          resolve({ name: file.name, data: JSON.parse(reader.result) });
        };
        reader.readAsText(file);
      });
    });
  };
}
