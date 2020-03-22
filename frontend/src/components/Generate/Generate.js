import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Paper, Button } from '@material-ui/core';
import Loader from 'components/Loader';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
  },
  paper: { marginTop: 50, padding: 50 },
  loader: {
    position: 'absolute',
    top: '50%',
  },
  heading: {
    marginBottom: 50,
  },
  section: {
    marginLeft: 50,
    marginRight: 50,
  },
}));

function Component({ account, isWorking }) {
  const classes = useStyles();

  const pane = (
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
            to={'/mnemonic'}
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
            to={'/keystore'}
            component={Link}
          >
            Generate a Mnemonic Phrase
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={clsx('flex flex--justify-center', classes.container)}>
      <Paper
        className={clsx(classes.paper, {
          [classes.paperInactive]: isWorking,
        })}
      >
        {pane}
      </Paper>

      {!isWorking ? null : (
        <div className={classes.loader}>
          <Loader />
        </div>
      )}
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
