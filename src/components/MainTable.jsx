import React, { useState, useEffect } from 'react';

const MainTable = ({ data, selectedTeacher, selectedGroup, selectedAuditory, windowChange, selectedPulpit }) => {
    const [classroom, setClassroom] = useState(selectedAuditory || '');
    const [week, setWeek] = useState('');
    const [filter, setFilter] = useState(null);
    const [isFilterReady, setIsFilterReady] = useState(false);
    
    const timeSlots = ["08:30-10:00", "10:10-11:40", "11:50-13:20", "13:30-15:00", "15:10-16:40", "16:50-18:20", "18:30-20:00", "20:10-21:40", "21:50-23:20"];
    const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    
    const isWeekInRange = (weekRange, inputWeek) => {
        const weeksInRange = weekRange.split('-').map(Number);
        const inputWeekNum = parseInt(inputWeek, 10);
        
        if (weeksInRange.length === 1) {
            return inputWeekNum === weeksInRange[0];
        } else {
            const [start, end] = weeksInRange;
            return inputWeekNum >= start && inputWeekNum <= end;
        }
    };
    
    
    const findFreeWeeks = (occupiedWeeks, currentWeekRange) => {
        const [startWeek, endWeek] = currentWeekRange.split('-').map(Number);
        let freeWeeks = [];
        
        for (let week = startWeek; week <= endWeek; week++) {
            if (!occupiedWeeks.includes(week.toString())) {
                freeWeeks.push(week);
            }
        }
        
        return freeWeeks;
    };
    
    useEffect(() => {
        if (week && classroom) {
            setIsFilterReady(true);
        } else {
            setIsFilterReady(false);
        }
    }, [week, classroom]);
    
    const findCellState = (day, time) => {
        let occupiedWeeksBySelectedTeacher = [];
        let occupiedWeeksByOtherTeacher = [];
        let isConflict = false;
        
        if (windowChange === 1 && selectedTeacher) {
            data.forEach(entry => {
                if (entry.time === time && entry.day === day && entry.auditory.includes(classroom)) {
                    let weeksInRange = [];
                    
                    entry.week.split(',').forEach(weekRange => {
                        weekRange = weekRange.trim();
                        
                        if (weekRange.includes('-')) {
                            const [startWeek, endWeek] = weekRange.split('-').map(Number);
                            for (let i = startWeek; i <= endWeek; i++) {
                                weeksInRange.push(i.toString());
                            }
                        } else {
                            weeksInRange.push(weekRange);
                        }
                    });
                    
                    if (weeksInRange.some(w => isWeekInRange(w, week))) {
                        if (entry.teacher === selectedTeacher) {
                            occupiedWeeksBySelectedTeacher.push(...weeksInRange);
                        } else {
                            occupiedWeeksByOtherTeacher.push(...weeksInRange);
                            isConflict = true;
                        }
                    }
                }
            });
        }
        
        return {
            occupiedWeeksBySelectedTeacher,
            occupiedWeeksByOtherTeacher,
            isConflict,
        };
    };
    
    
    const getCellContent = (occupiedWeeksBySelectedTeacher, occupiedWeeksByOtherTeacher, currentWeekRange) => {
        let freeWeeks = findFreeWeeks(occupiedWeeksByOtherTeacher, currentWeekRange);
        
        if (occupiedWeeksBySelectedTeacher.length > 0) {
            return `Занято (${formatWeeks(occupiedWeeksBySelectedTeacher)})`;
        } else if (freeWeeks.length > 0) {
            return `Свободно (${formatWeeks(freeWeeks)})`;
        }
        return '';
    };
    
    const formatWeeks = (weeks) => {
        let formattedWeeks = [];
        let currentRange = [weeks[0]];
        
        for (let i = 1; i < weeks.length; i++) {
            if (weeks[i] === weeks[i - 1] + 1) {
                currentRange.push(weeks[i]);
            } else {
                formattedWeeks.push(currentRange.length > 1 ? `${currentRange[0]}-${currentRange[currentRange.length - 1]}` : currentRange[0]);
                currentRange = [weeks[i]];
            }
        }
        
        formattedWeeks.push(currentRange.length > 1 ? `${currentRange[0]}-${currentRange[currentRange.length - 1]}` : currentRange[0]);
        
        return formattedWeeks.join(', ');
    };

    
    
    const getCellClass = (isConflict, occupiedWeeksBySelectedTeacher) => {
        if (isConflict) return "conflict";
        if (occupiedWeeksBySelectedTeacher.length > 0) return "busy";
        return "free";
    };

    
    return (
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
                                        const { occupiedWeeksBySelectedTeacher, occupiedWeeksByOtherTeacher, isConflict } = findCellState(day, time);
                                        const cellClass = getCellClass(isConflict, occupiedWeeksBySelectedTeacher);
                                        const cellContent = getCellContent(occupiedWeeksBySelectedTeacher, occupiedWeeksByOtherTeacher, week);
                                        
                                        return (
                                            <div
                                                key={dayIndex}
                                                className={`cell ${cellClass}`}
                                            >
                                                {isConflict ? '' : cellContent}
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
