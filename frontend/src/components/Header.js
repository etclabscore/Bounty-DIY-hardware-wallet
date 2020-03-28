import React from 'react';
import { connect } from 'react-redux';
import * as mapDispatchToProps from 'actions';
import { Link } from 'react-router-dom';
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
import DarkIcon from '@material-ui/icons/Brightness2';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import { isDarkSelector } from 'selectors/theme';
import { LOGIC_TYPES_MNEMONIC, CHAINS } from 'config';

function Component({
  toggleTheme,
  isDark,
  account,
  accounts,
  addAccount,
  chooseAccount,
  logout,
  isMnemonicType,
  chainId,
  networkId,
}) {
  const [accountMenuAnchorEl, setAaccountMenuAnchorEl] = React.useState(null);
  const { name: chain, networks } = CHAINS[chainId];
  const network = networks[networkId];

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

  const handleLogout = () => {
    handleCloseAccounts();
    logout();
  };

  return (
    <AppBar position="fixed" color="inherit">
      <Toolbar color="inherit">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          to={'/'}
          component={Link}
        >
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
              Network: {chain}({network}) Account: {account}
            </Button>

            <Menu
              id="accounts"
              anchorEl={accountMenuAnchorEl}
              keepMounted
              open={Boolean(accountMenuAnchorEl)}
              onClose={handleCloseAccounts}
            >
              {isMnemonicType ? null : <MenuItem>SELECT ACCOUNT</MenuItem>}
              {isMnemonicType ? null : <Divider />}
              {accounts.map(a => (
                <MenuItem onClick={() => handleChooseAccount(a)} key={a}>
                  {a}&nbsp;&nbsp;{a !== account ? null : <CheckIcon />}
                </MenuItem>
              ))}
              {isMnemonicType !== LOGIC_TYPES_MNEMONIC ? null : <Divider />}
              {isMnemonicType ? null : (
                <MenuItem onClick={handleAddAccount}>
                  <AddIcon />
                  &nbsp;&nbsp;Add Account
                </MenuItem>
              )}

              <Divider />
              {/*
                <MenuItem to={'/settings'} component={Link}>
                  <SettingsIcon />
                  &nbsp;&nbsp;Settings
                </MenuItem>
              */}
              <MenuItem onClick={handleLogout}>
                <LogoutIcon />
                &nbsp;&nbsp;Logout
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
        <Tooltip title="Settings">
          <IconButton
            color="inherit"
            aria-label="Settings"
            to={'/settings'}
            component={Link}
          >
            <SettingsIcon />
          </IconButton>
        </Tooltip>
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
    wallet: { account, accounts, type: loginType, chainId, networkId },
  } = state;
  return {
    isDark: isDarkSelector(state),
    account,
    accounts,
    isMnemonicType: loginType !== LOGIC_TYPES_MNEMONIC,
    chainId,
    networkId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
