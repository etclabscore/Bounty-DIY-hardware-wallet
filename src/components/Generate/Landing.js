import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Button } from '@material-ui/core';
import { SECONDARY_COLOR } from 'config';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
  },
  loader: {
    position: 'absolute',
    top: '50%',
  },
  heading: {
    marginBottom: 50,
  },
  section: {
    marginLeft: 10,
    marginRight: 10,
  },
  toGenerateLink: {
    marginTop: 50,
    '& > a': {
      color: SECONDARY_COLOR,
    },
  },
}));

function Component({ account, isWorking }) {
  const classes = useStyles();

  return (
    <div className="flex flex--column flex--justify-center flex--align-center">
      <h1 className={classes.heading}>Create New Wallet</h1>

      <div className="flex flex--justify-center">
        <div
          className={clsx(
            classes.section,
            'flex flex--column flex--align-center'
          )}
        >
          <h3>Keystore File</h3>

          <ul>
            <li>An encrypted JSON file, protected by a password</li>
            <li>Back it up on a USB drive</li>
            <li>Cannot be written, printed, or easily transferred to mobile</li>
            <li>Compatible with Mist, Parity, Geth</li>
            <li>Provides a single address for sending and receiving</li>
          </ul>

          <Button
            variant="contained"
            fullWidth
            color="secondary"
            to={'/generate/keystore'}
            component={Link}
          >
            Generate a Keystore File
          </Button>
        </div>

        <div
          className={clsx(
            classes.section,
            'flex flex--column flex--align-center'
          )}
        >
          <h3>Mnemonic Phrase</h3>

          <ul>
            <li>A 12-word private seed phrase</li>
            <li>Back it up on paper or USB drive</li>
            <li>Can be written, printed, and easily typed on mobile, too</li>
            <li>Compatible with MetaMask, Jaxx, imToken, and more</li>
            <li>Provides unlimited addresses for sending and receiving</li>
          </ul>

          <Button
            variant="contained"
            fullWidth
            color="secondary"
            to={'/generate/mnemonic'}
            component={Link}
          >
            Generate a Mnemonic Phrase
          </Button>
        </div>
      </div>

      <div className={classes.toGenerateLink}>
        <Link to="/import">Got a wallet?</Link>
      </div>
    </div>
  );
}

export default connect(
  ({ app: { isWorking }, wallet: { account } }) => ({
    isWorking,
    account,
  }),
  mapDispatchToProps
)(Component);
