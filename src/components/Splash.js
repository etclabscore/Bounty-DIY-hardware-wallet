import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { SECONDARY_COLOR as HIGHLIGHT_COLOR } from 'config';

const useStyles = makeStyles(theme => ({
  container: { width: 800, padding: 50 },
  row: { marginBottom: 20 },
  subheading: {},
  heading: {},
  highlight: { color: HIGHLIGHT_COLOR, cursor: 'pointer' },
  buttons: {
    '& > *': {
      marginRight: 10,
      width: 200,
    },
  },
  footer: {
    fontSize: 11,
  },
  toSettings: {
    color: HIGHLIGHT_COLOR,
  },
}));

function Component({ signatoryServerUrl }) {
  const classes = useStyles();
  const openSignatoryPage = () => {
    // shell.openExternal('https://signatory.dev');
  };

  return (
    <div className={'flex flex--justify-center'}>
      <Paper className={classes.container}>
        <h3 className={clsx(classes.row, classes.subheading)}>
          Signatory Client
        </h3>

        <h1 className={clsx(classes.row, classes.heading)}>
          A Modern, Elegant
          <br />
          Ethereum Wallet powered by{' '}
          <span onClick={openSignatoryPage} className={classes.highlight}>
            Signatory Signer
          </span>
        </h1>

        <div
          className={clsx(
            classes.buttons,
            classes.row,
            'flex flex--align-center'
          )}
        >
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            to="/import"
            component={Link}
          >
            Import wallet
          </Button>

          <Button
            type="submit"
            variant="contained"
            color="default"
            to="/generate"
            component={Link}
          >
            Generate wallet
          </Button>
        </div>

        <div className={classes.footer}>
          Tip: Ensure that you're running signatory server at{' '}
          <strong>{signatoryServerUrl}</strong>. Click{' '}
          <Link to="/settings" className={classes.toSettings}>
            here
          </Link>{' '}
          or the settings button in the header above to configure the location.
        </div>
      </Paper>
    </div>
  );
}

export default connect(
  ({ wallet: { signatoryServerUrl } }) => ({ signatoryServerUrl }),
  mapDispatchToProps
)(Component);
