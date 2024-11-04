import React, { useState, useEffect } from 'react';
import MainList from "./components/MainList";
import MainTable from "./components/MainTable";

import './styles/main.css';
import './styles/card.css';
import './styles/table.css';

function App() {
    const [data, setData] = useState([
        { teacher: "Крамная Е.С.", pulpit: "Ф", week: "2-3", time: "08:30-10:00", business: true, auditory: "Г101", auditoryType: "m/m", group: "ЦИС-38", day: "Вт", building: "А" },
        { teacher: "Шулёва Ю.Н.", pulpit: "ИС", week: "1-4", time: "10:10-11:40", business: false, auditory: "Г101", auditoryType: "m/m", group: "ЦИСБ-34", day: "Вт", building: "А" },
        { teacher: "Крамная Е.С.", pulpit: "Ф", week: "13-17", time: "13:30-15:00", business: true, auditory: "Г102", auditoryType: "potok", group: "ЦИС-38", day: "Чт", building: "Б" },
        { teacher: "Шулева Е.С.", pulpit: "Ф", week: "11-14", time: "13:30-15:00", business: true, auditory: "Г101", auditoryType: "m/m", group: "ЦИС-38", day: "Чт", building: "Г" },
        { teacher: "Комсомольская А.И.", pulpit: "Х", week: "7-15", time: "13:30-15:00", business: true, auditory: "В302", auditoryType: "c/c", group: "ХИМ-23", day: "Пт", building: "В" },
    ]);
    
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedAuditory, setSelectedAuditory] = useState(null);
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [windowChange, setWindowChange] = useState(0);
    
    const handleCellClick = (day, time) => {
        setSelectedDay(day);
        setSelectedTime(time);
    };
    
    
    return (
        <div className="App">
            <div className="container">
                <div className="main">
                    <MainList
                        data={data}
                        setWindowChange={setWindowChange}
                        setSelectedTeacher={setSelectedTeacher}
                        setSelectedGroup={setSelectedGroup}
                        setSelectedAuditory={setSelectedAuditory}
                        setSelectedBuilding={setSelectedBuilding}
                        selectedDay={selectedDay}
                        selectedTime={selectedTime}
                    />
                    <MainTable
                        data={data}
                        selectedTeacher={selectedTeacher}
                        selectedGroup={selectedGroup}
                        selectedAuditory={selectedAuditory}
                        selectedBuilding={selectedBuilding}
                        windowChange={windowChange}
                        handleCellClick = {handleCellClick}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
