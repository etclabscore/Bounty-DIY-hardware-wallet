import React from 'react';
import { connect } from 'react-redux';
import NProgress from 'nprogress';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import LaunchIcon from '@material-ui/icons/Launch';
import { TextField, Button, Paper, Tooltip } from '@material-ui/core';

import sl from 'utils/sl';
import { sleep } from 'utils';
import * as mapDispatchToProps from 'actions';
import { web3Selector } from 'selectors/wallet';
import { NETWORKS_MAP, SECONDARY_COLOR } from 'config';

const useStyles = makeStyles(theme => ({
  result: {
    wordBreak: 'break-all',
  },
  row: {
    marginBottom: 20,
  },
  buttons: {
    '& > *': {
      width: 150,
    },
  },
  transactionLink: {
    color: SECONDARY_COLOR,
    '& > svg': {
      marginLeft: 5,
    },
  },
}));

const Component = ({ web3, network, updateWallet }) => {
  const classes = useStyles();
  const [result, setResult] = React.useState(null);
  const n = NETWORKS_MAP[network];

  const onBroadcastTransaction = async e => {
    e.preventDefault();

    setResult(null);
    NProgress.start();
    NProgress.set(0.4);

    try {
      const transactionSig = (e.target.transactionSig.value ?? '').trim();
      const { transactionHash } = await web3.eth.sendSignedTransaction(
        transactionSig
      );
      setResult({ transactionHash });
      await sleep(1000);
      updateWallet({ latestTxnHash: transactionHash });
    } catch (e) {
      sl('error', e.message);
    } finally {
      NProgress.done();
    }
  };

  return (
    <form onSubmit={onBroadcastTransaction} className="flex flex--column">
      <div className={classes.row}>
        <TextField
          id="transactionSig"
          label="Signed Transaction"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={'0x4355c47d63924e8a...'}
          fullWidth
          multiline
          rows="2"
          required
        />
      </div>
      <div className={classes.row}>
        <Button type="submit" variant="contained" color="secondary">
          Broadcast
        </Button>
      </div>

      {!result ? null : (
        <div className={classes.row}>
          <Paper elevation={0} className={classes.result}>
            {!result.transactionHash ? null : (
              <Tooltip title="View transaction in blockexplorer">
                <a
                  href={n.explorerBaseDomain + result.transactionHash}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    classes.transactionLink,
                    'flex',
                    'flex--align-center'
                  )}
                >
                  {result.transactionHash} <LaunchIcon />
                </a>
              </Tooltip>
            )}
          </Paper>
        </div>
      )}
    </form>
  );
};

export default connect(state => {
  const {
    wallet: { network },
  } = state;
  return { web3: web3Selector(state), network };
}, mapDispatchToProps)(Component);
