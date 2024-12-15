import React, { useState } from "react";
import "./App.css";
import Aside from "./components/Aside";
import Table from "./components/Table";

function App() {

  const [teacherData, setTeacherData] = useState({
    teacher1: {id: 1, name: "Крамная Е.С.", pulpit: "Ф"},
    teacher2: {id: 2, name: "Шулева Е.С.", pulpit: "ИС"},
    teacher3: {id: 3, name: "Воеводина Е.И.", pulpit: "ИС"},
  })

  const [groupData, setGroupData] = useState({
    group1: {id: 1, name: "ЦИС-38", pulpit: "ИС"},
    group2: {id: 2, name: "ЭЭ-12", pulpit: "ЭЭ"},
    group3: {id: 2, name: "ЭЭ-22", pulpit: "ЭЭ"},
  })

  const [auditoryData, setAuditoryData] = useState({
    auditory1: {id: 1, name: "Г-101", building: "Г"},
    auditory2: {id: 2, name: "А-332", building: "А"},
    auditory3: {id: 2, name: "А-331", building: "А"},
  })

  const [title, setTitle] = useState()

  const [selectedData, setSelectedData] = useState({
    teachers: [],
    groups: [],
    auditories: [],
    teachersFromCheckBox: [],
    groupsFromCheckBox: [],
    auditoriesFromCheckBox: [],
  }) 

  const [schedule, setSchedule] = useState([
    {week: "1-4", time: "10:10-11:40", teacherId: 1, auditoryId: 1, groupId: 2, business: true, day: "пн", subject: "Математика"},
    {week: "3", time: "10:10-11:40", teacherId: 2, auditoryId: 2, groupId: 1, business: true, day: "вт", subject: "Физика"},
    {week: "5-7", time: "14:00-15:30", teacherId: 2, auditoryId: 1, groupId: 2, business: true, day: "ср", subject: "Химия"},
    {week: "5-7", time: "14:00-15:30", teacherId: 3, auditoryId: 1, groupId: 1, business: true, day: "ср", subject: "Химия"},
  ]);
  

  const [weeks, setWeeks] = useState("");

  const [selectedCell, setSelectedCell] = useState(null); 


  const addElement = (type, elementId) => {
    const element = type === 'teachers' ? teacherData[elementId] :
                    type === 'groups' ? groupData[elementId] :
                    type === 'auditories' ? auditoryData[elementId] : null;
  
    if (element) {
      setSelectedData(prevData => {
        if (!prevData[type].some(e => e.id === element.id)) { 
          return {
            ...prevData,
            [type]: [...prevData[type], element]
          };
        }
        return prevData;
      });
    }
  };
  

  const clearList = (type) => {
    setSelectedData(prevData => {
      const updatedData = {
        ...prevData,
        [type]: [],
      };

      if (type === "teachers") {
        updatedData.teachersFromCheckBox = [];
      } else if (type === "groups") {
        updatedData.groupsFromCheckBox = [];
      } else if (type === "auditories") {
        updatedData.auditoriesFromCheckBox = [];
      }

      return updatedData;
    });
  };

  const setElementsFromCheckBox = (type, updater) => {
    setSelectedData((prevData) => ({
        ...prevData,
        [type]: updater(prevData[type]),
    }));
};

const handleClick = (cell) => {
  if (cell) {
    const selectedCellsData = schedule
      .filter(item => item.day === cell.day && item.time === cell.time)
      .map(item => ({
        day: item.day,
        time: item.time,
        teacherName: teacherData[`teacher${item.teacherId}`]?.name,
        subject: item.subject,
        groupName: groupData[`group${item.groupId}`]?.name,
        auditoryName: auditoryData[`auditory${item.auditoryId}`]?.name,
        building: auditoryData[`auditory${item.auditoryId}`]?.building,
      }));
    setSelectedCell(selectedCellsData);
  }
};

const isValidSchedule = (newSchedule) => {
  const seen = new Set();
  for (const item of newSchedule) {
    const key = `${item.teacherId}-${item.auditoryId}-${item.groupId}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
  }
  return true;
};

const addScheduleItem = (newItem) => {
  const newSchedule = [...schedule, newItem];
  if (isValidSchedule(newSchedule)) {
    setSchedule(newSchedule);
  } else {
    console.error('Schedule conflict detected!');
  }
};



  return (
    <div className="App">
      <h2>Расписание</h2>
      <div className="container">
        <div className="wrapper">
          <Aside 
            data={{
              teacherData,
              groupData,
              auditoryData,
              selectedData,
              addElement,
              clearList,
              setElementsFromCheckBox,
              setSelectedData,
              selectedCell,
              setSelectedCell
            }}
            title={title}
            setTitle={setTitle}
          />
          <Table 
           data={{
            teacherData,
            groupData,
            auditoryData,
            selectedData,
            addElement,
            clearList,
            setSelectedCell,
            handleClick,
            setSelectedData,
            setSchedule,
            schedule
          }}
          weeks={weeks}
          setWeeks={setWeeks}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
