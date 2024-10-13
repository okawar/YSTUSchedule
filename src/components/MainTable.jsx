import React, { useState, useEffect } from 'react';

const MainTable = ({ data, selectedTeacher, selectedGroup, selectedAuditory, windowChange, selectedPulpit }) => {
    const [classroom, setClassroom] = useState(selectedAuditory || '');
    const [week, setWeek] = useState('');
    const [filter, setFilter] = useState(null);
    const [isFilterReady, setIsFilterReady] = useState(false);
    
    const timeSlots = ["08:30-10:00", "10:10-11:40", "11:50-13:20", "13:30-15:00", "15:10-16:40", "16:50-18:20", "18:30-20:00", "20:10-21:40", "21:50-23:20"];
    const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    
    const isWeekInRange = (weekRange, inputWeek) => {
        const [start, end] = weekRange.split('-').map(Number);
        const inputWeekNum = parseInt(inputWeek, 10);
        return inputWeekNum >= start && inputWeekNum <= end;
    };
    
    useEffect(() => {
        if (week && classroom) {
            setIsFilterReady(true);
        } else {
            setIsFilterReady(false);
        }
    }, [week, classroom]);
    
    const findCellState = (day, time) => {
        let isBusyBySelectedTeacher = false;
        let isBusyBySelectedGroup = false;
        let isBusyBySelectedAuditory = false;
        
        if (windowChange === 1 && selectedTeacher) {
            // Проверка занятости по преподавателю
            isBusyBySelectedTeacher = data.some(
                (entry) =>
                    entry.time === time &&
                    entry.day === day &&
                    entry.teacher === selectedTeacher &&
                    isWeekInRange(entry.week, week) &&
                    entry.auditory.includes(classroom)
            );
        }
        
        if (windowChange === 2 && selectedGroup) {
            // Проверка занятости по группе
            isBusyBySelectedGroup = data.some(
                (entry) =>
                    entry.time === time &&
                    entry.day === day &&
                    entry.group === selectedGroup &&
                    isWeekInRange(entry.week, week)
            );
        }
        
        if (windowChange === 3 && selectedAuditory) {
            // Проверка занятости по аудитории
            isBusyBySelectedAuditory = data.some(
                (entry) =>
                    entry.time === time &&
                    entry.day === day &&
                    entry.auditory.includes(selectedAuditory) &&
                    isWeekInRange(entry.week, week)
            );
        }
        
        return {
            isBusyBySelectedTeacher,
            isBusyBySelectedGroup,
            isBusyBySelectedAuditory,
        };
    };
    
    const getCellClass = (isBusyBySelectedTeacher, isBusyBySelectedGroup, isBusyBySelectedAuditory) => {
        if (windowChange === 1 && isBusyBySelectedTeacher) return "busy"; // Занято преподавателем
        if (windowChange === 2 && isBusyBySelectedGroup) return "busy"; // Занято группой
        if (windowChange === 3 && isBusyBySelectedAuditory) return "busy"; // Занято аудиторией
        return "free"; // Свободно
    };
    
    return (
        <div className="wrapper__table">
            <div className="table">
                <div className="header-grid">
                    {/* Input fields for filtering */}
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
                    {windowChange === 1 && <div className="prof-name">{selectedTeacher}</div>}
                    {windowChange === 2 && <div className="prof-name">{selectedGroup}</div>}
                    {windowChange === 3 && <div className="prof-name">{selectedAuditory}</div>}
                    <div className="department">Каф: {selectedPulpit}</div>
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
                    <div style={{ marginTop: "20px" }} className="notification">Пожалуйста, введите значения для недели и аудитории.</div>
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
                                        const { isBusyBySelectedTeacher, isBusyBySelectedGroup, isBusyBySelectedAuditory } = findCellState(day, time);
                                        const cellClass = getCellClass(isBusyBySelectedTeacher, isBusyBySelectedGroup, isBusyBySelectedAuditory);
                                        
                                        return (
                                            <div
                                                key={dayIndex}
                                                className={`cell ${cellClass}`}
                                            >
                                                {windowChange === 1 && isBusyBySelectedTeacher ? `Занято (${week})` : ""}
                                                {windowChange === 2 && isBusyBySelectedGroup ? `Занято (${week})` : ""}
                                                {windowChange === 3 && isBusyBySelectedAuditory ? `Занято (${week})` : ""}
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
    );
};

export default MainTable;
