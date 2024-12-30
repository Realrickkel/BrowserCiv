// Basic Structure for a Civilization-like Game in ReactJS
import React, { useState, useEffect } from 'react';
import './App.css';

// Define a grid size for the game
const GRID_SIZE = 10;

// Initial state for the grid
const createInitialGrid = () => {
  const grid = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    const row = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      row.push({
        terrain: 'grass', // Example: grass, water, mountain
        unit: null, // Example: player's unit or AI unit
        isSelected: false, // Track if the tile is selected
      });
    }
    grid.push(row);
  }
  return grid;
};

function App() {
  const [grid, setGrid] = useState(createInitialGrid());
  const [turn, setTurn] = useState(0); // Tracks the current turn
  const [selectedTile, setSelectedTile] = useState(null); // Selected tile

  // Handle tile selection
  const handleTileClick = (row, col) => {
    const newGrid = grid.map((gridRow, rowIndex) =>
      gridRow.map((tile, colIndex) => ({
        ...tile,
        isSelected: rowIndex === row && colIndex === col, // Only the clicked tile is selected
      }))
    );
    setGrid(newGrid);
    const tile = grid[row][col];
    if (tile.unit) {
      console.log(`Selected a unit at (${row}, ${col})`);
    } else {
      console.log(`Selected an empty tile at (${row}, ${col})`);
    }
    setSelectedTile({ row, col });
  };

  // End the current player's turn
  const endTurn = () => {
    console.log(`Turn ${turn} ended.`);
    setTurn(turn + 1);
    // Placeholder: Update AI or other game mechanics here
  };

  // Render the grid
  const renderGrid = () => {
    return grid.map((row, rowIndex) => (
      <div className="grid-row" key={rowIndex}>
        {row.map((tile, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`grid-tile ${tile.terrain} ${tile.isSelected ? 'selected' : ''}`}
            onClick={() => handleTileClick(rowIndex, colIndex)}
          >
            {tile.unit ? <span className="unit">U</span> : null}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="App">
      <h1>Civilization-like Game</h1>
      <div className="game-grid">{renderGrid()}</div>
      <button onClick={endTurn}>End Turn</button>
      <p>Current Turn: {turn}</p>
      {selectedTile && (
        <p>
          Selected Tile: ({selectedTile.row}, {selectedTile.col})
        </p>
      )}
    </div>
  );
}

export default App;