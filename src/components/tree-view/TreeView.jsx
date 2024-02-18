import React, { useState } from "react";
import MenuList from "./MenuList";
import "./tree-view.css";

export default function TreeView({ menus = [] }) {
  return (
    <div className="tree-view-container">
      <MenuList list={menus} />
    </div>
  );
}
