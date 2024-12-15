import React from "react";
import "../styles/table.css";
import TableSchedule from "../ui/TableSchedule";

export default function Table({ data, weeks, setWeeks }) {
  const timeSlots = [
    "8:30-10:30",
    "10:10-11:40",
    "12:20-13:50",
    "14:00-15:30",
    "15:40-17:10",
    "17:20-19:00",
  ];
  const weekDay = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

  const {
    teacherData,
    groupData,
    auditoryData,
    selectedData,
    handleClick,
    setSelectedData,
    setSchedule,
    schedule
  } = data;

  const getPulpit = (name, data) => {
    const item = Object.values(data).find(item => item.name === name);
    return item ? item.pulpit : '';
  };

  const handleWeeksChange = (e) => {
    setWeeks(e.target.value);
  };

  const handleRemoveElement = (type, element) => {
    setSelectedData((prevData) => ({
      ...prevData,
      [type]: prevData[type].filter(e => e.id !== element.id),
    }));
  };
  
  

  const isDataSelected = selectedData.teachersFromCheckBox.length > 0 ||
                         selectedData.groupsFromCheckBox.length > 0 ||
                         selectedData.auditoriesFromCheckBox.length > 0;

  const isWeeksEntered = weeks.trim() !== '';

  return (
    <div className="table">
      <div className="header">
        <div className="input-cell">
          <input
            style={{
              border: "1px solid #000",
              padding: "10px 15px",
              borderRadius: "15px",
            }}
            type="text"
            placeholder="Недели"
            value={weeks}
            onChange={handleWeeksChange}
          />
        </div>
        <div
          style={{ paddingTop: "20px", paddingLeft: "20px" }}
          className="teacher-cell"
        >
          {selectedData.teachersFromCheckBox.map((element, index) => (
            <div key={index} style={{ paddingTop: "10px" }}>
              {element.name}
              <button onClick={() => handleRemoveElement('teachersFromCheckBox', element)}>Удалить</button>
            </div>
          ))}
          {selectedData.groupsFromCheckBox.map((element, index) => (
            <div key={index} style={{ paddingTop: "10px" }}>
              {element.name}
              <button onClick={() => handleRemoveElement('groupsFromCheckBox', element)}>Удалить</button>
            </div>
          ))}
          {selectedData.auditoriesFromCheckBox.map((element, index) => (
            <div key={index} style={{ paddingTop: "10px" }}>
              {element.name}
              <button onClick={() => handleRemoveElement('auditoriesFromCheckBox', element)}>Удалить</button>
            </div>
          ))}
        </div>
        <div className="department-cell">
          <div style={{ paddingTop: "10px" }}>
            {selectedData.teachersFromCheckBox.map((element, index) => (
              <div key={index} style={{ paddingTop: "10px" }}>
                Каф: {getPulpit(element.name, teacherData)}
              </div>
            ))}
            {selectedData.groupsFromCheckBox.map((element, index) => (
              <div key={index} style={{ paddingTop: "10px" }}>
                Каф: {getPulpit(element.name, groupData)}
              </div>
            ))}
          </div>
          <div></div>
        </div>
      </div>

      <div className="mainTable">
        {isDataSelected && isWeeksEntered ? (
          <TableSchedule
            data={{
              teacherData,
              groupData,
              auditoryData,
              selectedData,
              handleClick,
            }}
            weekDay={weekDay}
            timeSlots={timeSlots}
            schedule={schedule}
            weeks={weeks}
          />
        ) : (
          <p>Выберите категорию (-ии) и введите недели</p>
        )}
      </div>
    </div>
  );
}
