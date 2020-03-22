import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import SignOrVerify from './SignOrVerify/SignOrVerify';
import Setup from './Setup';

const useStyles = makeStyles(theme => ({
  container: {
    margin: 50,
  },
}));

function Component({ account }) {
  const classes = useStyles();

  return account ? (
    <div className={classes.container}>
      <Switch>
        <Route path={'/sign-or-verify'} component={SignOrVerify} />
      </Switch>
    </div>
  ) : (
    <Switch>
      <Route path={'/'} component={Setup} />
    </Switch>
  );
}

export default connect(
  ({ wallet: { account } }) => ({ account }),
  mapDispatchToProps
)(Component);
