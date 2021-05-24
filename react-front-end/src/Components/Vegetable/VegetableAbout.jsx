import React, { useEffect } from "react";
import "./VegetableAbout.scss";
import useAppData from "../../hooks/useAppData";
import { Link } from "react-router-dom";
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  alert: {
    width: '90%',
    '& > * + *': {
      marginTop: theme.spacing(2),
      fontSize: "20px",
    },
    marginBottom: '40px',
  },
}));

export default function VegetableAbout() {
  const { state } = useAppData();
  const [info, setInfo] = React.useState(true);
  const classes = useStyles();



  function ScrollToTopOnMount() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return null;
  }

  return (
    <div>
      <div className="content">
        <ScrollToTopOnMount />
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
                Below you will find a short discription about each vegetable. Use this resource to browse
                and find what vegetables you want to grow. Note some of the health benefits of each one!
            <br />
                <br />
            Once you have the information you need, click Get Started.
          </div>
            </Alert>
          </Collapse>
        </div>
        {state.vegetables.map(veg => (
          <div className="mainCard">
            <div className="flipCard">
              <div className="flipCardInner">
                <div className="flipCardFront">
                  <img src={veg.image_url} alt={'image'} >
                  </img>
                </div>
                <div className="flipCardBack">
                  <h1>{veg.name}</h1>
                  <p>{veg.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <br />
      </div>
      <div className="vegcontainer">
        <Link to="/build" className="veganimated-word">
          <p>GET STARTED</p>
        </Link>
      </div>
    </div>
  )
}
