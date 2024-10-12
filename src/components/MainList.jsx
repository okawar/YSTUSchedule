import React, { useState } from 'react';

const MainList = ({ data, setSelectedTeacher, setSelectedGroup, setSelectedAuditory, setWindowChange }) => {
    const [windowChangeLocal, setWindowChangeLocal] = useState(0);
    
    const [selectedTeacherLocal, setSelectedTeacherLocal] = useState(null);
    const teachers = [...new Set(data.map(item => item.teacher))];
    
    const [selectedGroupLocal, setSelectedGroupLocal] = useState(null);
    const groups = [...new Set(data.map(item => item.group))];
    
    const [selectedAuditoryLocal, setSelectedAuditoryLocal] = useState(null);
    const [selectedAuditoryType, setSelectedAuditoryType] = useState(null); // Новое состояние для типа аудитории
    const auditories = [...new Set(data.map(item => item.auditory))];
    
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
    
    // Обработчик изменения типа аудитории
    const handleAuditoryTypeChange = (type) => {
        setSelectedAuditoryType(type);
    };
    
    // Фильтрация аудиторий по выбранному типу аудитории
    const filteredData = selectedAuditoryType
        ? data.filter(item => item.auditoryType === selectedAuditoryType)
        : data;
    
    const filteredAuditories = [...new Set(filteredData.map(item => item.auditory))];
    
    if (windowChangeLocal === 0) {
        return (
            <div>
                <div className="wrapper__card">
                    <div className="card">
                        <div className="card__name">Выберите категорию</div>
                        <div
                            
                            style={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                            
                            className="card__body">
                            <button
                                style={{
                                
                                    background: "transparent",
                                    border: "transparent",
                                    borderBottom: "2px solid #000",
                                    marginTop: "30px",
                                    paddingBottom: "10px",
                                    fontWeight: "600",
                                    fontSize: "24px",
                                    width: "70%",
                                    alignSelf: "center"
                                
                                }}
                                
                                onClick={() => { setWindowChangeLocal(1); setWindowChange(1); }}>Преподаватели</button>
                            <button
                                style={{
                                
                                    background: "transparent",
                                    border: "transparent",
                                    borderBottom: "2px solid #000",
                                    marginTop: "30px",
                                    paddingBottom: "10px",
                                    fontWeight: "600",
                                    fontSize: "24px",
                                    width: "70%",
                                    alignSelf: "center"
                                
                                }}
                                
                                onClick={() => { setWindowChangeLocal(2); setWindowChange(2); }}>Группы</button>
                            <button
                                style={{
                                
                                    background: "transparent",
                                    border: "transparent",
                                    borderBottom: "2px solid #000",
                                    marginTop: "30px",
                                    paddingBottom: "10px",
                                    fontWeight: "600",
                                    fontSize: "24px",
                                    width: "70%",
                                    alignSelf: "center"
                                
                                }}
                                
                                onClick={() => { setWindowChangeLocal(3); setWindowChange(3); }}>Аудитории</button>
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
                    <div className="card" style={{ overflow: "hidden" }}>
                        <button
                            style={{ background: "transparent", borderColor: "transparent", cursor: "pointer", marginTop: "20px" }}
                            onClick={() => { setWindowChangeLocal(0); setWindowChange(0); }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292" />
                            </svg>
                        </button>
                        <h2 className="card__name">Преподаватели</h2>
                        <div className="card__body">
                            <input type="text" className="card__search" placeholder="Найти преподавателя" />
                            <div style={{ overflow: "scroll", display: "flex", flexDirection: "column", height: "100px", fontSize: "24px" }}>
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
            </div>
        );
    }
    
    if (windowChangeLocal === 2) {
        return (
            <div>
                <div className="wrapper__card">
                    <div className="card">
                        <button
                            style={{ background: "transparent", borderColor: "transparent", cursor: "pointer", marginTop: "20px" }}
                            onClick={() => { setWindowChangeLocal(0); setWindowChange(0); }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292" />
                            </svg>
                        </button>
                        
                        <h2 className="card__name">Группы</h2>
                        <div className="card__body">
                            <input type="text" className="card__search" placeholder="Найти группу" />
                            {groups.map((group) => (
                                <div key={group}>
                                    <input
                                        type="checkbox"
                                        checked={selectedGroupLocal === group}
                                        onChange={() => handleCheckboxChangeGroups(group)}
                                    />
                                    <p>{group}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    if (windowChangeLocal === 3) {
        return (
            <div>
                <div className="wrapper__card">
                    <div className="card">
                        <button
                            style={{ background: "transparent", borderColor: "transparent", cursor: "pointer", marginTop: "20px" }}
                            onClick={() => { setWindowChangeLocal(0); setWindowChange(0); }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
                                <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292" />
                            </svg>
                        </button>
                        <h2 className="card__name">Аудитории</h2>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-around",
                                marginBottom: "15px",

                            }}
                            
                        >
                            <button
                                style={{
                                    borderColor: "transparent",
                                    background: "transparent",
                                    cursor: "pointer",
                                    fontSize: "17px"
                                }}
                                
                                
                                onClick={() => handleAuditoryTypeChange("c/c")}>к/к</button>
                            <button
                                style={{
                                    borderColor: "transparent",
                                    background: "transparent",
                                    cursor: "pointer",
                                    fontSize: "17px"
                                }}
                                
                                onClick={() => handleAuditoryTypeChange("m/m")}>м/м</button>
                            <button
                                style={{
                                    borderColor: "transparent",
                                    background: "transparent",
                                    cursor: "pointer",
                                    fontSize: "17px"
                                }}
                                
                                onClick={() => handleAuditoryTypeChange("potok")}>поток</button>
                        </div>
                        <div className="card__body">
                            <input type="text" className="card__search" placeholder="Найти аудиторию" />
                            {filteredAuditories.map((auditory) => (
                                <div key={auditory}>
                                    <input
                                        type="checkbox"
                                        checked={selectedAuditoryLocal === auditory}
                                        onChange={() => handleCheckboxChangeAuditories(auditory)}
                                    />
                                    <p>{auditory}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default MainList;
