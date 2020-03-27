import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import * as ethUtil from 'ethereumjs-util';
import { stringToHex } from '@etclabscore/eserialize';
import sl from 'utils/sl';

const useStyles = makeStyles(theme => ({
  result: {
    padding: 20,
  },
  row: {
    marginBottom: 20,
  },
}));

export const recoverPublicKeyFromSig = (msg, sig, chainId) => {
  const sigParams = ethUtil.fromRpcSig(sig);
  const msgHash = ethUtil.hashPersonalMessage(Buffer.from(stringToHex(msg)));
  const pubKey = ethUtil.ecrecover(
    msgHash,
    sigParams.v,
    sigParams.r,
    sigParams.s,
    chainId
  );
  return '0x' + ethUtil.publicToAddress(pubKey).toString('hex');
};

const Component = ({ account, passphrase, chainId }) => {
  const classes = useStyles();

  const onSubmit = async e => {
    e.preventDefault();

    const payload = {};
    ['address', 'message', 'signature'].forEach(k => {
      const val = (payload[k] = (e.target[k].value ?? '').trim());
      if (!val) return sl('error', `Please enter a ${val}...`);
    });

    try {
      const verifiedAddress = recoverPublicKeyFromSig(
        payload.message,
        payload.signature,
        chainId
      );
      sl(
        verifiedAddress.toLowerCase() === payload.address.toLowerCase()
          ? 'success'
          : 'error',
        `${verifiedAddress} signed the message!`
      );
    } catch (e) {
      sl('error', e.message);
    }
  };

  return (
    <form {...{ onSubmit }} className="flex flex--column">
      <div className={classes.row}>
        <TextField
          id="address"
          label="Address"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="0xf8d8af52db..."
          defaultValue={account}
          fullWidth
          required
        />
      </div>
      <div className={classes.row}>
        <TextField
          id="message"
          label="Message"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={'My message...'}
          fullWidth
          required
        />
      </div>
      <div className={classes.row}>
        <TextField
          id="signature"
          label="Signature"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={'0x391e8352aa0c87283039fd1dddce0bf9...'}
          fullWidth
          required
        />
      </div>

      <div className={classes.row}>
        <Button type="submit" variant="contained" color="secondary">
          Verify
        </Button>
      </div>
    </form>
  );
};

export default connect(
  ({ wallet: { account, passphrase, chainId } }, { match }) => {
    return { account, passphrase, chainId };
  },
  mapDispatchToProps
)(Component);
