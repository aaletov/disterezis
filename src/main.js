import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 300,
  height: 600,
  backgroundColor: 0x333333,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

const gridSize = 30; // Size of each block
const cols = 10; // Number of columns
const rows = 20; // Number of rows

let grid;
let currentPiece;
let nextPiece;
let dropTime = 500; // Time between automatic drops
let dropCounter = 0;
let lastTime = 0;

const tetrominoes = [
  // Define tetromino shapes
  [[1, 1, 1, 1]], // I shape
  [
    [1, 1],
    [1, 1],
  ], // O shape
  [
    [1, 1, 0],
    [0, 1, 1],
  ], // S shape
  [
    [0, 1, 1],
    [1, 1, 0],
  ], // Z shape
  [
    [1, 1, 1],
    [0, 1, 0],
  ], // T shape
  [
    [1, 1, 1],
    [1, 0, 0],
  ], // L shape
  [
    [1, 1, 1],
    [0, 0, 1],
  ], // J shape
];

function preload() {}

function create() {
  grid = createEmptyGrid();
  currentPiece = createPiece();
  nextPiece = createPiece();

  this.input.keyboard.on('keydown-LEFT', () => movePiece(-1));
  this.input.keyboard.on('keydown-RIGHT', () => movePiece(1));
  this.input.keyboard.on('keydown-DOWN', () => dropPiece());
  this.input.keyboard.on('keydown-UP', () => rotatePiece());
}

function update(time) {
  const delta = time - lastTime;
  lastTime = time;
  dropCounter += delta;

  if (dropCounter > dropTime) {
    dropCounter = 0;
    dropPiece();
  }

  drawGrid(this);
}

// Utility functions

function createEmptyGrid() {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
}

function createPiece() {
  const shape = Phaser.Math.RND.pick(tetrominoes);
  return {
    x: Math.floor(cols / 2) - Math.floor(shape[0].length / 2),
    y: 0,
    shape,
  };
}

function drawGrid(scene) {
  scene.graphics?.clear();
  scene.graphics = scene.add.graphics();

  // Draw the grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const color = grid[r][c] ? 0xffffff : 0x555555;
      scene.graphics.fillStyle(color, grid[r][c] ? 1 : 0.1);
      scene.graphics.fillRect(c * gridSize, r * gridSize, gridSize - 1, gridSize - 1);
    }
  }

  // Draw the current piece
  for (let r = 0; r < currentPiece.shape.length; r++) {
    for (let c = 0; c < currentPiece.shape[r].length; c++) {
      if (currentPiece.shape[r][c]) {
        scene.graphics.fillStyle(0xff0000, 1);
        scene.graphics.fillRect(
          (currentPiece.x + c) * gridSize,
          (currentPiece.y + r) * gridSize,
          gridSize - 1,
          gridSize - 1
        );
      }
    }
  }
}

function movePiece(dir) {
  currentPiece.x += dir;
  if (collides()) {
    currentPiece.x -= dir;
  }
}

function rotatePiece() {
  const shape = currentPiece.shape.map((row, r) =>
    row.map((_, c) => currentPiece.shape[currentPiece.shape.length - 1 - c][r])
  );
  const prevShape = currentPiece.shape;
  currentPiece.shape = shape;
  if (collides()) {
    currentPiece.shape = prevShape;
  }
}

function dropPiece() {
  currentPiece.y++;
  if (collides()) {
    currentPiece.y--;
    mergePiece();
    currentPiece = nextPiece;
    nextPiece = createPiece();
    clearLines();
    if (collides()) {
      // Game Over
      grid = createEmptyGrid();
    }
  }
}

function collides() {
  for (let r = 0; r < currentPiece.shape.length; r++) {
    for (let c = 0; c < currentPiece.shape[r].length; c++) {
      if (
        currentPiece.shape[r][c] &&
        (grid[currentPiece.y + r]?.[currentPiece.x + c] === undefined ||
          grid[currentPiece.y + r][currentPiece.x + c])
      ) {
        return true;
      }
    }
  }
  return false;
}

function mergePiece() {
  for (let r = 0; r < currentPiece.shape.length; r++) {
    for (let c = 0; c < currentPiece.shape[r].length; c++) {
      if (currentPiece.shape[r][c]) {
        grid[currentPiece.y + r][currentPiece.x + c] = 1;
      }
    }
  }
}

function clearLines() {
  grid = grid.filter((row) => row.some((cell) => !cell));
  while (grid.length < rows) {
    grid.unshift(Array(cols).fill(0));
  }
}
