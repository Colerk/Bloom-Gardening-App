import React from 'react';
import { Link, NavLink } from "react-router-dom";
import {List, ListItem, ListItemIcon,ListItemText,Collapse, Divider} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AssistantIcon from '@material-ui/icons/Assistant';
import AddBoxIcon from '@material-ui/icons/AddBox';
import InfoIcon from '@material-ui/icons/Info';
import EcoIcon from '@material-ui/icons/Eco';
import SettingsIcon from '@material-ui/icons/Settings'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import useAppData from "../hooks/useAppData";
import GrainIcon from '@material-ui/icons/Grain';
import './Dropdown.scss';

export default function NestedList() {
  const [open, setOpen] = React.useState(true);
  const { state } = useAppData();

  const handleClick = () => {
    setOpen(!open);
  };

  const redirect = function (id) {
    window.location.replace(`http://localhost:3000/tasks/${id}`)
  }

  return (
    <List className="main"
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Link className="a" to="/build">
        <ListItem button>
          <ListItemIcon>
            <AddBoxIcon className="icon"/>
          </ListItemIcon>
            <div className ='a'> Build New Garden </div>
          </ListItem>
        </Link>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <MoreVertIcon className="icon"/>
        </ListItemIcon>
        <div className ='a'> Bubba's Garden </div>
        {open ? <ExpandMore /> : <ExpandLess />}
      </ListItem>
      {/* Map over Gardens to link all Gardens */}
      <Collapse in={!open} timeout="auto" unmountOnExit>
        {state.plots.map(x => 
        <List component="div" disablePadding>
          <ListItem button onClick={() => redirect(x.id)}  className="nested">
            <ListItemIcon>
            <GrainIcon className="iconb"/>
            </ListItemIcon>
              <ListItemText primary={`Garden ${x.id}`} />
          </ListItem>
        </List>
        )}
      </Collapse>
      {/* Map ends here! */}
      <Link to="/vegetables"className='a'>
        <ListItem button>
          <ListItemIcon>
            <EcoIcon className="icon"/>
          </ListItemIcon>
          <div className='a'> Vegetables </div>
        </ListItem> 
        </Link>
      <Divider />

      <Link to="/about"className='a'>
        <ListItem button>
          <ListItemIcon>
            <InfoIcon className="icon"/>
          </ListItemIcon>
          <div className='a'> About </div>
        </ListItem>
      </Link>
      <Link to="/vegetables"className='a'>
        <ListItem button>
          <ListItemIcon>
            <AssistantIcon className="icon"/>
          </ListItemIcon>
          <div className='a'> Resources </div>
        </ListItem>
      </Link>
      <Link to="/vegetables"className='a'>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon className="icon"/>
          </ListItemIcon>
          <div className='a'> Settings </div>
        </ListItem>
      </Link>
    </List>
  );
}