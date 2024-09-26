import React, { useState } from 'react';

const MainTable = ({ selectedTeachers, weekData }) => {
    const [classroom, setClassroom] = useState('');
    const [filter, setFilter] = useState(null); // Новое состояние для фильтра: 'free', 'busy', или null для отображения всех
    
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
    
    const filteredWeekData = weekData.filter(
        (entry) =>
            selectedTeachers.includes(entry.teacher) &&
            entry.auditory.includes(classroom)
    );
    
    const isBusyCell = (day, time) => {
        return filteredWeekData.some(
            (entry) => entry.week.includes(day) && entry.time === time
        );
    };
    
    const getCellClass = (isBusy) => {
        if (filter === "free" && isBusy) return "hidden"; // Скрывать занятые при фильтре на свободные
        if (filter === "busy" && !isBusy) return "hidden"; // Скрывать свободные при фильтре на занятые
        return isBusy ? "busy-cell" : "free-cell"; // Показывать по умолчанию
    };
    
    return (
        <div>
            <div className="wrapper__table">
                <div className="table">
                    <div className="header-grid">
                        <div className="input-group" id="input1">
                            <label htmlFor="week">Нед.:</label>
                            <input type="text" id="week" className="input-field" placeholder="Search week" />
                        </div>
                        <div className="prof-name">{selectedTeachers.join(", ")}</div>
                        <div className="department">Каф: Ф</div>
                        <div className="input-group" id="input2">
                            <label htmlFor="auditory">Аудитория:</label>
                            <input
                                type="text"
                                id="auditory"
                                className="input-field"
                                placeholder="Search classroom"
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
                            <button className="btn all" onClick={() => setFilter(null)}>
                                все
                            </button>
                        </div>
                    </div>
                    
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
                                        const cellClass = getCellClass(isBusy); // Получить CSS-класс ячейки на основе фильтра
                                        
                                        return (
                                            <div
                                                key={dayIndex}
                                                className={`cell ${cellClass}`} // Применить CSS-класс
                                            >
                                                {isBusy ? "Занято" : "Свободно"}
                                            </div>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainTable;
