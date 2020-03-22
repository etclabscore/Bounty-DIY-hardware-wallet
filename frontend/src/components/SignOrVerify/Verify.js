import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import * as ethUtil from 'ethereumjs-util';
import sl from 'utils/sl';
import { IS_DEV } from 'config';

const SAMPLE = {
  // address: '0xf8d8af52db7ef1d7411cde0e2455b8e1409c9631',
  // message: 'ETC rules! 🥳🎉',
  // signature:
  //   '0x7ce588c2fdc381a15299db2b058a27759fd5aa344a4efb737868b72ac0e31f6958aed5fcdb72b8fba8eafb63d82dd6fa53ee69930e2bc73ce06bd185704068e92f',

  address: '0xf8d8af52db7ef1d7411cde0e2455b8e1409c9631',
  message: 'ETC rules! 🥳🎉',
  signature:
    '0x391e8352aa0c87283039fd1dddce0bf9262d0a311972716fc0a7a1e03b8802966fdd17bb586c64aa27febf2424122f66b2aa28f20fb71f8a2f961729144646251b',
};

const useStyles = makeStyles(theme => ({
  row: {
    marginBottom: 20,
  },
}));

const Component = ({ account, passphrase }) => {
  const classes = useStyles();

  const onSubmit = async e => {
    e.preventDefault();

    const payload = {};
    ['address', 'message', 'signature'].forEach(k => {
      const val = (payload[k] = (e.target[k].value ?? '').trim());
      if (!val) return sl('error', `Please enter a ${val}...`);
    });

    try {
      const msg = new Buffer(payload.message);
      const res = ethUtil.fromRpcSig(payload.signature);
      const prefix = new Buffer('\x19Ethereum Signed Message:\n');
      const prefixedMsg = ethUtil.keccak256(
        Buffer.concat([prefix, new Buffer(String(msg.length)), msg])
      );
      const pubKey = ethUtil.ecrecover(prefixedMsg, res.v, res.r, res.s);
      const addrBuf = ethUtil.pubToAddress(pubKey);
      const verifiedAddress = ethUtil.bufferToHex(addrBuf);

      sl(
        verifiedAddress !== payload.address ? 'error' : 'success',
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
          defaultValue={IS_DEV ? SAMPLE.address : ''}
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
          defaultValue={IS_DEV ? SAMPLE.message : ''}
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
          defaultValue={IS_DEV ? SAMPLE.signature : ''}
          fullWidth
          required
        />
      </div>

      <Button type="submit" color="secondary">
        Verify
      </Button>
    </form>
  );
};

export default connect(({ wallet: { account, passphrase } }, { match }) => {
  return { account, passphrase };
}, mapDispatchToProps)(Component);
