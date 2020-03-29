import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  TextField,
  Paper,
  NativeSelect,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { CHAINS } from 'config';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import qs from 'query-string';
import clsx from 'clsx';
import cache from 'utils/cache';
import * as string from 'utils/string';

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

function Component({
  match,
  updateWallet,
  signatoryServerUrl,
  chainId,
  networkId,
  history,
}) {
  const classes = useStyles();
  const query = qs.parse(window.location.search.replace('?', ''));
  const backTo = query['back-to'] || '/';
  const [formData, setFormData] = React.useState({ chainId, networkId });

  const handleFormDataChange = data => {
    setFormData({
      ...formData,
      ...data,
    });
  };

  const onSubmit = async e => {
    e.preventDefault();
    const signatoryServerUrl = (e.target.signatoryServerUrl.value ?? '').trim();
    const { chainId, networkId } = formData;
    cache('signatoryServerUrl', signatoryServerUrl);
    cache('chainId', chainId);
    cache('networkId', networkId);
    updateWallet({ chainId, networkId, signatoryServerUrl });
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

          <FormControl className={classes.row}>
            <InputLabel shrink htmlFor="age-native-label-placeholder">
              Chain*
            </InputLabel>
            <NativeSelect
              value={formData.chainId}
              onChange={e =>
                handleFormDataChange({
                  chainId: parseInt(e.target.value),
                  networkId: 1,
                })
              }
              inputProps={{
                name: 'chainId',
                id: 'chainId',
              }}
              fullWidth
            >
              {Object.entries(CHAINS).map(([id, { name }]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </NativeSelect>
          </FormControl>

          <FormControl className={classes.row}>
            <InputLabel shrink htmlFor="age-native-label-placeholder">
              Network*
            </InputLabel>
            <NativeSelect
              value={formData.networkId}
              onChange={e =>
                handleFormDataChange({ networkId: parseInt(e.target.value) })
              }
              inputProps={{
                name: 'networkId',
                id: 'networkId',
              }}
              fullWidth
            >
              {Object.entries(CHAINS[formData.chainId].networks).map(
                ([id, { name }]) => (
                  <option key={id} value={id}>
                    {string.toTitleCase(name)}
                  </option>
                )
              )}
            </NativeSelect>
          </FormControl>

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
  ({ wallet }) => ({ ...wallet }),
  mapDispatchToProps
)(Component);
