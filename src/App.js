import './styles/main.css';
import './styles/card.css';
import './styles/table.css';
import MainList from "./components/MainList";
import MainTable from "./components/MainTable";
import {useEffect, useState} from "react";


// Свободные ячейки для определенного препода и для определенной аудитории полностью никем не заняты

// !!!!!!!!!!!!! При выборе дня недели подписываются группы и недели, которые есть у препода, и если ячейка свободна, то он может поставить их туда
function App() {
    const [data, setData] = useState([
        { teacher: "Крамная Е.С.", pulpit: "Ф", week: "2-3", time: "08:30-10:00", business: true, auditory: "101", auditoryType: "c/c", group: "ЦИС-38", day: "Пн" },
        { teacher: "Шулёва Ю.Н.", pulpit: "ИС", week: "1-4", time: "10:10-11:40", business: false, auditory: "101", auditoryType: "m/m", group: "ЦИСБ-34", day: "Вт" },
        { teacher: "Крамная Е.С.", pulpit: "Ф", week: "13-17", time: "13:30-15:00", business: true, auditory: "101", auditoryType: "potok", group: "ЦИС-38", day: "Чт" }
    ]);

    
    
    const [page, setPage] = useState(0);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedAuditory, setSelectedAuditory] = useState(null);
    const [selectedPulpit, setSelectedPulpit] = useState(null)
    const [windowChange, setWindowChange] = useState(0)
    
    useEffect(() => {
        if (selectedTeacher) {
            const teacherData = data.filter(entry => entry.teacher === selectedTeacher);
            const pulpit = teacherData.length > 0 ? teacherData[0].pulpit : null;
            setSelectedPulpit(pulpit);
        }
    }, [selectedTeacher, data]);

    console.log(selectedPulpit)
    return (
        <div className="App">
            <div className="container">
                <div className="main">
                    <MainList data={data} setData={setData} setWindowChange={setWindowChange} setSelectedTeacher={setSelectedTeacher} setSelectedGroup={setSelectedGroup} setSelectedAuditory={setSelectedAuditory} />
                    <MainTable data={data} selectedTeacher={selectedTeacher} selectedGroup={selectedGroup} selectedAuditory={selectedAuditory} windowChange={windowChange} selectedPulpit={selectedPulpit} />
                </div>

            </div>
        </div>
    );
}

export default App;
