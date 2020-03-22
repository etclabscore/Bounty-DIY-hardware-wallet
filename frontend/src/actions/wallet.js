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
    cache('current_account_index', accounts.indexOf(account));
    cache('no_of_accounts', accounts.length);
  };
}
