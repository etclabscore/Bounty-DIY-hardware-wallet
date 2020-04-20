import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { stringToHex, numberToHex } from '@etclabscore/eserialize';
import sl from 'utils/sl';
import cache from 'utils/cache';
import { web3Selector } from 'selectors/wallet';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiBackdrop-root': {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  },
  button: {
    width: 130,
    margin: '0 5px;',
  },
}));

function Component({ show, account, updateWallet, logout, rpc, web3 }) {
  const classes = useStyles();
  const [passphrase, setPassphrase] = React.useState('');

  const handleLogOut = () => {
    logout();
  };

  const handleSubmit = async () => {
    try {
      // try sign a message with the pass
      await rpc(
        'sign',
        stringToHex(Date.now().toString()),
        account,
        passphrase,
        numberToHex(await web3.eth.getChainId())
      );
      // save pass and login
      cache('passphrase', passphrase);
      updateWallet({ passphrase });
    } catch (e) {
      console.log(e.message);
      sl('error', 'Wrong password');
    }
  };

  return (
    <Dialog
      open={show}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      className={classes.root}
      fullWidth
    >
      <DialogTitle id="dialog-title">Session Timed Out</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">
          You can configure your session timeout in the settings page...
        </DialogContentText>
        <div className="flex flex--justify-center" style={{ marginBottom: 20 }}>
          <TextField
            id="amount"
            label="Password"
            type="password"
            InputLabelProps={{
              shrink: true,
            }}
            value={passphrase}
            onChange={e => setPassphrase(e.target.value)}
            fullWidth
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="default" onClick={handleLogOut}>
          Logout
        </Button>
        <Button color="secondary" onClick={handleSubmit}>
          Unlock
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default connect(state => {
  const {
    wallet: { account, passphrase },
  } = state;
  return {
    account,
    show: Boolean(account && _.isNil(passphrase)),
    web3: web3Selector(state),
  };
}, mapDispatchToProps)(Component);
