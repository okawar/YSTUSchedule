import React, { useState, useEffect } from 'react';

const MainList = ({ data, setSelectedTeacher, setSelectedGroup, setSelectedAuditory, setWindowChange, setSelectedBuilding, selectedDay, selectedTime }) => {
    const [windowChangeLocal, setWindowChangeLocal] = useState(0);
    
    // Для преподавателей
    const [selectedTeacherLocal, setSelectedTeacherLocal] = useState(null);
    const teachers = [...new Set(data.map(item => item.teacher))];
    
    // Для групп
    const [selectedGroupLocal, setSelectedGroupLocal] = useState(null);
    const groups = [...new Set(data.map(item => item.group))];
    
    // Для аудиторий
    const [selectedAuditoryLocal, setSelectedAuditoryLocal] = useState(null);
    const [selectedAuditoryType, setSelectedAuditoryType] = useState(null);
    const auditories = [...new Set(data.map(item => item.auditory))];
    
    const [selectedBuildingLocal, setSelectedBuildingLocal] = useState(null);
    const buildings = [...new Set(data.map(item => item.building))];
    
    const [selectedBuildingCondition, setSelectedBuildingCondition] = useState(0);
    
    const [filteredAuditoriesByBuilding, setFilteredAuditoriesByBuilding] = useState([]);
    
    const handleCheckboxChangeTeachers = (teacher) => {
        setSelectedTeacherLocal(teacher);
        setSelectedTeacher(teacher);
    };
    
    const handleCheckboxChangeGroups = (group) => {
        setSelectedGroupLocal(group);
        setSelectedGroup(group);
    };
    
    const handleCheckboxChangeAuditories = (auditory) => {
        setSelectedAuditoryLocal(auditory);
        setSelectedAuditory(auditory);
    };
    
    const handleAuditoryTypeChange = (type) => {
        setSelectedAuditoryType(type);
    };
    
    const handleCheckboxChangeBuildings = (building) => {
        setSelectedBuildingLocal(building);
        setSelectedBuilding(building);
        setSelectedBuildingCondition(1);
        filterAuditoriesByBuilding(building);
    }
    
    // Фильтрация аудиторий по выбранному типу аудитории
    const filteredData = selectedAuditoryType
        ? data.filter(item => item.auditoryType === selectedAuditoryType)
        : data;
    
    const filteredAuditories = [...new Set(filteredData.map(item => item.auditory))];
    
    const filterAuditoriesByBuilding = (building) => {
        const filtered = filteredAuditories.filter((auditory) => auditory.startsWith(building));
        setFilteredAuditoriesByBuilding(filtered);
    };
    
    
    const filteredDataDay = data.filter(item => item.day === selectedDay && item.time === selectedTime);
    
    useEffect(() => {
        if (selectedDay && selectedTime) {
            setWindowChangeLocal(-1);  // Устанавливаем специальное состояние для отображения расписания на выбранный день и время
        }
    }, [selectedDay, selectedTime]);
    
    
    if (windowChangeLocal === -1) {
        return (
            <div>
                <div className="wrapper__card">
                    <div className="card">
                        <button onClick={() => setWindowChangeLocal(0)}>Назад</button>
                        <h2 className="card__name">
                            Расписание на {selectedDay}, {selectedTime}
                        </h2>
                        <div className="card__body">
                            {filteredDataDay.length > 0 ? (
                                filteredDataDay.map((item, index) => (
                                    <div key={index} style={{ marginBottom: "10px" }}>
                                        <p>
                                            ({item.week}) {item.subject} {item.teacher} ({item.group}) {item.auditory}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>Нет занятий в это время.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    if (windowChangeLocal === 0) {
        return (
            <div>
                <div className="wrapper__card">
                    <div className="card">
                        <div className="card__name">Выберите категорию</div>
                        <div style={{ display: "flex", flexDirection: "column" }} className="card__body">
                            <button onClick={() => { setWindowChangeLocal(1); setWindowChange(1); }}>Преподаватели</button>
                            <button onClick={() => { setWindowChangeLocal(2); setWindowChange(2); }}>Группы</button>
                            <button onClick={() => { setWindowChangeLocal(3); setWindowChange(3); }}>Аудитории</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    if (windowChangeLocal === 1) {
        return (
            <div>
                <div className="wrapper__card">
                    <div className="card">
                        <button onClick={() => { setWindowChangeLocal(0); setWindowChange(0); }}>Назад</button>
                        <h2 className="card__name">Преподаватели</h2>
                        <div className="card__body">
                            {teachers.map((teacher) => (
                                <div key={teacher} style={{ display: "flex", marginTop: "15px" }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedTeacherLocal === teacher}
                                        onChange={() => handleCheckboxChangeTeachers(teacher)}
                                    />
                                    <p style={{ marginLeft: "10px" }}>{teacher}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    
    if (windowChangeLocal === 2) {
        return (
            <div>
                <div className="wrapper__card">
                    <div className="card">
                        <button onClick={() => { setWindowChangeLocal(0); setWindowChange(0); }}>Назад</button>
                        <h2 className="card__name">Группы</h2>
                        <div className="card__body">
                            {groups.map((group) => (
                                <div key={group} style={{ display: "flex", marginTop: "15px" }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedGroupLocal === group}
                                        onChange={() => handleCheckboxChangeGroups(group)}
                                    />
                                    <p style={{ marginLeft: "10px" }}>{group}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    
    const renderContent = () => {
        if (windowChangeLocal === 3 && selectedBuildingCondition === 0) {
            return (
                <div className="wrapper__card">
                    <div className="card">
                        <button onClick={() => { setWindowChangeLocal(0); setWindowChange(0); }}>Назад</button>
                        <h2 className="card__name">Корпус</h2>
                        <div className="card__body">
                            {buildings.map((building) => (
                                <div key={building} style={{ display: "flex", marginTop: "15px" }}>
                                    <input
                                        type="radio"
                                        checked={selectedBuildingLocal === building}
                                        onChange={() => handleCheckboxChangeBuildings(building)}
                                    />
                                    <p style={{ marginLeft: "10px" }}>{building}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        } else if (selectedBuildingCondition === 1) {
            return (
                <div className="wrapper__card">
                    <div className="card">
                        <button onClick={() => setSelectedBuildingCondition(0)}>Назад</button>
                        <h2 className="card__name">Аудитории</h2>
                        <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "15px" }}>
                            <button onClick={() => handleAuditoryTypeChange("c/c")}>к/к</button>
                            <button onClick={() => handleAuditoryTypeChange("m/m")}>м/м</button>
                            <button onClick={() => handleAuditoryTypeChange("potok")}>поток</button>
                        </div>
                        <div className="card__body">
                            {filteredAuditoriesByBuilding.map((auditory) => (
                                <div key={auditory} style={{ display: "flex", marginTop: "15px" }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedAuditoryLocal === auditory}
                                        onChange={() => handleCheckboxChangeAuditories(auditory)}
                                    />
                                    <p style={{ marginLeft: "10px" }}>{auditory}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }
    };
    
    return <>{renderContent()}</>;
    
};

export default MainList;
