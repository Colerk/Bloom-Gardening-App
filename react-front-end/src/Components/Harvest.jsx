import React, { useState, useEffect } from 'react';
import useAppData from "../hooks/useAppData";
import { useParams } from "react-router-dom";
import './Harvest.scss';
const moment = require('moment');

const getProgress = function (dtePlanted, daysToHarvest) {
  let planted = moment(dtePlanted);
  let currentDay = moment();
  let days = currentDay.diff(planted, "days") * 100 / daysToHarvest;
  if (days < 0) {
    return "100%";
  } else {
    return Math.round(days) + "%";
  }
}

export default function Harvest() {
  const { id } = useParams();
  const { state } = useAppData();
  const [myHarvest, setMyHarvest] = useState([]);

  useEffect(() => {
    getPlotHarvest(id)
  }, [state])

  const getPlotHarvest = function (id) {
    const myInfo = state.harvest.filter(plant => plant.plot_id === parseInt(id) && plant.planted_date !== null);
    setMyHarvest(myInfo)
  }

  return (
    <main className="harvest-card">
      <div className="harvest-container">
        <div className="harvest-hdr">Harvesting Schedule</div>
        <table className="harvest-schedule">
          <thead >
            <tr >
              <th></th>
              <th>PROGRESS</th>
              <th></th>
              <th>HARVEST</th>
            </tr>
          </thead>
          <tbody className="harvest-body">

            {myHarvest.map(x =>
              <tr>
                <td >
                  <img
                    className="sprout"
                    src={"../images/avatars/sprout.png"}
                    alt="sprout"
                  />
                </td>
                <td>
                  <div className="progress" >
                    <div className="progress-bar" style={{ width:getProgress(x.planted_date, x.harvest_date), backgroundColor:(x.colour) }}></div>
                  </div>
                </td>
                <td >
                  <img
                    className="avatar"
                    src={x.avatar_url}
                    alt="img"
                  />
                </td>
                <td>{getProgress(x.planted_date, x.harvest_date)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}