import React, { useState, useEffect } from "react";
import Title from "../ui/Title";
import OptionsList from "../ui/OptionsList";
import List from "../ui/List";
import "../styles/aside.css";

export default function Aside({ data, title, setTitle }) {
  const {
    teacherData,
    groupData,
    auditoryData,
    selectedData,
    setSelectedData,
    addElement,
    clearList,
    setElementsFromCheckBox,
    selectedCell,
  } = data;

  const [pageSwitcher, setPageSwitcher] = useState(0);
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    const inputValue = e.target.value.trim();
    setSearchText(inputValue);
  };

  useEffect(() => {
    if (selectedCell) {
      setPageSwitcher(4);
    }
  }, [selectedCell])

  const handleRemoveElement = (type, element) => {
    setSelectedData((prevData) => {
      const updatedData = {
        ...prevData,
        [type]: prevData[type].filter(e => e.id !== element.id),
      };

      if (type === "teachersFromCheckBox") {
        updatedData.teachers = updatedData.teachers.filter(e => e.id !== element.id);
      } else if (type === "groupsFromCheckBox") {
        updatedData.groups = updatedData.groups.filter(e => e.id !== element.id);
      } else if (type === "auditoriesFromCheckBox") {
        updatedData.auditories = updatedData.auditories.filter(e => e.id !== element.id);
      }

      return updatedData;
    });
  };

  if (pageSwitcher == 0) {
    return (
      <div className="aside">
        <h2>Выберите категорию</h2>

        <button
          onClick={() => {
            setPageSwitcher(1);
            setTitle("Преподаватели");
          }}
        >
          Преподаватели
        </button>
        <button
          onClick={() => {
            setPageSwitcher(2);
            setTitle("Группы");
          }}
        >
          Группы
        </button>
        <button
          onClick={() => {
            setPageSwitcher(3);
            setTitle("Аудитории");
          }}
        >
          Аудитории
        </button>
      </div>
    );
  }
  if (pageSwitcher == 1) {
    return (
      <div className="aside">
        <button onClick={() => setPageSwitcher(0)}>Назад</button>

        <Title title={title} />

        <div>
          <input value={searchText} onChange={handleSearchChange} type="text" />
        </div>
        <div>
          <OptionsList
            Data={teacherData}
            addElement={(teacher) => addElement("teachers", teacher)}
            title={title}
            searchText={searchText}
            resetSelect={() => setSearchText("")}
          />
        </div>
        <div>
          <List
            selectedElement={selectedData.teachers}
            selectedFromCheckBox={selectedData.teachersFromCheckBox}
            setElementsFromCheckBox={setElementsFromCheckBox}
            type="teachersFromCheckBox"
            removeElement={handleRemoveElement}
          />
        </div>
        <div>
          <button onClick={() => clearList("teachers")}>Очистить</button>
        </div>
      </div>
    );
  }
  if (pageSwitcher == 2) {
    return (
      <div className="aside">
        <button onClick={() => setPageSwitcher(0)}>Назад</button>
        <Title title={title} />
        <div>
          <input value={searchText} onChange={handleSearchChange} type="text" />
        </div>
        <div>
          <OptionsList
            Data={groupData}
            addElement={(group) => addElement("groups", group)}
            title={title}
            searchText={searchText}
            resetSelect={() => setSearchText("")}
          />
        </div>
        <div>
        <List
            selectedElement={selectedData.groups}
            selectedFromCheckBox={selectedData.groupsFromCheckBox}
            setElementsFromCheckBox={setElementsFromCheckBox}
            type="groupsFromCheckBox"
            removeElement={handleRemoveElement}
          />
        </div>
        <div>
          <button onClick={() => clearList("groups")}>Очистить</button>
        </div>
      </div>
    );
  }
  if (pageSwitcher == 3) {
    return (
      <div className="aside">
        <button onClick={() => setPageSwitcher(0)}>Назад</button>
        <Title title={title} />
        <div>
          <input value={searchText} onChange={handleSearchChange} type="text" />
        </div>
        <div>
          <OptionsList
            Data={auditoryData}
            addElement={(auditory) => addElement("auditories", auditory)}
            title={title}
            searchText={searchText}
            resetSelect={() => setSearchText("")}
          />
        </div>
        <div>
        <List
            selectedElement={selectedData.auditories}
            selectedFromCheckBox={selectedData.auditoriesFromCheckBox}
            setElementsFromCheckBox={setElementsFromCheckBox}
            type="auditoriesFromCheckBox"
            removeElement={handleRemoveElement}
          />
        </div>
        <div>
          <button onClick={() => clearList("auditories")}>Очистить</button>
        </div>
      </div>
    );
  }
  if (pageSwitcher === 4) {
    return (
      <div className="aside">
        
        <button onClick={() => setPageSwitcher(0)}>Назад</button>
        <h2>Расписание на {selectedCell[0]?.day}</h2>
        {selectedCell.map((cell, index) => (
          <div style={{marginTop: "20px"}} key={index}>
            <div>
              <strong>Преподаватель:</strong> {cell.teacherName}
            </div>
            <div>
              <strong>Предмет:</strong> {cell.subject}
            </div>
            <div>
              <strong>Группа:</strong> {cell.groupName}
            </div>
            <div>
              <strong>Аудитория:</strong> {cell.auditoryName} ({cell.building})
            </div>
            <div>
              <strong>Время:</strong> {cell.day} ({cell.time})
            </div>
          </div>
        ))}
      </div>
    );
  }
}
