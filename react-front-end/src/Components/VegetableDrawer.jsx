import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import useAppData from "../hooks/useAppData";
import './VegetableDrawer.scss';


const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  vegroot: {
    display: "flex"
  },
  vegDrawer: {
    background: 'none',
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  vegDrawerShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: drawerWidth
  },
  hide: {
    display: "block"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  vegdrawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
  },
  vegdrawerHeaderTitle: {
    marginLeft: 15,
    marginTop:25,
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center"
  },
  ShoppingBasketIcon: {
    padding: '10px',
  },
  buildGardenButton: {
    marginTop: 25,
    marginBottom: -100,
    borderLeft: 150,
    borderRight: 150,
  },
  vegcontent: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  },
  avatar: {
    maxWidth: '40px',
    maxHeight: '40px',
  },
  vegAvatar: {
    maxWidth: '40px',
    maxHeight: '40px',
    marginLeft: '40px'
    // display: 'flex',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  name: {
    marginLeft: '20px',
  },
  buttonFont: {
    fontSize: "0.8em",
  },
  test: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "space-between",
  }
}));


export default function VegetableDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { state, deleteVegFromCart, buildVegGarden, addPlot } = useAppData()

  useEffect(() => {
  }, [state])

  const { open,
    handleDrawerOpen,
    handleDrawerClose,
    veg } = props

  const buildOnClick = function (cart) {
    addPlot(cart)
      // .then(() => {
      //   console.log('state-basket', state.basket)
      //   console.log('state-basket-vid', state.basket[0].vid)
      //   console.log('success! we did it!!')
      // })
  }

  const onClick = function (x) {
    deleteVegFromCart(x).then(() => {
    })
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.vegdrawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <h2 className={classes.vegdrawerHeaderTitle}> Vegetable Basket
      <img
        className={classes.vegAvatar}
        src={"../images/avatars/vegetable-box.png"}
        alt="img"
      />
      </h2>
      <Divider />

      <List >
        <table className="items">
        {state.basket.map((x, i) =>
          <tbody className="items">
        <tr >
          <td>
          {/* <ListItem button key={i}> */}
              <img
                className={classes.avatar}
                src={x.avatar_url}
                alt="img"
              />
              </td>
            <td>
            <ListItemText className={classes.name} primary={x.name} />
            </td>
            <td>
            <ListItemIcon>
              <DeleteIcon onClick={() => onClick(x)} />
            </ListItemIcon>
            </td>
          {/* </ListItem> */}
          </tr>
          </tbody>
        )}
        </table>
      </List>
      <Divider />
      <div className={classes.vegdrawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
          <div className={classes.buttonFont}>
            Close
          </div>
        </IconButton>
      </div>
      <Button onClick={() => buildOnClick(state.basket)} variant="contained" color="primary" className={classes.buildGardenButton}>
        Build My Garden
        </Button>
    </Drawer>
  )
}