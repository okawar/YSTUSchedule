import React from "react";
import "../styles/tableSchedule.css";
import Cell from "./Cell";

export default function TableSchedule({data, schedule, timeSlots, weekDay, weeks }) {

  const {
    teacherData,
    groupData,
    auditoryData,
    selectedData,
    handleClick,
  } = data;

  return (
    <div>
      <table className="tableSchedule" border="1">
        <thead>
          <tr>
            <th>Часы</th>
            {weekDay.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, rowIndex) => (
            <tr key={rowIndex}>
              <td>{slot}</td>
              {weekDay.map((day, colIndex) => (
                <Cell
                data={{
                  teacherData,
                  groupData,
                  auditoryData,
                  selectedData,
                  handleClick, 

                }}
                  key={colIndex}
                  schedule={schedule}
                  timeSlot={slot}
                  weekDay={day}
                  weeks={weeks}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
