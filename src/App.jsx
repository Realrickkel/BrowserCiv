// Basic Structure for a Civilization-like Game in ReactJS
import React, { useState, useEffect } from 'react';

// Define a grid size for the game
const GRID_SIZE = 15;

// Generate a noise map using a seeded random function
const generateNoiseMap = (seed) => {
  const randomNoise = (x, y) => {
    const newSeed = (x + seed) * 1000 + (y + seed) * 10000;
    return Math.abs(Math.sin(newSeed) * 10000 % 1); // Generate pseudo-random noise value
  };

  const grid = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    const row = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      const value = randomNoise(i, j); // Generate noise value
      let terrain;
      if (value < 0.3) {
        terrain = 'water';
      } else if (value < 0.9) {
        terrain = 'grass';
      } else {
        terrain = 'mountain';
      }
      row.push({
        terrain,
        unit: null, // Example: player's unit or AI unit
        isSelected: false, // Track if the tile is selected
      });
    }
    grid.push(row);
  }
  return grid;
};

function App() {
  const [seed, setSeed] = useState(Math.random()); // Seed for consistent randomness
  const [grid, setGrid] = useState(generateNoiseMap(seed));
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
    setSelectedTile({ row, col, terrain: tile.terrain });
  };

  // End the current player's turn
  const endTurn = () => {
    console.log(`Turn ${turn} ended.`);
    setTurn(turn + 1);
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
    <div className="App w-screen h-screen flex justify-center items-center">
      <div className=''>
        <h1 className='text-3xl my-2'>Browser Civilization</h1>
        <div className="game-grid ">{renderGrid()}</div>
        <button onClick={endTurn}>End Turn</button>
        <p className=''>Current Turn: {turn}</p>
        {selectedTile && (
          <p className=''>
            Selected Tile: ({selectedTile.row}, {selectedTile.col})
          </p>
        )}
        {selectedTile && (
          <p className=''>
            Terrain: {selectedTile.terrain}
          </p>
        )}
      </div>
      
    </div>
  );
}

export default App;
