import React, { useState } from 'react';
import VegetableCard from './VegetableCard';
import { makeStyles } from '@material-ui/core/styles';
import VegetableDrawer from './VegetableDrawer'
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Button from "@material-ui/core/Button";
import useAppData from "../hooks/useAppData";
import './Vegetables.scss';


const useStyles = makeStyles((theme) => ({
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
      fontSize: "20px",
    },
  },
  sortButton: {
    display: "flex",
    justifyContent: "center",
    marginLeft: '22%',
    marginBottom: -100,
    borderLeft: 150,
    borderRight: 150,
    width: '175px',
  },
  test: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: '2%',
  },
  button: {
    width: '100px',
    margin: '15px',
    marginLeft: '15%'
  }
}));


export default function Vegetables() {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = React.useState(true);
  const { state, setState } = useAppData();

  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const easiest = () => {
    let difficulty = state.vegetables.sort((a, b) => (a.difficulty > b.difficulty) ? 1 : -1)
    console.log('difficulty', difficulty)
    setState({...state, vegetables: difficulty})
  }

  const sun = () => {
    let sunnest = state.vegetables.sort((a, b) => (a.sun_required > b.sun_required) ? 1 : -1)
    setState({...state, vegetables: sunnest})
  }

  const water = () => {
    let wateriest = state.vegetables.sort((a, b) => (a.water_time > b.water_time) ? 1 : -1)
    setState({...state, vegetables: wateriest})
  }

  return (
    <div className="box"> 
    <div className={classes.alert}>
      <Collapse in={info}>
        <Alert
          severity="info"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setInfo(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <div className="fontSize">
            Read through the vegetables and add them your basket.
            When you're ready, click Build My Garden to get a personlized gardening plan.
            <br/>
            <br/>
            Peppers indicate the growing difficulty.
            <br/>
            <br/>
            You can sort by: The easiest vegetables to grow, the required amount of sun, and watering frequency. 
          </div>
        </Alert>
      </Collapse>
      <div className={"box2"}>
        Sort by: 
        <div className="spacing">
        <Button className={classes.button} onClick={easiest} variant="contained" color="primary" >
          Easiest
        </Button >
        <Button className={classes.button} onClick={sun} variant="contained" color="primary" >
        Sun 
        </Button >
        <Button className={classes.button} onClick={water} variant="contained" color="primary" >
        Water 
        </Button >
        </div>
      </div>
    </div >
        {state.vegetables.map(element => {
      return (
        <VegetableCard
         {...element}
        onClick ={handleDrawerOpen} />
      )
    })}
      <VegetableDrawer 
      open = {open}
      handleDrawerOpen = {handleDrawerOpen}
      handleDrawerClose = {handleDrawerClose}
      />
    </div>
  )
};