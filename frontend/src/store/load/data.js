import cache from 'utils/cache';

export default Base =>
  class extends Base {
    async loadData() {
      try {
        const wallet = cache('wallet');
        const passphrase = cache('passphrase');
        const accounts = cache('accounts') || [];
        const account = cache('account');

        this.state.wallet.wallet = wallet;
        this.state.wallet.account = account;
        this.state.wallet.passphrase = passphrase || cache('passphrase');
        this.state.wallet.accounts = accounts;
      } catch (error) {
        console.log(error);
      }
    }
  };
