import React, { useState, useEffect } from 'react';

const MainTable = ({ data, selectedTeacher, selectedGroup, selectedAuditory, windowChange, selectedPulpit, handleCellClick }) => {
    const [classroom, setClassroom] = useState(selectedAuditory || '');
    const [week, setWeek] = useState('');
    const [filter, setFilter] = useState(null);
    const [isFilterReady, setIsFilterReady] = useState(false);
    
    const timeSlots = ["08:30-10:00", "10:10-11:40", "11:50-13:20", "13:30-15:00", "15:10-16:40", "16:50-18:20", "18:30-20:00", "20:10-21:40", "21:50-23:20"];
    const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
    
    const isWeekInRange = (weekRange, inputWeekRange) => {
        const [startInputWeek, endInputWeek] = inputWeekRange.split('-').map(Number);
        const weeksInRange = weekRange.split('-').map(Number);
        
        if (weeksInRange.length === 1) {
            return weeksInRange[0] >= startInputWeek && weeksInRange[0] <= endInputWeek;
        } else {
            const [startWeek, endWeek] = weeksInRange;
            return (
                (startWeek >= startInputWeek && startWeek <= endInputWeek) ||
                (endWeek >= startInputWeek && endWeek <= endInputWeek) ||
                (startInputWeek >= startWeek && endInputWeek <= endWeek)
            );
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
    //
    // useEffect(() => {
    //     // Updated logic here
    //     if (week && (windowChange !== 3 ? classroom : selectedAuditory)) {
    //         setIsFilterReady(true);
    //     } else {
    //         setIsFilterReady(false);
    //     }
    // }, [week, selectedAuditory, classroom, windowChange]);
    
    const findCellState = (day, time) => {
        let occupiedWeeksBySelected = [];
        let occupiedWeeksByOther = [];
        let isConflict = false;
        
        // Логика для преподавателей
        if (windowChange === 1 && selectedTeacher) {
            data.forEach(entry => {
                if (entry.time === time && entry.day === day && (!classroom || entry.auditory.includes(classroom))) {
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
                            occupiedWeeksBySelected.push(...weeksInRange);
                        } else {
                            occupiedWeeksByOther.push(...weeksInRange);
                            isConflict = true;
                        }
                    }
                }
            });
        }
        // Логика для групп
        else if (windowChange === 2 && selectedGroup) {
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
                        if (entry.group === selectedGroup) {
                            occupiedWeeksBySelected.push(...weeksInRange);
                        } else {
                            occupiedWeeksByOther.push(...weeksInRange);
                            isConflict = true;
                        }
                    }
                }
            });
        }
        // Логика для аудиторий
        else if (windowChange === 3 && selectedAuditory) {
            data.forEach(entry => {
                if (entry.time === time && entry.day === day && entry.auditory.includes(selectedAuditory)) {
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
                        if (entry.auditory === selectedAuditory) {
                            occupiedWeeksBySelected.push(...weeksInRange);
                        } else {
                            occupiedWeeksByOther.push(...weeksInRange);
                            isConflict = true;
                        }
                    }
                }
            });
        }
        
        return {
            occupiedWeeksBySelected,
            occupiedWeeksByOther,
            isConflict,
        };
    };

    
    const formatWeeks = (weeks) => {
        if (weeks.length === 0) return '';
        let formattedWeeks = [];
        let currentRange = [parseInt(weeks[0], 10)];
        
        for (let i = 1; i < weeks.length; i++) {
            const currentWeek = parseInt(weeks[i], 10);
            if (currentWeek === currentRange[currentRange.length - 1] + 1) {
                currentRange.push(currentWeek);
            } else {
                formattedWeeks.push(`${currentRange[0]}-${currentRange[currentRange.length - 1]}`);
                currentRange = [currentWeek];
            }
        }
        
        formattedWeeks.push(`${currentRange[0]}-${currentRange[currentRange.length - 1]}`);
        
        return formattedWeeks.join(', ');
    };
    
    const getCellContent = (occupiedWeeksBySelected, occupiedWeeksByOther, currentWeekRange) => {
        let freeWeeks = findFreeWeeks(occupiedWeeksByOther, currentWeekRange);
        
        if (occupiedWeeksBySelected.length > 0) {
            return `Занято (${formatWeeks(occupiedWeeksBySelected)})`;
        }
        if (freeWeeks.length > 0) {
            return `Свободно (${formatWeeks(freeWeeks)})`;
        }
        return '';
        // if (freeWeeks.length > 0) {
        //     return `Свободные недели: (${formatWeeks(freeWeeks)})`;
        // }
        // return '';
    };
    
    const getCellClass = (isConflict, occupiedWeeksBySelected) => {
        if (isConflict) return "conflict";
        if (occupiedWeeksBySelected.length > 0) return "busy";
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
                            placeholder="Введите неделю (формат: 1-17)"
                            value={week}
                            onChange={(e) => setWeek(e.target.value)}
                        />
                    </div>
                    {windowChange === 1 && <div className="prof-name">{selectedTeacher}</div>}
                    {windowChange === 2 && <div className="prof-name">{selectedGroup}</div>}
                    {windowChange === 3 && <div className="prof-name">{selectedAuditory}</div>}
                    <div className="department">Каф: {selectedPulpit}</div>
                    
                    {windowChange !== 3 ?
                        <div className="input-group" id="input2">
                            <label htmlFor="auditory">{windowChange === 1 ? 'Аудитория:' : 'Аудитория:'}</label>
                            <input
                                type="text"
                                id="auditory"
                                className="input-field"
                                placeholder={windowChange === 1 ? "Введите аудиторию" : "Введите аудиторию"}
                                value={classroom}
                                onChange={(e) => setClassroom(e.target.value)}
                            />
                        </div>
                        :
                        null
                    }
                    
                    
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
                
                {/*{!isFilterReady ? (*/}
                {/*    <div style={{marginTop: "20px"}} className="notification">*/}
                {/*        Пожалуйста, введите значения для недели*/}
                {/*        и {windowChange === 1 ? 'аудитории' : windowChange === 2 ? 'группы' : 'аудитории'}.*/}
                {/*    </div>*/}
                {/*) : (*/}
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
                                        const { occupiedWeeksBySelected, occupiedWeeksByOther, isConflict } = findCellState(day, time);
                                        const cellClass = getCellClass(isConflict, occupiedWeeksBySelected);
                                        const cellContent = getCellContent(occupiedWeeksBySelected, occupiedWeeksByOther, week);
                                        
                                        if (classroom && windowChange !== 3){
                                            const hasMatchingAuditory = data.some(entry =>
                                                entry.time === time && entry.day === day && entry.auditory.includes(classroom)
                                            )
                                        }
                                        
                                        return (
                                            <div
                                                key={dayIndex}
                                                className={`cell ${cellClass}`}
                                                onClick={() => handleCellClick(day, time)}
                                            
                                            >
                                                {cellContent}
                                            </div>
                                        );
                                    })}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                {/*)}*/}
            </div>
        </div>
    );
};

export default MainTable;
