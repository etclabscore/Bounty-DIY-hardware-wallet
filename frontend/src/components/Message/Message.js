import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import Sign from './Sign';
import Verify from './Verify';
import { history } from 'store';

const useStyles = makeStyles(theme => ({
  tab: {
    minWidth: 'auto',
    padding: 7,
    fontSize: 13,
  },
  activeTabContent: {
    paddingTop: 20,
  },
}));

const ROUTES = ['/', '/verify'];
const ROUTE_COMPONENTS = [Sign, Verify];
const ROUTE_LABELS = ['Sign Message', 'Verify Message'];

const Component = ({ path, match }) => {
  const classes = useStyles();
  let activeTab = ROUTES.indexOf(path);
  activeTab = -1 === activeTab ? 0 : activeTab;

  // console.log(activeTab, path);

  const handleActiveTabChange = (event, newValue) => {
    history.push(`/message${newValue ? ROUTES[newValue] : ''}`);
  };

  return (
    <div>
      <Tabs
        value={activeTab}
        indicatorColor="secondary"
        textColor="inherit"
        onChange={handleActiveTabChange}
        aria-label="tabs"
      >
        {ROUTE_LABELS.map(label => (
          <Tab className={classes.tab} key={label} {...{ label }} />
        ))}
      </Tabs>

      <div className={classes.activeTabContent}>
        <Switch>
          {ROUTES.map((path, i) => (
            <Route
              exact
              key={path}
              path={`/message${ROUTES[i]}`}
              component={ROUTE_COMPONENTS[i]}
            />
          ))}
        </Switch>
      </div>
    </div>
  );
};

export default connect((_, { match }) => {
  return {
    path: window.location.pathname.replace('/message', ''),
  };
}, mapDispatchToProps)(Component);
