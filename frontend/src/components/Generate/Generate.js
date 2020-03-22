import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Paper } from '@material-ui/core';
import Landing from './Landing';
import Keystore from './Keystore/Keystore';
import SaveKeystore from './Keystore/Save';
import Mnemonic from './Mnemonic/Mnemonic';
import ConfirmMnemonic from './Mnemonic/Confirm';

const useStyles = makeStyles(theme => ({
  container: {},
  inner: {
    width: 800,
    padding: 50,
    margin: 50,
  },
}));

function Component({ account }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.container, 'flex flex--justify-center')}>
      <Paper className={clsx(classes.inner)}>
        <Switch>
          <Route
            exact
            path={'/generate/keystore/save/:account'}
            component={SaveKeystore}
          />
          <Route exact path={'/generate/keystore'} component={Keystore} />
          <Route
            exact
            path={'/generate/mnemonic/confirm'}
            component={ConfirmMnemonic}
          />
          <Route exact path={'/generate/mnemonic'} component={Mnemonic} />
          <Route path={'/'} component={Landing} />
        </Switch>
      </Paper>
    </div>
  );
}

export default connect(
  ({ wallet: { account } }) => ({ account }),
  mapDispatchToProps
)(Component);
