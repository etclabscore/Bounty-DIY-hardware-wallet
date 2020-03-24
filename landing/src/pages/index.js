import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tooltip from '@material-ui/core/Tooltip';
import c from 'clsx';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import LightIcon from '@material-ui/icons/WbIncandescent';
import DarkIcon from '@material-ui/icons/Brightness2';
import { Helmet } from 'react-helmet';
import theme from './theme';
import './style.scss';

const IndexPage = () => {
  const [isDark, setIsDark] = React.useState(
    window.localStorage.getItem('isDark') !== '0'
  );
  const toggleTheme = () => {
    const is = !isDark;
    setIsDark(is);
    window.localStorage.setItem('isDark', is ? '1' : '0');
  };

  return (
    <ThemeProvider theme={createMuiTheme(theme(isDark))}>
      <CssBaseline />

      <div className="theme-switcher">
        <Tooltip title="Toggle light/dark theme">
          <IconButton
            onClick={toggleTheme}
            color="inherit"
            aria-label="Toggle light/dark theme"
          >
            {isDark ? <LightIcon /> : <DarkIcon />}
          </IconButton>
        </Tooltip>
      </div>

      <div className={c('home flex flex--column', { dark: isDark })}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Signatory Client</title>
          <link
            rel="canonical"
            href="https://vbstreetz.github.io/signatory-client"
          />

          <link
            href="https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap"
            rel="stylesheet"
          />
        </Helmet>

        <h3 className="home__top-heading">Signatory Client</h3>

        <h1 className="home__main-heading">
          A Modern
          <br />
          Ethereum Client for{' '}
          <a
            className="home__esri"
            href="https://signatory.dev"
            target="_blank"
            rel="noreferrer noopener"
          >
            Signatory Signer
          </a>
        </h1>

        <div className="flex flex--justify-center home__ctas">
          <a
            className="screenshot"
            href="https://github.com/vbstreetz/signatory-client/releases"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Button
              variant="contained"
              color="secondary"
              style={{ width: 250, height: 45 }}
            >
              Download
            </Button>
          </a>
          &nbsp; &nbsp;
          <a
            className="screenshot"
            href="https://github.com/vbstreetz/signatory-client/issues"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Button
              variant="contained"
              color="default"
              style={{ width: 250, height: 45 }}
            >
              Report an Issue
            </Button>
          </a>
        </div>

        <div className="screenshot">
          <div className="titlebar webkit-draggable">
            <div className="titlebar-stoplight">
              <div className="titlebar-close"></div>
              <div className="titlebar-minimize"></div>
              <div className="titlebar-fullscreen"></div>
            </div>
          </div>

          <div className="screenshot__content">
            <img
              src={require('../images/shot.png')}
              alt="Screenshot"
              width="100%"
            />
          </div>
        </div>

        <div style={{ color: '#666', fontSize: 12 }}>&copy; 2020 Vb</div>
      </div>
    </ThemeProvider>
  );
};

export default IndexPage;
