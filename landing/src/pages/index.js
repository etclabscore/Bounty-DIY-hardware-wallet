import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tooltip from '@material-ui/core/Tooltip';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import LightIcon from '@material-ui/icons/WbIncandescent';
import DarkIcon from '@material-ui/icons/Brightness2';
import { Helmet } from 'react-helmet';
import theme from '../utils/theme';
import cache from '../utils/cache';
import '../utils/style.scss';

const IndexPage = () => {
  const [isDark, setIsDark] = React.useState(cache('isDark') !== '0');
  const toggleTheme = () => {
    const is = !isDark;
    setIsDark(is);
    cache('isDark', is ? '1' : '0');
  };

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

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

      <div className={'home flex flex--column'}>
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
          A Modern, Elegant
          <br />
          Ethereum Wallet powered by{' '}
          <a
            className="home__highlight hover"
            href="https://signatory.dev"
            target="_blank"
            rel="noreferrer noopener"
          >
            Signatory Signer
          </a>
        </h1>

        <div className="flex home__ctas">
          <a
            className="screenshot"
            href="https://github.com/vbstreetz/signatory-client"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Button variant="contained" color="secondary" fullWidth>
              Install
            </Button>
          </a>
          <a
            className="screenshot"
            href="https://github.com/vbstreetz/signatory-client/issues"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Button variant="contained" color="default" fullWidth>
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

        <div style={{ marginBottom: 40 }}>
          <p>
            1. Install <a href="https://www.docker.com/">docker</a> and{' '}
            <a href="https://docs.docker.com/compose/install/">
              docker-compose
            </a>
          </p>

          <p>
            2. Clone repo
            <br />
            <code>
              $ git clone https://github.com/vbstreetz/signatory-client <br />$
              cd signatory-client
            </code>
          </p>

          <p>
            3. Configure environment
            <br />
            <code>$ cp .env.sample .env</code>
          </p>

          <p>
            4. Boot server and frontend
            <br />
            <code>$ make run</code>
          </p>

          <p>
            5. Visit frontend at{' '}
            <a href="http://localhost:4444">http://localhost:4444</a>
          </p>
        </div>

        <div className="footer">&copy; 2020 Vb</div>
      </div>
    </ThemeProvider>
  );
};

export default IndexPage;
