import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Button } from '@material-ui/core';

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
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    width: 200,
  },
}));

function Component() {
  const classes = useStyles();

  return (
    <div className={clsx('flex flex--justify-center', classes.container)}>
      <div className="flex flex--column flex--justify-center flex--align-center flex--grow">
        <h1 className={classes.heading}>
          How would you like to access your wallet?
        </h1>

        <div className="flex flex--justify-center">
          <div
            className={clsx(
              classes.section,
              'flex flex--column flex--align-center'
            )}
          >
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              to={'/import/keystore'}
              component={Link}
              className={classes.button}
            >
              Keystore File
            </Button>
          </div>

          <div
            className={clsx(
              classes.section,
              'flex flex--column flex--align-center'
            )}
          >
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              to={'/import/mnemonic'}
              component={Link}
              className={classes.button}
            >
              Mnemonic Phrase
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(
  ({ wallet: { account } }) => ({
    account,
  }),
  mapDispatchToProps
)(Component);
