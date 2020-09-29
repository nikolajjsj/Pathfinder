import React, { useState } from 'react'
import { dijkstra, getNodesInShortestPathOrder } from './algorhitms/djikstra'
import Node from './node'

const START_NODE_ROW = 7
const START_NODE_COL = 4
const END_NODE_ROW = 7
const END_NODE_COL = 20

export default function PathfinderVisualizer() {
  const [grid, setGrid] = useState(makeGrid)

  function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder)
        }, 10 * i)
        return
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i]
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited'
      }, 10 * i)
    }
  }

  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i]
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path'
      }, 50 * i)
    }
  }

  function visualizeDijkstra() {
    const startNode = grid[START_NODE_ROW][START_NODE_COL]
    const endNode = grid[END_NODE_ROW][END_NODE_COL]
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode)
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode)
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder)
  }

  return (
    <div>
      <div className='button-row'>
        <button id='reset-button' onClick={() => resetGrid(grid)}>
          Reset
        </button>
        <button className='sort-button' onClick={() => visualizeDijkstra()}>
          Djikstra's
        </button>
      </div>
      <div className='node-grid'>
        {grid.map((row, rowIndex) => {
          return (
            <div className={rowIndex} key={rowIndex}>
              {row.map((node, colIndex) => {
                const { row, col, isStart, isEnd, isWall } = node
                return (
                  <Node
                    key={colIndex}
                    row={row}
                    col={col}
                    isStart={isStart}
                    isEnd={isEnd}
                    isWall={isWall}
                    onClick={() => setGrid(wallToggled(grid, row, col))}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const makeGrid = () => {
  let grid = []
  for (let i = 0; i < 15; i++) {
    let row = []
    for (let j = 0; j < 25; j++) row.push(createNode(i, j))
    grid.push(row)
  }
  return grid
}

const resetGrid = (grid) => {
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 25; j++) {
      let extra = ''
      if (i === START_NODE_ROW && j === START_NODE_COL) extra = 'node-start'
      if (i === END_NODE_ROW && j === END_NODE_COL) extra = 'node-end'
      if (!grid[i][j].isWall) {
        document.getElementById(`node-${i}-${j}`).className = `node ${extra}`
      }
    }
  }
}

const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === END_NODE_ROW && col === END_NODE_COL,
    isVisited: false,
    isWall: false,
    distance: Infinity,
    previousNode: null,
  }
}

const wallToggled = (grid, row, col) => {
  const newGrid = grid.slice()
  const node = newGrid[row][col]
  const newNode = {
    ...node,
    isWall: !node.isWall,
  }
  newGrid[row][col] = newNode
  return newGrid
}
