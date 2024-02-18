import React, { useState } from "react";
import MenuList from "./MenuList";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function MenuItem({ item }) {
  const [dispCurrChild, setDispCurrChild] = useState({});

  function hadleToggleChildren(label) {
    setDispCurrChild({
      ...dispCurrChild,
      [label]: !dispCurrChild[label],
    });
  }

  return (
    <li>
      <div className="label-container">
        <p>{item.label}</p>
        {item && item.children && item.children.length ? (
          <span onClick={() => hadleToggleChildren(item.label)}>
            {dispCurrChild[item.label] ? <FaMinus /> : <FaPlus />}
          </span>
        ) : null}
      </div>
      {item &&
      item.children &&
      item.children.length > 0 &&
      dispCurrChild[item.label] ? (
        <MenuList list={item.children} />
      ) : null}
    </li>
  );
}
