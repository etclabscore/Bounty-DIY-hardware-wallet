import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, TextField, Paper } from '@material-ui/core';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import qs from 'query-string';
import clsx from 'clsx';
import cache from 'utils/cache';

const useStyles = makeStyles(theme => ({
  container: { width: 800 },
  containerinner: {
    padding: 50,
  },
  row: {
    marginBottom: 20,
    width: '100%',
  },
  heading: {
    marginBottom: 30,
  },
  button: {
    width: 150,
  },
}));

function Component({ match, updateWallet, signatoryServerUrl, history }) {
  const classes = useStyles();
  const query = qs.parse(window.location.search.replace('?', ''));
  const backTo = query['back-to'] || '/';

  const onSubmit = async e => {
    e.preventDefault();

    const signatoryServerUrl = (e.target.signatoryServerUrl.value ?? '').trim();

    cache('signatoryServerUrl', signatoryServerUrl);
    updateWallet({ signatoryServerUrl });
    history.push(backTo);
  };

  return (
    <div className={clsx('flex flex--justify-center')}>
      <Paper className={classes.container}>
        <form
          {...{ onSubmit }}
          className={clsx(
            classes.containerinner,
            'flex flex--column flex--grow'
          )}
        >
          <h1 className={classes.heading}>Settings</h1>

          <div className={classes.row}>
            <TextField
              id="signatoryServerUrl"
              label="Signatory Server Url"
              type="url"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder={'http://localhost:1999'}
              defaultValue={signatoryServerUrl}
              fullWidth
              required
            />
          </div>

          <div className={clsx('flex flex--align-center')}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Save
            </Button>
            &nbsp; &nbsp;
            <Button
              variant="outlined"
              to={backTo}
              component={Link}
              className={classes.button}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default connect(
  ({ wallet: { signatoryServerUrl } }) => ({ signatoryServerUrl }),
  mapDispatchToProps
)(Component);
