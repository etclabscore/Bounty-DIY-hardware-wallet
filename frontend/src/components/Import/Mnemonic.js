import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  TextField,
  NativeSelect,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import { HD_PATHS, ETC_TREZOR } from 'config';
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

function Component({ importMnemonic }) {
  const classes = useStyles();
  const [hdPath, setHdPath] = React.useState(ETC_TREZOR.value);
  const onSubmit = async e => {
    e.preventDefault();

    const mnemonic = (e.target.mnemonic.value ?? '').trim();
    const passphrase = (e.target.passphrase.value ?? '').trim();

    if (!mnemonic) {
      return sl('error', 'Please enter the mnemonic phrase...');
    }

    await importMnemonic(mnemonic, passphrase, hdPath);
  };

  return (
    <form
      {...{ onSubmit }}
      className={clsx(
        classes.container,
        'flex flex--column flex--align-center flex--grow'
      )}
    >
      <h1 className={classes.heading}>Unlock your Mnemonic Phrase</h1>

      <div className={classes.row}>
        <TextField
          id="mnemonic"
          label="Mnemonic"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={'jelly practice ...'}
          fullWidth
          multiline
          rows="3"
        />
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

      <FormControl className={classes.row}>
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          HD Path*
        </InputLabel>
        <NativeSelect
          value={hdPath}
          onChange={e => setHdPath(e.target.value)}
          inputProps={{
            name: 'hdPath',
            id: 'hdPath',
          }}
          fullWidth
        >
          {HD_PATHS.map(({ value, label }) => (
            <option {...{ value }} key={label}>
              {label} - {value}
            </option>
          ))}
        </NativeSelect>
      </FormControl>

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
