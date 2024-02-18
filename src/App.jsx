import React from "react";
import TreeView from "./components/tree-view/TreeView";
import menus from "./components/tree-view/data";

export default function App() {
  return (
    <>
      <TreeView menus={menus} />
    </>
  );
}
