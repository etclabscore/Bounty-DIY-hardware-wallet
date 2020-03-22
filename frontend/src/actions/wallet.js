import rpc from 'utils/xhr';
import cache from 'utils/cache';
import { ACTION_TYPE_UPDATE_WALLET } from 'config';

export function addAccount() {
  return async(dispatch, getState) => {
    const {
      wallet: { accounts, passphrase, wallet },
    } = getState();
    const account = await rpc('getAccountFromMnemonic', {
      uuid: wallet,
      passphrase,
      index: accounts.length,
    });
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
  };
}

export function login(wallet, passphrase) {
  return async(dispatch, getState) => {
    const account = await rpc('getAccountFromMnemonic', {
      uuid: wallet,
      passphrase,
      index: 0,
    });
    const accounts = [account];

    cache('wallet', wallet);
    cache('account', account);
    cache('passphrase', passphrase);
    cache('accounts', accounts);

    dispatch({
      type: ACTION_TYPE_UPDATE_WALLET,
      payload: {
        account,
        wallet,
        passphrase,
        accounts,
      },
    });
  };
}

// store.dispatch(login('aebe0eaf-8cdb-4f0f-9e82-d0a52412d264', 'passphrase8'));
window.login = login;
