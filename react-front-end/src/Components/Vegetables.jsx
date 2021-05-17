import React, {useEffect, useState} from 'react';
import axios from 'axios';
import VegetableCard from './VegetableCard';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import VegetableDrawer from './VegetableDrawer'





export default function Vegetables() {
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const[veg, setVeg] = useState([]);
   
  const useStyles = makeStyles({

    row: {
     display: "flex",
     justifyContent:'space-evenly',
     marginLeft: '500px',
     margin: 100,
    },

 
  
  });

  const classes = useStyles();
  useEffect(() => {
    getAllVeg();
  }, []);

  const renderVegetableCard = (veg) =>{
    const data = veg.map(element => {
      return (
        <Grid item md={3}>
        <VegetableCard
         {...element}
        onClick ={handleDrawerOpen} />
        </Grid>
      )
    }) 
    return data
  }

  const renderVegetableDrawer = (veg) =>{
    const data = veg.map(element => {
      return (
        <VegetableDrawer
        {...element}/>
        
      )
    })
  }

  const getAllVeg = () => {
    axios.get ('/api/vegetables')
    .then ((res) =>{
      const allVeg = res.data;
      //add data to state
      setVeg(allVeg)
    })
    .catch(error => console.error(`Error: ${error}`))
  }



  return (
    <div> 
    <Grid 
    container spacing={3}>{renderVegetableCard(veg)}
    </Grid> 

    <VegetableDrawer 
    open = {open}
    handleDrawerOpen = {handleDrawerOpen}
    handleDrawerClose = {handleDrawerClose}
    />
    </div>
    
  )
};