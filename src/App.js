import './styles/main.css';
import './styles/card.css';
import './styles/table.css';
import MainList from "./components/MainList";
import MainTable from "./components/MainTable";
import { useState } from "react";

function App() {
    const [data, setData] = useState([
        { teacher: "Крамная Е.С.", week: "2-3", time: "08:30-10:00", business: true, auditory: "101", group: "ЦИС-38", day: "Пн" },
        { teacher: "Шулёва Ю.Н.", week: "1-4", time: "10:10-11:40", business: false, auditory: "102", group: "ЦИСБ-34", day: "Вт" },
        { teacher: "Крамная Е.С.", week: "13-17", time: "13:30-15:00", business: true, auditory: "101", group: "ЦИС-38", day: "Чт" }
    ]);
    
    const [page, setPage] = useState(0);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    return (
        <div className="App">
            <div className="container">
                <div className="main">
                    <MainList data={data} setData={setData} page={page} setSelectedTeacher={setSelectedTeacher} />
                    <MainTable data={data} selectedTeacher={selectedTeacher} />
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
