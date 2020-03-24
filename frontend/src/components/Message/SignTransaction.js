import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  result: {
    padding: 20,
  },
  row: {
    marginBottom: 20,
  },
}));

const Component = ({ account, passphrase, rpc }) => {
  const classes = useStyles();
  const [result, setResult] = React.useState(null);

  const onSubmit = async e => {
    e.preventDefault();

    setResult(null);

    const signedTransaction = (e.target.signedTransaction.value ?? '').trim();
    console.log(signedTransaction);
  };

  return (
    <form {...{ onSubmit }} className="flex flex--column">
      <div className={classes.row}>
        <TextField
          id="signedTransaction"
          label="Signed Transaction"
          type="text"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder={'Enter message...'}
          fullWidth
          multiline
          rows="2"
          required
        />
      </div>
      <div className={classes.row}>
        <Button type="submit" variant="contained" color="secondary">
          Broadcast
        </Button>
      </div>

      {!result ? null : (
        <div className={classes.row}>
          <Paper elevation={0} className={classes.result}>
            {result}
          </Paper>
        </div>
      )}
    </form>
  );
};

export default connect(({ wallet: { account, passphrase } }, { match }) => {
  return { account, passphrase };
}, mapDispatchToProps)(Component);
