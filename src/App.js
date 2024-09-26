import './styles/main.css';
import './styles/card.css';
import './styles/table.css';
import MainList from "./components/MainList";
import MainTable from "./components/MainTable";
import { useState } from "react";

function App() {
    const [selectedTeachers, setSelectedTeachers] = useState([]); // Массив выбранных преподавателей
    const [weekData, setWeekData] = useState([
        { teacher: "Крамная Е.С.", week: "Пн", time: "08:30-10:00", business: true, auditory: "101" },
        { teacher: "Шулёва Ю.Н.", week: "Вт", time: "10:10-11:40", business: false, auditory: "102" },
        { teacher: "Крамная Е.С.", week: "Ср", time: "13:30-15:00", business: true, auditory: "101" }
    ]); // Пример данных
    
    return (
        <div className="App">
            <div className="container">
                <div className="main">
                    <MainList selectedTeachers={selectedTeachers} setSelectedTeachers={setSelectedTeachers} />
                    <MainTable selectedTeachers={selectedTeachers} weekData={weekData} />
                </div>
            </div>
        </div>
    );
}

export default App;
