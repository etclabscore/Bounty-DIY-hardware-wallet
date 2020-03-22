import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import Message from './Message/Message';
import Import from './Import/Import';
import Generate from './Generate/Generate';
import Landing from './Landing';

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
        <Route path={'/message'} component={Message} />
        <Route path={'/'} render={() => <Landing to="/message" />} />
      </Switch>
    </div>
  ) : (
    <Switch>
      <Route path={'/generate'} component={Generate} />
      <Route path={'/import'} component={Import} />
      <Route path={'/'} render={() => <Landing to="/import" />} />
    </Switch>
  );
}

export default connect(
  ({ wallet: { account } }) => ({ account }),
  mapDispatchToProps
)(Component);
