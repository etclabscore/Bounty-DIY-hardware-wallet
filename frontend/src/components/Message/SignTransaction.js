import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Paper } from '@material-ui/core';
import { IS_DEV } from 'config';
import { stringToHex, numberToHex } from '@etclabscore/eserialize';
import { toGwei, toWei } from 'utils/wallet';

const useStyles = makeStyles(theme => ({
  result: {
    wordBreak: 'break-all',
  },
  row: {
    marginBottom: 20,
  },
}));

const SAMPLE = {
  to: '0x857C6efC4C19Da78b23C77E0B93d6A5Ecf23f2Cd',
  value: '0.1',
  data: '',
  gasPrice: '0.08',
  gasLimit: '21000',
};

const Component = ({ account, passphrase, chainId, rpc }) => {
  const classes = useStyles();
  const [result, setResult] = React.useState(null);
  const nounce = 0;

  const onSubmit = async e => {
    e.preventDefault();

    setResult(null);

    const payload = {};
    ['from', 'to', 'value', 'gasLimit', 'gasPrice', 'nonce', 'data'].forEach(
      k => {
        payload[k] = (e.target[k].value ?? '').trim();
      }
    );

    const chainId = 3;

    try {
      const data = stringToHex(payload.data);
      const sig = await rpc(
        'signTransaction',
        {
          from: payload.from,
          nonce: numberToHex(parseInt(payload.nonce)),
          gas: numberToHex(parseFloat(payload.gasLimit)),
          gasPrice: numberToHex(toGwei(parseFloat(payload.gasPrice))),
          to: payload.to,
          value: numberToHex(toWei(parseFloat(payload.value))),
          data: data === '0x' ? '0x00' : data,
        },
        passphrase,
        numberToHex(chainId)
      );

      setResult(sig);
    } catch (e) {
      console.log(JSON.stringify(e.data, null, 2));
    }
  };

  return (
    <form {...{ onSubmit }} className="flex flex--column">
      <div className={classes.row}>
        <TextField
          id="from"
          label="From Address"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={'0x1234...'}
          defaultValue={account}
          fullWidth
          required
        />
      </div>

      <div className={classes.row}>
        <TextField
          id="to"
          label="To Address"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={'0x5678...'}
          defaultValue={IS_DEV ? SAMPLE.to : ''}
          fullWidth
          required
        />
      </div>

      <div className={classes.row}>
        <TextField
          id="value"
          label="Value / Amount to Send (ETH)"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={'Amount...'}
          defaultValue={IS_DEV ? SAMPLE.value : ''}
          fullWidth
          required
        />
      </div>

      <div className={classes.row}>
        <TextField
          id="gasLimit"
          label="Gas Limit"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={'21000'}
          defaultValue={SAMPLE.gasLimit}
          fullWidth
          required
        />
      </div>

      <div className={classes.row}>
        <TextField
          id="gasPrice"
          label="Gas Price (GWEI)"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={'0'}
          defaultValue={SAMPLE.gasPrice}
          fullWidth
          required
        />
      </div>

      <div className={classes.row}>
        <TextField
          id="nonce"
          label="Nonce"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={'0'}
          defaultValue={nounce.toString()}
          fullWidth
          required
        />
      </div>

      <div className={classes.row}>
        <TextField
          id="data"
          label="Data"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={'0x5d1b...'}
          defaultValue={IS_DEV ? SAMPLE.data : ''}
          fullWidth
        />
      </div>

      <div className={classes.row}>
        <Button type="submit" variant="contained" color="secondary">
          Sign
        </Button>
        &nbsp; &nbsp;
        <Button type="submit" variant="contained" color="secondary" disabled>
          Broadcast
        </Button>
      </div>

      {!result ? null : (
        <div className={classes.row}>
          <Paper elevation={0} className={classes.result}>
            {result}
          </Paper>
        </div>
      )}
    </form>
  );
};

export default connect(
  ({ wallet: { account, passphrase, chainId } }, { match }) => {
    return { account, passphrase, chainId };
  },
  mapDispatchToProps
)(Component);
