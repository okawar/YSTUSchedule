import React, { useState, useEffect } from 'react';

const MainTable = ({ data, selectedTeacher, selectedGroup, selectedAuditory, windowChange }) => {
    const [classroom, setClassroom] = useState(selectedAuditory || '');
    const [week, setWeek] = useState('');
    const [filter, setFilter] = useState(null);
    const [filteredWeekData, setFilteredWeekData] = useState([]);

    console.log(windowChange)

    const timeSlots = [
        "08:30-10:00",
        "10:10-11:40",
        "11:50-13:20",
        "13:30-15:00",
        "15:10-16:40",
        "16:50-18:20",
        "18:30-20:00",
        "20:10-21:40",
        "21:50-23:20",
    ];

    const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    const isWeekInRange = (weekRange, inputWeek) => {
        const [start, end] = weekRange.split('-').map(Number);
        const inputWeekNum = parseInt(inputWeek, 10);
        return inputWeekNum >= start && inputWeekNum <= end;
    };

    useEffect(() => {
        const updatedData = data.filter((entry) => {
            const weekMatch = week ? isWeekInRange(entry.week, week) : true;
            const classroomMatch = classroom ? entry.auditory.includes(classroom) : true;
            const teacherMatch = selectedTeacher ? entry.teacher === selectedTeacher : true;
            const groupMatch = selectedGroup ? entry.group === selectedGroup : true;
            return weekMatch && classroomMatch && teacherMatch && groupMatch;
        });
        setFilteredWeekData(updatedData);
    }, [week, classroom, selectedTeacher, selectedGroup, data]);

    const isBusyCell = (day, time) => {
        return filteredWeekData.some(
            (entry) => entry.time === time && entry.day === day
        );
    };

    const getCellClass = (isBusy) => {
        if (filter === "free" && isBusy) return "hidden";
        if (filter === "busy" && !isBusy) return "hidden";
        return isBusy ? "busy-cell" : "free-cell";
    };

    const isFilterReady = week.trim() !== '' && classroom.trim() !== '';

    if (windowChange === 0) {
        return (
            <div>
                <div className="wrapper__table">
                    <div className="table">
                        <div className="header-grid">
                            <div className="input-group" id="input1">
                                <label htmlFor="week">Неделя:</label>
                                <input
                                    type="text"
                                    id="week"
                                    className="input-field"
                                    placeholder="Введите неделю (формат: 1-2, 3-7)"
                                    value={week}
                                    onChange={(e) => setWeek(e.target.value)}
                                />
                            </div>
                            <div className="prof-name">{selectedTeacher}</div>
                            <div className="department">Каф: Ф</div>
                            <div className="input-group" id="input2">
                                <label htmlFor="auditory">Аудитория:</label>
                                <input
                                    type="text"
                                    id="auditory"
                                    className="input-field"
                                    placeholder="Введите аудиторию"
                                    value={classroom}
                                    onChange={(e) => setClassroom(e.target.value)}
                                />
                            </div>
                            <div className="input-group" id="input3">
                                <label htmlFor="pps">ППС:</label>
                                <input type="text" id="pps" className="input-field" placeholder="Search PPS" />
                            </div>
                            <div className="buttons">
                                <button
                                    className={`btn free ${filter === "free" ? "active" : ""}`}
                                    onClick={() => setFilter("free")}
                                >
                                    своб
                                </button>
                                <button
                                    className={`btn busy ${filter === "busy" ? "active" : ""}`}
                                    onClick={() => setFilter("busy")}
                                >
                                    зан
                                </button>
                            </div>
                        </div>
    
                        {!isFilterReady ? (
                            <div style={{marginTop: "20px"}} className="notification">Пожалуйста, введите значения для недели и аудитории.</div>
                        ) : (
                            <div className="table__body">
                                <div className="schedule-container">
                                    <div className="header cell">Часы</div>
                                    {daysOfWeek.map((day, index) => (
                                        <div key={index} className="header cell">{day}</div>
                                    ))}
    
                                    {timeSlots.map((time, index) => (
                                        <React.Fragment key={index}>
                                            <div className="time-cell cell">{time}</div>
                                            {daysOfWeek.map((day, dayIndex) => {
                                                const isBusy = isBusyCell(day, time);
                                                const cellClass = getCellClass(isBusy);
    
                                                return (
                                                    <div
                                                        key={dayIndex}
                                                        className={`cell ${cellClass}`}
                                                    >
                                                        {isBusy ? "Занято" : "Свободно"}
                                                    </div>
                                                );
                                            })}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }


    if (windowChange === 1) {
        return (
            <div>
                <div className="wrapper__table">
                    <div className="table">
                        <div className="header-grid">
                            <div className="input-group" id="input1">
                                <label htmlFor="week">Неделя:</label>
                                <input
                                    type="text"
                                    id="week"
                                    className="input-field"
                                    placeholder="Введите неделю (формат: 1-2, 3-7)"
                                    value={week}
                                    onChange={(e) => setWeek(e.target.value)}
                                />
                            </div>
                            <div className="prof-name">{selectedTeacher}</div>
                            <div className="department">Каф: Ф</div>
                            <div className="input-group" id="input2">
                                <label htmlFor="auditory">Аудитория:</label>
                                <input
                                    type="text"
                                    id="auditory"
                                    className="input-field"
                                    placeholder="Введите аудиторию"
                                    value={classroom}
                                    onChange={(e) => setClassroom(e.target.value)}
                                />
                            </div>

                            <div className="buttons">
                                <button
                                    className={`btn free ${filter === "free" ? "active" : ""}`}
                                    onClick={() => setFilter("free")}
                                >
                                    своб
                                </button>
                                <button
                                    className={`btn busy ${filter === "busy" ? "active" : ""}`}
                                    onClick={() => setFilter("busy")}
                                >
                                    зан
                                </button>
                            </div>
                        </div>
    
                        {!isFilterReady ? (
                            <div style={{marginTop: "20px"}} className="notification">Пожалуйста, введите значения для недели и аудитории.</div>
                        ) : (
                            <div className="table__body">
                                <div className="schedule-container">
                                    <div className="header cell">Часы</div>
                                    {daysOfWeek.map((day, index) => (
                                        <div key={index} className="header cell">{day}</div>
                                    ))}
    
                                    {timeSlots.map((time, index) => (
                                        <React.Fragment key={index}>
                                            <div className="time-cell cell">{time}</div>
                                            {daysOfWeek.map((day, dayIndex) => {
                                                const isBusy = isBusyCell(day, time);
                                                const cellClass = getCellClass(isBusy);
    
                                                return (
                                                    <div
                                                        key={dayIndex}
                                                        className={`cell ${cellClass}`}
                                                    >
                                                        {isBusy ? "Занято" : "Свободно"}
                                                    </div>
                                                );
                                            })}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (windowChange === 2) {
        return (
            <div>
                <div className="wrapper__table">
                    <div className="table">
                        <div className="header-grid">
                            <div className="input-group" id="input1">
                                <label htmlFor="week">Неделя:</label>
                                <input
                                    type="text"
                                    id="week"
                                    className="input-field"
                                    placeholder="Введите неделю (формат: 1-2, 3-7)"
                                    value={week}
                                    onChange={(e) => setWeek(e.target.value)}
                                />
                            </div>
                            <div className="prof-name">{selectedTeacher}</div>
                            <div className="department">Каф: Ф</div>
                            <div className="input-group" id="input2">
                                <label htmlFor="auditory">Аудитория:</label>
                                <input
                                    type="text"
                                    id="auditory"
                                    className="input-field"
                                    placeholder="Введите аудиторию"
                                    value={classroom}
                                    onChange={(e) => setClassroom(e.target.value)}
                                />
                            </div>

                            <div className="buttons">
                                <button
                                    className={`btn free ${filter === "free" ? "active" : ""}`}
                                    onClick={() => setFilter("free")}
                                >
                                    своб
                                </button>
                                <button
                                    className={`btn busy ${filter === "busy" ? "active" : ""}`}
                                    onClick={() => setFilter("busy")}
                                >
                                    зан
                                </button>
                            </div>
                        </div>
    
                        {!isFilterReady ? (
                            <div style={{marginTop: "20px"}} className="notification">Пожалуйста, введите значения для недели и аудитории.</div>
                        ) : (
                            <div className="table__body">
                                <div className="schedule-container">
                                    <div className="header cell">Часы</div>
                                    {daysOfWeek.map((day, index) => (
                                        <div key={index} className="header cell">{day}</div>
                                    ))}
    
                                    {timeSlots.map((time, index) => (
                                        <React.Fragment key={index}>
                                            <div className="time-cell cell">{time}</div>
                                            {daysOfWeek.map((day, dayIndex) => {
                                                const isBusy = isBusyCell(day, time);
                                                const cellClass = getCellClass(isBusy);
    
                                                return (
                                                    <div
                                                        key={dayIndex}
                                                        className={`cell ${cellClass}`}
                                                    >
                                                        {isBusy ? "Занято" : "Свободно"}
                                                    </div>
                                                );
                                            })}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (windowChange === 3) {
        return (
            <div>
                <div className="wrapper__table">
                    <div className="table">
                        <div className="header-grid">
                            <div className="input-group" id="input1">
                                <label htmlFor="week">Неделя:</label>
                                <input
                                    type="text"
                                    id="week"
                                    className="input-field"
                                    placeholder="Введите неделю (формат: 1-2, 3-7)"
                                    value={week}
                                    onChange={(e) => setWeek(e.target.value)}
                                />
                            </div>
                            <div className="prof-name">{selectedTeacher}</div>
                            <div className="department">Каф: Ф</div>
                            <div className="input-group" id="input3">
                                <label htmlFor="pps">ППС:</label>
                                <input type="text" id="pps" className="input-field" placeholder="Search PPS" />
                            </div>

                            <div className="buttons">
                                <button
                                    className={`btn free ${filter === "free" ? "active" : ""}`}
                                    onClick={() => setFilter("free")}
                                >
                                    своб
                                </button>
                                <button
                                    className={`btn busy ${filter === "busy" ? "active" : ""}`}
                                    onClick={() => setFilter("busy")}
                                >
                                    зан
                                </button>
                            </div>
                        </div>
    
                        {!isFilterReady ? (
                            <div className="notification">Пожалуйста, введите значения для недели и аудитории.</div>
                        ) : (
                            <div className="table__body">
                                <div className="schedule-container">
                                    <div className="header cell">Часы</div>
                                    {daysOfWeek.map((day, index) => (
                                        <div key={index} className="header cell">{day}</div>
                                    ))}
    
                                    {timeSlots.map((time, index) => (
                                        <React.Fragment key={index}>
                                            <div className="time-cell cell">{time}</div>
                                            {daysOfWeek.map((day, dayIndex) => {
                                                const isBusy = isBusyCell(day, time);
                                                const cellClass = getCellClass(isBusy);
    
                                                return (
                                                    <div
                                                        key={dayIndex}
                                                        className={`cell ${cellClass}`}
                                                    >
                                                        {isBusy ? "Занято" : "Свободно"}
                                                    </div>
                                                );
                                            })}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
    
};

export default MainTable;
