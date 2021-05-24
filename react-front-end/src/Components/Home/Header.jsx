import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Nunito',
  },

 headerBarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  headerBarTitle: {
    flexGrow: '1',
  },
  icon: {
    color: '#b1d2db',
    fontSize: '2rem',
  },
  colorText: {
    marginLeft: '20px',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#b1d2db',
    fontSize: '4.5rem',
  },
  goDown: {
    color: '#b1d2db',
    fontSize: '4rem',
  },
}));
export default function Header() {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <AppBar className={classes.headerBar} elevation={0}>
        <Toolbar className={classes.headerBarWrapper}>
          <h1 className={classes.headerBarTitle}>
            B<span className={classes.colorText}>loom.</span>2
          </h1>
          <IconButton>
            <SortIcon className={classes.icon} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to Coles<br/>
            <div>
                <img className={classes.colorText} src={"../images/logos/bloom-sprout.svg"} alt='' /></div>
          </h1>
          <Scroll to="place-to-visit" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
}