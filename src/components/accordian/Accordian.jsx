import React, { useState, useEffect } from "react";
import "./accordian.css";
import data from "./data";

export default function Accordian() {
  const [selected, setSelected] = useState(null);
  const [multiSelection, setMultiSelection] = useState(false);
  const [selections, setSelections] = useState([]);

  useEffect(() => {
    setSelected(null);
    setSelections([]);
  }, [multiSelection]);

  function handleSingleSelection(currId) {
    setSelected(currId === selected ? null : currId);
  }

  function handleMultiSelection(currId) {
    let cpySelections = [...selections];

    const findIndexofCurrent = cpySelections.indexOf(currId);

    if (findIndexofCurrent === -1) {
      cpySelections.push(currId);
    } else {
      cpySelections.splice(findIndexofCurrent, 1);
    }

    setSelections(cpySelections);
  }
  console.log(selected, selections);

  return (
    <div className="wrapper">
      <button onClick={() => setMultiSelection(!multiSelection)}>
        {multiSelection ? "Disable" : "Enable"} Multiple Selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                className="title"
                onClick={
                  multiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              <div>
                {selected === dataItem.id ||
                selections.indexOf(dataItem.id) !== -1 ? (
                  <div className="content">{dataItem.answer}</div>
                ) : null}
              </div>
            </div>
          ))
        ) : (
          <h3>no data found</h3>
        )}
      </div>
    </div>
  );
}
