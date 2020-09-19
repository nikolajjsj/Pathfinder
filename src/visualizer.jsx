import React, { useState } from "react";
import { dijkstra, getNodesInShortestPathOrder } from "./algorhitms/djikstra";
import Node from "./node";

const START_NODE_ROW = 10;
const START_NODE_COL = 5;
const END_NODE_ROW = 10;
const END_NODE_COL = 20;

export default function PathfinderVisualizer() {
  const [nodes, setNodes] = useState(makeNodes);

  function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  function visualizeDijkstra() {
    const startNode = nodes[START_NODE_ROW][START_NODE_COL];
    const endNode = nodes[END_NODE_ROW][END_NODE_COL];
    const visitedNodesInOrder = dijkstra(nodes, startNode, endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  return (
    <div>
      <div className="button-row">
        {/* <button onClick={() => setNodes(makeNodes)}>Reset</button> */}
        <button onClick={() => visualizeDijkstra()}>Djikstra's</button>
      </div>
      <div className="node-grid">
        {nodes.map((row, rowIndex) => {
          return (
            <div className={rowIndex} key={rowIndex}>
              {row.map((node, colIndex) => {
                const { row, col, isStart, isEnd, wall } = node;
                return (
                  <Node
                    key={colIndex}
                    row={row}
                    col={col}
                    isStart={isStart}
                    isEnd={isEnd}
                    wall={wall}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const makeNodes = () => {
  let grid = [];
  for (let i = 0; i < 25; i++) {
    let row = [];
    for (let j = 0; j < 25; j++) row.push(createNode(i, j));
    grid.push(row);
  }
  return grid;
};

const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isEnd: row === END_NODE_ROW && col === END_NODE_COL,
    distance: Infinity,
    visited: false,
    wall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
