import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    color: 'deepskyblue',
  },
}));

export default function() {
  const classes = useStyles();
  return <div className={classes.container}>WORK IN PROGRESS</div>;
}
