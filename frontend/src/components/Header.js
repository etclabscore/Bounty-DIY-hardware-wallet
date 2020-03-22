import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import {
  IconButton,
  Tooltip,
  AppBar,
  Typography,
  Toolbar,
  Menu,
  MenuItem,
  Button,
  Divider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LightIcon from '@material-ui/icons/Brightness7';
import DarkIcon from '@material-ui/icons/Brightness4';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import { isDarkSelector } from 'selectors/theme';

function Component({
  toggleTheme,
  isDark,
  account,
  accounts,
  addAccount,
  chooseAccount,
}) {
  const [accountMenuAnchorEl, setAaccountMenuAnchorEl] = React.useState(null);

  const handleOpenAccounts = event => {
    setAaccountMenuAnchorEl(event.currentTarget);
  };

  const handleCloseAccounts = () => {
    setAaccountMenuAnchorEl(null);
  };

  const handleAddAccount = async() => {
    await addAccount();
    handleCloseAccounts();
  };

  const handleChooseAccount = async account => {
    await chooseAccount(account);
    handleCloseAccounts();
  };

  return (
    <AppBar position="static" color="inherit">
      <Toolbar color="inherit">
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          className={'flex flex--justify-center flex--grow'}
        >
          {/*Signatory Wallet Manager*/}
        </Typography>
        &nbsp;
        {!account ? null : (
          <React.Fragment>
            <Button
              aria-controls="accounts"
              aria-haspopup="true"
              onClick={handleOpenAccounts}
            >
              Account: {account}
            </Button>

            <Menu
              id="accounts"
              anchorEl={accountMenuAnchorEl}
              keepMounted
              open={Boolean(accountMenuAnchorEl)}
              onClose={handleCloseAccounts}
            >
              <MenuItem>SELECT ACCOUNT</MenuItem>
              <Divider />
              {accounts.map(a => (
                <MenuItem onClick={() => handleChooseAccount(a)} key={a}>
                  {a} {a !== account ? null : <CheckIcon />}
                </MenuItem>
              ))}
              <Divider />
              <MenuItem onClick={handleAddAccount}>
                <AddIcon /> Add Account
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
        <Tooltip title="Toggle light/dark theme">
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            aria-label="Toggle light/dark theme"
          >
            {isDark ? <LightIcon /> : <DarkIcon />}
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = state => {
  const {
    wallet: { account, accounts },
  } = state;
  return {
    isDark: isDarkSelector(state),
    account,
    accounts,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
