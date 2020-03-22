import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import sl from 'utils/sl';

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

function Component({ importKeyfile, importKeystorage }) {
  const classes = useStyles();
  const [keyfile, setKeyfile] = React.useState(null);

  const onSubmit = async e => {
    e.preventDefault();
    if (!keyfile) {
      return sl('error', 'Please select the keyfile...');
    }
    const passphrase = (e.target.passphrase.value ?? '').trim();
    try {
      await importKeystorage(keyfile.data, passphrase);
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
      <h1 className={classes.heading}>Unlock your Keystore File</h1>

      <div className={classes.row}>
        <Button
          variant="contained"
          fullWidth
          color="secondary"
          onClick={async() => {
            setKeyfile(await importKeyfile());
          }}
        >
          {keyfile ? `Selected (${keyfile.name})` : 'Select Wallet File'}
        </Button>
      </div>

      <div className={classes.row}>
        <TextField
          id="passphrase"
          label="Passphrase"
          type="password"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={'(Optional)'}
          fullWidth
        />
      </div>

      <div className={clsx('flex flex--align-center')}>
        <Button variant="outlined" fullWidth to={'/import'} component={Link}>
          Cancel
        </Button>
        &nbsp; &nbsp;
        <Button type="submit" variant="contained" fullWidth color="secondary">
          Import
        </Button>
      </div>
    </form>
  );
}

export default connect(() => ({}), mapDispatchToProps)(Component);
