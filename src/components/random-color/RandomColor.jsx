import React, { useEffect, useState } from "react";

export default function RandomColor() {
  const [colorType, setColorType] = useState("hex");
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    colorType === "rgb" ? generateRgbColor() : generateHexColor();
  }, [colorType]);

  function randomColorUtil(length) {
    return Math.floor(Math.random() * length);
  }

  function generateHexColor() {
    const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtil(hex.length)];
    }
    setColor(hexColor);
  }
  function generateRgbColor() {
    const r = randomColorUtil(256);
    const g = randomColorUtil(256);
    const b = randomColorUtil(256);

    setColor(`rgb(${r}, ${g}, ${b})`);
  }
  return (
    <div style={{ width: "99vw", height: "98vh", background: color }}>
      <button onClick={() => setColorType("hex")}>Create Hex Color</button>
      <button onClick={() => setColorType("rgb")}>Create RGB Color</button>
      <button
        onClick={colorType === "hex" ? generateHexColor : generateRgbColor}
      >
        Generante Random Color
      </button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "white",
          fontSize: "40px",
          marginTop: "20vh",
          flexDirection: "column",
        }}
      >
        <h3>{colorType === "rgb" ? "RGB Color" : "Hex Color"}</h3>
        <h1>{color}</h1>
      </div>
    </div>
  );
}
