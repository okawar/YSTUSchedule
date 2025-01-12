import React from 'react';

import "../styles/list.css"

const List = ({ selectedElement, selectedFromCheckBox, setElementsFromCheckBox, type, removeElement  }) => {
  const handleCheckboxChange = (element) => {
    setElementsFromCheckBox(type, (prevElements) => {
      const prevArr = Array.isArray(prevElements) ? prevElements : [];
      if (prevArr.some(e => e.id === element.id)) {
        return prevArr.filter(e => e.id !== element.id);
      } else {
        return [...prevArr, element];
      }
    });
  };

  const handleRemoveElement = (element) => {
    removeElement(type, element);
  };

  return (
    <div>
      <ul>
        {Array.isArray(selectedElement) && selectedElement.map((element, index) => (
          <li key={index}>
            <input
              type="checkbox"
              value={element.id}
              onChange={() => handleCheckboxChange(element)}
              checked={Array.isArray(selectedFromCheckBox) && selectedFromCheckBox.some(e => e.id === element.id)}
            />
            <div>{element.name}</div>
            <button onClick={() => handleRemoveElement(element)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
