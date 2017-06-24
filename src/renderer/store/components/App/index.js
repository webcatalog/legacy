import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import { blue } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui-icons/Search';

import MoreMenuButton from './MoreMenuButton';
import SortMenuButton from './SortMenuButton';
import Home from '../Home';

const titleBarHeight = process.env.PLATFORM === 'darwin' ? 21 : 0;

const styleSheet = createStyleSheet('App', {
  root: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },

  fakeTitleBar: {
    backgroundColor: blue[700],
    width: '100vw',
    height: titleBarHeight,
    WebkitUserSelect: 'none',
    WebkitAppRegion: 'drag',
  },

  title: {
    flex: 1,
    userSelect: 'none',
  },
});

const App = (props) => {
  const {
    classes,
    sortBy,
    sortOrder,
  } = props;

  const renderTitleElement = () => {
    let titleText;
    if (sortBy) {
      switch (sortBy) {
        case 'installCount': {
          titleText = sortOrder === 'asc' ? 'Least popular apps' : 'Most popular apps';
          break;
        }
        case 'name': {
          titleText = sortOrder === 'asc' ? 'Apps by name (A-Z)' : 'Apps by name (Z-A)';
          break;
        }
        case 'createdAt': {
          titleText = 'Most recently added apps';
          break;
        }
        default: break;
      }
    } else {
      titleText = 'Apps';
    }

    return (
      <Typography
        type="title"
        color="inherit"
        className={classes.title}
      >
        {titleText}
      </Typography>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.fakeTitleBar} />
      <AppBar position="static">
        <Toolbar>
          {renderTitleElement()}
          <IconButton color="contrast" aria-label="Search">
            <SearchIcon />
          </IconButton>
          <SortMenuButton />
          <MoreMenuButton />
        </Toolbar>
      </AppBar>

      <Home />
    </div>
  );
};

App.defaultProps = {
  sortBy: null,
  sortOrder: null,
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
  sortBy: PropTypes.string,
  sortOrder: PropTypes.string,
};

const mapStateToProps = state => ({
  sortBy: state.home.sortBy,
  sortOrder: state.home.sortOrder,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styleSheet)(App));
