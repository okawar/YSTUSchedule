import React, { useEffect, useState } from 'react';

const MainList = ({ data, page, setData, setSelectedTeacher }) => {
    const [selectedTeacher, setSelectedTeacherLocal] = useState(null);


    const teachers = [...new Set(data.map(item => item.teacher))];

    const handleCheckboxChangeTeachers = (teacher) => {
        setSelectedTeacherLocal(teacher);
        setSelectedTeacher(teacher); 
    };


    if (page === 0) {
        return (
            <div>
                <div className="wrapper__card">
                    <div className="card">
                        <h2 className="card__name">Преподаватели</h2>
                        <div className="card__body">
                            <input type="text" className="card__search" placeholder="Найти преподавателя" />
                            {teachers.map((teacher) => (
                                <div key={teacher}>
                                    <input
                                        type="checkbox"
                                        checked={selectedTeacher === teacher}
                                        onChange={() => handleCheckboxChangeTeachers(teacher)}
                                    />
                                    <p>{teacher}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default MainList;
