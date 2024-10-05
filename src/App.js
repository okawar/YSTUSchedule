import './styles/main.css';
import './styles/card.css';
import './styles/table.css';
import MainList from "./components/MainList";
import MainTable from "./components/MainTable";
import { useState } from "react";

function App() {
    const [selectedTeachers, setSelectedTeachers] = useState([]);
    const [selectedGroups, setSelectedGroups] = useState([]);// Массив выбранных преподавателей
    const [weekData, setWeekData] = useState([
        { teacher: "Крамная Е.С.", week: "Пн", time: "08:30-10:00", business: true, auditory: "101", group: "ЦИС-38" },
        { teacher: "Шулёва Ю.Н.", week: "Вт", time: "10:10-11:40", business: false, auditory: "102",group: "ЦИСБ-34" },
        { teacher: "Крамная Е.С.", week: "Ср", time: "13:30-15:00", business: true, auditory: "101", group: "ЦИС-38" }
    ]); // Пример данных
    const [page, setPage] = useState(0);
    
    console.log(page)
    return (
        <div className="App">
            <div className="container">
                <div className="main">
                    
                    
                    <MainList selectedTeachers={selectedTeachers} setSelectedTeachers={setSelectedTeachers} selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups} page={page}/>
                    <MainTable selectedTeachers={selectedTeachers} weekData={weekData} />
                </div>
                <div className="main__btns">
                    <button
                        onClick={() => {
                            setPage(page - 1);
                        }}
                    >-</button>
                    <button
                        onClick={() => {
                            setPage(page + 1);
                        }}
                    >+</button>
                    
                </div>
            </div>
        </div>
    );
}

export default App;
