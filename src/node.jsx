import React from 'react'
import './App.css'

export default function Node({
  row,
  col,
  isStart,
  isEnd,
  isWall,
  isVisited,
  onClick,
}) {
  const extra = isStart
    ? 'node-start'
    : isEnd
    ? 'node-end'
    : isWall
    ? 'node-wall'
    : ''

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extra}`}
      onClick={onClick}></div>
  )
}
