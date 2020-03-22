import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Badge } from '@material-ui/core';
import * as mapDispatchToProps from 'actions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  container: {},
  heading: {},
  grid: {
    marginBottom: 20,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
  gridItem: {
    margin: 10,
    width: 200,
  },
  gridItemButton: {
    width: 200,
  },
}));

function Component({ mnemonic = [], updateWallet, importMnemonic, rpc }) {
  const classes = useStyles();

  const onMount = async() => {
    const m = (await rpc('generateMnemonic'))
      .split(' ')
      .map((word, index) => ({ word, index }));
    updateWallet({
      mnemonic: m,
      shuffledMnemonic: _.shuffle(m),
    });
  };

  React.useEffect(() => {
    onMount(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={clsx(
        classes.container,
        'flex flex--column flex--align-center flex--grow'
      )}
    >
      <h1 className={classes.heading}>Generate a Mnemonic Phrase</h1>

      <p className="center-align">
        Write these words down. Do not copy them to your clipboard, or save them
        anywhere online.
      </p>

      <div className={'flex flex--justify-center'}>
        <div className={classes.grid}>
          {mnemonic.map(({ word, index }) => {
            return (
              <div className={classes.gridItem} key={word}>
                <Badge badgeContent={index + 1} color="primary">
                  <Button
                    variant="contained"
                    fullWidth
                    color="secondary"
                    className={clsx(classes.gridItemButton)}
                  >
                    {word}
                  </Button>
                </Badge>
              </div>
            );
          })}
        </div>
      </div>

      <div className={'flex flex--align-center'}>
        <Button variant="outlined" fullWidth to={'/import'} component={Link}>
          Cancel
        </Button>
        &nbsp; &nbsp;
        <Button
          variant="outlined"
          fullWidth
          color="secondary"
          onClick={onMount}
        >
          Regenerate
        </Button>
        &nbsp; &nbsp;
        <Button
          variant="contained"
          fullWidth
          color="secondary"
          to="/generate/mnemonic/confirm"
          component={Link}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

export default connect(
  ({ wallet: { mnemonic } }) => ({ mnemonic }),
  mapDispatchToProps
)(Component);
