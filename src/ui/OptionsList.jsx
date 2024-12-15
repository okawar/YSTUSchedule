import React from "react";

export default function OptionsList(props) {
  const filteredData = Object.entries(props.Data).filter(([Key, Obj]) =>
    Obj.name.toLowerCase().includes(props.searchText.toLowerCase())
  );

  const sortedData = filteredData.sort(([, ObjA], [, ObjB]) =>
    ObjA.name.localeCompare(ObjB.name)
  );

  return (
    <div>
      <label htmlFor={`${props.title}`}>{`Выберите ${props.title}`}</label>
      <select
        name={`${props.title}`}
        onChange={(e) => props.addElement(e.target.value)}
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
