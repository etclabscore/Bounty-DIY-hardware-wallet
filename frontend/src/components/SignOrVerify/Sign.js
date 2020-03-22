import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Paper } from '@material-ui/core';
import { stringToHex, numberToHex } from '@etclabscore/eserialize';
import { rpc } from 'utils/xhr';
import sl from 'utils/sl';

const useStyles = makeStyles(theme => ({
  messageSignature: {
    marginTop: 50,
    padding: 20,
  },
}));

const Component = ({ account, passphrase }) => {
  const classes = useStyles();
  const [messageSignature, setMessageSignature] = React.useState(null);

  const onSubmit = async e => {
    e.preventDefault();

    setMessageSignature(null);

    const message = (e.target.message.value ?? '').trim();
    if (!message) return sl('error', 'Please enter a message...');

    const chainId = 6;
    const messageHex = stringToHex(message);

    setMessageSignature(
      await rpc('sign', messageHex, account, passphrase, numberToHex(chainId))
    );
  };

  return (
    <form {...{ onSubmit }} className="flex flex--column">
      <TextField
        id="message"
        label="Message"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        placeholder={'Enter message...'}
        fullWidth
        multiline
        rows="2"
      />

      <Button type="submit" color="secondary">
        Sign
      </Button>

      {!messageSignature ? null : (
        <Paper elevation={0} className={classes.messageSignature}>
          {messageSignature}
        </Paper>
      )}
    </form>
  );
};

export default connect(({ wallet: { account, passphrase } }, { match }) => {
  return { account, passphrase };
}, mapDispatchToProps)(Component);
