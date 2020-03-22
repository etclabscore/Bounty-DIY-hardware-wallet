import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {},
}));

function Component({ to }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Redirect {...{ to }} />
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(Component);
