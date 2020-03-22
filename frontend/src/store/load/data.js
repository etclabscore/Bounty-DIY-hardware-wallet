import cache from 'utils/cache';
import rpc from 'utils/xhr';

export default Base =>
  class extends Base {
    async loadData() {
      try {
        const wallet = cache('wallet') || process.env.REACT_APP_WALLET;
        const currentAccountIndex =
          cache('current_account_index') ||
          parseInt(process.env.REACT_APP_CURRENT_ACCOUNT_INDEX) ||
          1;
        const passphrase =
          cache('passphrase') || process.env.REACT_APP_PASSPHRASE;
        const noOfAccounts = cache('no_of_accounts') || 1;
        const accounts = cache('accounts') || [];

        let account;

        if (!accounts.length && wallet) {
          for (let i = 0; i < noOfAccounts; i++) {
            const a = await rpc('getAccountFromMnemonic', {
              uuid: wallet,
              passphrase,
              index: i,
            });
            if (currentAccountIndex === i) {
              account = a;
            }
            accounts.push(a);
          }
          cache('accounts', accounts);
        } else {
          account = accounts[currentAccountIndex];
        }

        this.state.wallet.wallet = wallet;
        this.state.wallet.account = account;
        this.state.wallet.passphrase = passphrase || cache('passphrase');
        this.state.wallet.accounts = accounts;
      } catch (error) {
        console.log(error);
      }
    }
  };
