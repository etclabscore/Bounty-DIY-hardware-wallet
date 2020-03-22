import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import sl from 'utils/sl';
import rpc from 'utils/xhr';

const useStyles = makeStyles(theme => ({
  container: {},
  row: {
    marginBottom: 20,
    width: '100%',
  },
  heading: {
    marginBottom: 30,
  },
}));

function Component({ history }) {
  const classes = useStyles();

  const onSubmit = async e => {
    e.preventDefault();

    const passphrase = (e.target.passphrase.value ?? '').trim();
    const cpassphrase = (e.target.cpassphrase.value ?? '').trim();

    if (!passphrase) return sl('error', 'Please enter password...');
    if (!cpassphrase) return sl('error', 'Confirm password...');
    if (passphrase !== cpassphrase)
      return sl('error', 'Passwords do not match.');

    try {
      const account = await rpc('createAccount', {
        name: Date.now().toString(),
        description: Date.now().toString(),
        passphrase,
      });
      history.push(`/generate/keystore/save/${account}`);
    } catch (e) {
      sl('error', e.message);
    }
  };

  return (
    <form
      {...{ onSubmit }}
      className={clsx(
        classes.container,
        'flex flex--column flex--align-center'
      )}
    >
      <h1 className={classes.heading}>Generate a Keystore File</h1>

      <div className={classes.row}>
        <TextField
          id="passphrase"
          label="Password"
          type="password"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={'At least 12 characters...'}
          fullWidth
          required
        />
      </div>

      <div className={classes.row}>
        <TextField
          id="cpassphrase"
          label="Confirm Password"
          type="password"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={''}
          fullWidth
          required
        />
      </div>

      <div className={clsx('flex flex--align-center')}>
        <Button variant="outlined" fullWidth to={'/generate'} component={Link}>
          Cancel
        </Button>
        &nbsp; &nbsp;
        <Button type="submit" variant="contained" fullWidth color="secondary">
          Generate
        </Button>
      </div>
    </form>
  );
}

export default connect(() => ({}), mapDispatchToProps)(Component);
