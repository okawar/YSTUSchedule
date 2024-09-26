import React from 'react';

const MainList = ({ selectedTeachers, setSelectedTeachers }) => {
    const teachers = ["Крамная Е.С.", "Шулёва Ю.Н."]; // Данные о преподавателях
    
    const handleCheckboxChange = (teacher) => {
        if (selectedTeachers.includes(teacher)) {
            // Убираем из списка если уже выбран
            setSelectedTeachers(selectedTeachers.filter((t) => t !== teacher));
        } else {
            // Добавляем преподавателя в список
            setSelectedTeachers([...selectedTeachers, teacher]);
        }
    };
    
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
                                    checked={selectedTeachers.includes(teacher)}
                                    onChange={() => handleCheckboxChange(teacher)}
                                />
                                <p>{teacher}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainList;
