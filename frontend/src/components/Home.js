import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import Message from './Message/Message';
import Import from './Import/Import';
import Generate from './Generate/Generate';
import Splash from './Splash';
import Settings from './Settings';

const useStyles = makeStyles(theme => ({
  container: {
    margin: 50,
  },
}));

function Component({ account }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {account ? (
        <Switch>
          <Route path={'/message'} component={Message} />
          <Route path={'/settings'} component={Settings} />
          <Route path={'/'} render={() => <Redirect to="/message" />} />
        </Switch>
      ) : (
        <Switch>
          <Route path={'/generate'} component={Generate} />
          <Route path={'/import'} component={Import} />
          <Route path={'/settings'} component={Settings} />
          <Route path={'/'} render={() => <Splash />} />
        </Switch>
      )}
    </div>
  );
}

export default connect(
  ({ wallet: { account } }) => ({ account }),
  mapDispatchToProps
)(Component);
