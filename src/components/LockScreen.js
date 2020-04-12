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

function Component({ show, updateWallet, logout }) {
  const classes = useStyles();
  const [passphrase, setPassphrase] = React.useState('');

  const handleLogOut = () => {
    logout();
  };

  const handleSubmit = async () => {
    updateWallet({ passphrase });
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
            label="Passphrase"
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

export default connect(({ wallet: { account, passphrase } }) => {
  return {
    show: account && _.isNil(passphrase),
  };
}, mapDispatchToProps)(Component);
