import React, { useState, useEffect } from 'react';
import useAppData from "../hooks/useAppData";
import { useParams } from "react-router-dom";
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import './Maintenance.scss';
import Notifications from './Notifications';
import 'moment';
const moment = require('moment');

export default function Maintenance() {
  const [tasks, setTasks] = useState([]);
  const { state } = useAppData();
  const { id } = useParams();

  useEffect(() => {
    buildTasks(state.maintenance)
  }, [state])

  // builds the tasks for the plots. Used in Maintenance.jsx
  const buildTasks = function (tasks) {
    const waterdays = []
    const myTasks = tasks.filter(plant => plant.plot_id === parseInt(id) && plant.planted_date !== null);
    if (myTasks.length > 0) {
      myTasks.map(x => {
        let name = x.name
        let time = x.water_time
        let i = 1
        while (i < 10) {
          let waterObj = { name: `Water ${name}`, time: time * i }
          waterdays.push(waterObj)
          i++;
        }

        if (name === "Cauliflower") {
          waterdays.push({ name: `Water Cauliflower`, time: 0 })
        }
        if (name === "Potatoes") {
          waterdays.push({ name: `Water Potatoes`, time: 0 })
        } 
      })
      let t = 1;
      while (t < 5) {
        let weed = { name: "Weed Garden", time: 7 * t }
        let fertilize = { name: 'Fertilize Garden', time: 10 * t }
        waterdays.push(fertilize, weed)
        t++;
      }
      const sorted = waterdays.sort((a, b) => (a.time > b.time) ? 1 : -1);
      setTasks(sorted)
    }
  }
  
  const task_date = function (day) {
    const harvest_date = moment().add(day, 'days').endOf('day')
    const counter = moment(harvest_date).fromNow();
    return counter;
  }

  const removeTask = function (name, time) {
    const found = tasks.find(task => task.name === name && task.time === time);
    const newTasks = tasks.filter(task => task !== found);
    setTasks(newTasks);
  }

  const tasksToNotify = tasks.filter(task => task.time <= 1)

  return (
    <main className="chore-card">
      <Notifications tasks={tasksToNotify}
        />
      <div className="chore-container">
        <div className="chore-hdr">Garden Chores</div>
        <table className="chore-instructions">
          <thead >
            <tr >
              <th>TASK</th>
              <th>DATE</th>
              <th>DONE</th>
            </tr>
          </thead>
          <tbody >
            {tasks.map((x, i) =>
              <tr >
                <td>
                  <strong>{x.name}</strong>
                </td>
                <td>
                  {task_date(x.time)}
                </td>
                <td>
                    <CheckCircleRoundedIcon className="chore-done" onClick={() => removeTask(x.name, x.time)} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}