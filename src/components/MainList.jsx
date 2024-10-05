import React from 'react';

const MainList = ({ selectedTeachers, setSelectedTeachers, page, selectedGroups, setSelectedGroups }) => {
    const teachers = ["Крамная Е.С.", "Шулёва Ю.Н."]; // Данные о преподавателях
    const groups = ["ЦИС-38", "ЦИСБ-34"]; // Данные о преподавателях
    
    const handleCheckboxChangeTeachers = (teacher) => {
        if (selectedTeachers.includes(teacher)) {
            // Убираем из списка если уже выбран
            setSelectedTeachers(selectedTeachers.filter((t) => t !== teacher));
        } else {
            // Добавляем преподавателя в список
            setSelectedTeachers([...selectedTeachers, teacher]);
        }
    };
    const handleCheckboxChangeGroups = (group) => {
        if (selectedGroups.includes(group)) {
            // Убираем из списка если уже выбран
            setSelectedGroups(selectedGroups.filter((t) => t !== group));
        } else {
            // Добавляем преподавателя в список
            setSelectedGroups([...selectedGroups, group]);
        }
    };
    
    if (page == 0){
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
    if (page == 1){
        return (
            <div>
                <div className="wrapper__card">
                    <div className="card">
                        <h2 className="card__name">Группы</h2>
                        <div className="card__body">
                            <input type="text" className="card__search" placeholder="Найти группу" />
                            {groups.map((group) => (
                                <div key={group}>
                                    <input
                                        type="checkbox"
                                        checked={selectedGroups.includes(group)}
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
    
};

export default MainList;
