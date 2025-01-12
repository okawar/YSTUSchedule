import React, { useState } from "react";

export default function OptionsList(props) {
  const [selectedValue, setSelectedValue] = useState("");

  const filteredData = Object.entries(props.Data).filter(([Key, Obj]) =>
    Obj.name.toLowerCase().includes(props.searchText.toLowerCase())
  );

  const sortedData = filteredData.sort(([, ObjA], [, ObjB]) =>
    ObjA.name.localeCompare(ObjB.name)
  );

  const handleChange = (value) => {
    props.addElement(value); // Добавляем элемент в список
    setSelectedValue(""); // Сбрасываем выбранное значение к дефолтному
  };

  return (
    <div>
      <label htmlFor={`${props.title}`}>{`Выберите ${props.title}`}</label>
      <select
        name={`${props.title}`}
        value={selectedValue} // Привязываем значение к состоянию
        onChange={(e) => handleChange(e.target.value)}
      >
        <option value="" disabled>
          Выберите элемент
        </option>
        {sortedData.map(([Key, Obj]) => (
          <option value={Key} key={Key}>
            {Obj.name}
          </option>
        ))}
      </select>
    </div>
  );
}
