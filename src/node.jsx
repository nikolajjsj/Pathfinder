import React from "react";
import "./App.css";

export default function Node({ row, col, isStart, isEnd, wall, visited }) {
  const extra = isStart ? "node-start" : isEnd ? "node-end" : "";

  return <div id={`node-${row}-${col}`} className={`node ${extra}`}></div>;
}
