
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ImageCard from "../Home/ImageCard";
import useWindowPosition from "../../hooks/useWindowPosition";
import './AboutPictures.scss';
import about from "./aboutHero";

const useStyles = makeStyles((theme) => ({
  div1: {
    minHeight: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  div2: {
    minHeight: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },

  div3: {
    minHeight: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
}));
export default function () {
  const classes = useStyles();
  const checked = useWindowPosition("header");
  return (
    <div>
      <div className={classes.div1} id="place-to-visit">
        <ImageCard place={about[0]} checked={checked} />
        <ImageCard place={about[1]} checked={checked} />
      </div>

      <div className={classes.div2}>
        <ImageCard place={about[2]} checked={checked} />
        <ImageCard place={about[3]} checked={checked} />
      </div>
      <div className={classes.div3}>
      </div>
    </div>
  );
}