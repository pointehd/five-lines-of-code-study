const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

enum RawTile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE,
  FALLING_STONE,
  BOX,
  FALLING_BOX,
  KEY1,
  LOCK1,
  KEY2,
  LOCK2,
}

interface FallingState {
  isFalling(): boolean;
  isResting(): boolean;
  moveHorizontal(tile: Tile, dx: number): void;
}

class Falling implements FallingState {
  moveHorizontal(tile: Tile, dx: number): void {}
  isFalling(): boolean {
    return true;
  }
  isResting(): boolean {
    return false;
  }
}

class Resting implements FallingState {
  moveHorizontal(tile: Tile, dx: number): void {
    if (
      map[playery][playerx + dx + dx].isAir() &&
      !map[playery + 1][playerx + dx].isAir()
    ) {
      map[playery][playerx + dx + dx] = tile;
      moveToTile(playerx + dx, playery);
    }
  }
  isFalling(): boolean {
    return false;
  }
  isResting(): boolean {
    return true;
  }
}

interface Tile {
  isStony(): boolean;
  isBoxy(): boolean;
  isAir(): Boolean;
  isFlux(): Boolean;
  isUnbreakable(): Boolean; //
  isPlayer(): Boolean; //
  isStone(): Boolean;
  isFallingStone(): Boolean;
  isBox(): Boolean;
  isFallingBox(): Boolean;
  isKey1(): Boolean;
  isKey2(): Boolean;
  isLock1(): Boolean;
  isLock2(): Boolean;
  draw(g: CanvasRenderingContext2D, x: number, y: number): void;
  moveHorizontal(dx: number): void;
  moveVertical(dy: number): void;
}

class Air implements Tile {
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {
    moveToTile(playerx, playery + dy);
  }
  moveHorizontal(dx: number): void {
    moveToTile(playerx + dx, playery);
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {}
  isAir(): Boolean {
    return true;
  }
  isFlux(): Boolean {
    return false;
  }
  isUnbreakable(): Boolean {
    return false;
  }
  isPlayer(): Boolean {
    return false;
  }
  isStone(): Boolean {
    return false;
  }
  isFallingStone(): Boolean {
    return false;
  }
  isBox(): Boolean {
    return false;
  }
  isFallingBox(): Boolean {
    return false;
  }
  isKey1(): Boolean {
    return false;
  }
  isKey2(): Boolean {
    return false;
  }
  isLock1(): Boolean {
    return false;
  }
  isLock2(): Boolean {
    return false;
  }
}

class Flux implements Tile {
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {
    moveToTile(playerx, playery + dy);
  }
  moveHorizontal(dx: number): void {
    moveToTile(playerx + dx, playery);
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#ccffcc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isAir(): Boolean {
    return false;
  }
  isFlux(): Boolean {
    return true;
  }
  isUnbreakable(): Boolean {
    return false;
  }
  isPlayer(): Boolean {
    return false;
  }
  isStone(): Boolean {
    return false;
  }
  isFallingStone(): Boolean {
    return false;
  }
  isBox(): Boolean {
    return false;
  }
  isFallingBox(): Boolean {
    return false;
  }
  isKey1(): Boolean {
    return false;
  }
  isKey2(): Boolean {
    return false;
  }
  isLock1(): Boolean {
    return false;
  }
  isLock2(): Boolean {
    return false;
  }
}

class Unbreakable implements Tile {
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {}
  moveHorizontal(dx: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#999999";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isAir(): Boolean {
    return false;
  }
  isFlux(): Boolean {
    return false;
  }
  isUnbreakable(): Boolean {
    return true;
  }
  isPlayer(): Boolean {
    return false;
  }
  isStone(): Boolean {
    return false;
  }
  isFallingStone(): Boolean {
    return false;
  }
  isBox(): Boolean {
    return false;
  }
  isFallingBox(): Boolean {
    return false;
  }
  isKey1(): Boolean {
    return false;
  }
  isKey2(): Boolean {
    return false;
  }
  isLock1(): Boolean {
    return false;
  }
  isLock2(): Boolean {
    return false;
  }
}
class Player implements Tile {
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {}
  moveHorizontal(dx: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {}
  isAir(): Boolean {
    return false;
  }
  isFlux(): Boolean {
    return false;
  }
  isUnbreakable(): Boolean {
    return false;
  }
  isPlayer(): Boolean {
    return true;
  }
  isStone(): Boolean {
    return false;
  }
  isFallingStone(): Boolean {
    return false;
  }
  isBox(): Boolean {
    return false;
  }
  isFallingBox(): Boolean {
    return false;
  }
  isKey1(): Boolean {
    return false;
  }
  isKey2(): Boolean {
    return false;
  }
  isLock1(): Boolean {
    return false;
  }
  isLock2(): Boolean {
    return false;
  }
}

class Stone implements Tile {
  private falling: FallingState;
  constructor(falling: FallingState) {
    this.falling = falling;
  }
  isStony(): boolean {
    return true;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {}
  moveHorizontal(dx: number): void {
    this.falling.moveHorizontal(this, dx);
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#0000cc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isAir(): Boolean {
    return false;
  }
  isFlux(): Boolean {
    return false;
  }
  isUnbreakable(): Boolean {
    return false;
  }
  isPlayer(): Boolean {
    return false;
  }
  isStone(): Boolean {
    return true;
  }
  isFallingStone(): Boolean {
    return this.falling.isFalling();
  }
  isBox(): Boolean {
    return false;
  }
  isFallingBox(): Boolean {
    return false;
  }
  isKey1(): Boolean {
    return false;
  }
  isKey2(): Boolean {
    return false;
  }
  isLock1(): Boolean {
    return false;
  }
  isLock2(): Boolean {
    return false;
  }
}

class Box implements Tile {
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return true;
  }
  moveVertical(dy: number): void {}
  moveHorizontal(dx: number): void {
    if (
      map[playery][playerx + dx + dx].isAir() &&
      !map[playery + 1][playerx + dx].isAir()
    ) {
      map[playery][playerx + dx + dx] = this;
      moveToTile(playerx + dx, playery);
    }
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#8b4513";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isAir(): Boolean {
    return false;
  }
  isFlux(): Boolean {
    return false;
  }
  isUnbreakable(): Boolean {
    return false;
  }
  isPlayer(): Boolean {
    return false;
  }
  isStone(): Boolean {
    return false;
  }
  isFallingStone(): Boolean {
    return false;
  }
  isBox(): Boolean {
    return true;
  }
  isFallingBox(): Boolean {
    return false;
  }
  isKey1(): Boolean {
    return false;
  }
  isKey2(): Boolean {
    return false;
  }
  isLock1(): Boolean {
    return false;
  }
  isLock2(): Boolean {
    return false;
  }
}

class FallingBox implements Tile {
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return true;
  }
  moveVertical(dy: number): void {}
  moveHorizontal(dx: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#8b4513";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isAir(): Boolean {
    return false;
  }
  isFlux(): Boolean {
    return false;
  }
  isUnbreakable(): Boolean {
    return false;
  }
  isPlayer(): Boolean {
    return false;
  }
  isStone(): Boolean {
    return false;
  }
  isFallingStone(): Boolean {
    return false;
  }
  isBox(): Boolean {
    return false;
  }
  isFallingBox(): Boolean {
    return true;
  }
  isKey1(): Boolean {
    return false;
  }
  isKey2(): Boolean {
    return false;
  }
  isLock1(): Boolean {
    return false;
  }
  isLock2(): Boolean {
    return false;
  }
}

class Key1 implements Tile {
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {
    removeLock1();
    moveToTile(playerx, playery + dy);
  }
  moveHorizontal(dx: number): void {
    removeLock1();
    moveToTile(playerx + dx, playery);
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#ffcc00";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isAir(): Boolean {
    return false;
  }
  isFlux(): Boolean {
    return false;
  }
  isUnbreakable(): Boolean {
    return false;
  }
  isPlayer(): Boolean {
    return false;
  }
  isStone(): Boolean {
    return false;
  }
  isFallingStone(): Boolean {
    return false;
  }
  isBox(): Boolean {
    return false;
  }
  isFallingBox(): Boolean {
    return false;
  }
  isKey1(): Boolean {
    return true;
  }
  isKey2(): Boolean {
    return false;
  }
  isLock1(): Boolean {
    return false;
  }
  isLock2(): Boolean {
    return false;
  }
}
class Key2 implements Tile {
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {
    removeLock2();
    moveToTile(playerx, playery + dy);
  }
  moveHorizontal(dx: number): void {
    removeLock2();
    moveToTile(playerx + dx, playery);
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#00ccff";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isAir(): Boolean {
    return false;
  }
  isFlux(): Boolean {
    return false;
  }
  isUnbreakable(): Boolean {
    return false;
  }
  isPlayer(): Boolean {
    return false;
  }
  isStone(): Boolean {
    return false;
  }
  isFallingStone(): Boolean {
    return false;
  }
  isBox(): Boolean {
    return false;
  }
  isFallingBox(): Boolean {
    return false;
  }
  isKey1(): Boolean {
    return false;
  }
  isKey2(): Boolean {
    return true;
  }
  isLock1(): Boolean {
    return false;
  }
  isLock2(): Boolean {
    return false;
  }
}

class Lock1 implements Tile {
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {}
  moveHorizontal(dx: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#ffcc00";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isAir(): Boolean {
    return false;
  }
  isFlux(): Boolean {
    return false;
  }
  isUnbreakable(): Boolean {
    return false;
  }
  isPlayer(): Boolean {
    return false;
  }
  isStone(): Boolean {
    return false;
  }
  isFallingStone(): Boolean {
    return false;
  }
  isBox(): Boolean {
    return false;
  }
  isFallingBox(): Boolean {
    return false;
  }
  isKey1(): Boolean {
    return false;
  }
  isKey2(): Boolean {
    return false;
  }
  isLock1(): Boolean {
    return true;
  }
  isLock2(): Boolean {
    return false;
  }
}
class Lock2 implements Tile {
  isStony(): boolean {
    return false;
  }
  isBoxy(): boolean {
    return false;
  }
  moveVertical(dy: number): void {}
  moveHorizontal(dx: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#00ccff";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isAir(): Boolean {
    return false;
  }
  isFlux(): Boolean {
    return false;
  }
  isUnbreakable(): Boolean {
    return false;
  }
  isPlayer(): Boolean {
    return false;
  }
  isStone(): Boolean {
    return false;
  }
  isFallingStone(): Boolean {
    return false;
  }
  isBox(): Boolean {
    return false;
  }
  isFallingBox(): Boolean {
    return false;
  }
  isKey1(): Boolean {
    return false;
  }
  isKey2(): Boolean {
    return false;
  }
  isLock1(): Boolean {
    return false;
  }
  isLock2(): Boolean {
    return true;
  }
}

enum RawInput {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

interface Input {
  isRight(): Boolean;
  isLeft(): Boolean;
  isDown(): Boolean;
  isUp(): Boolean;
  handle(): void;
}

class Right implements Input {
  isRight(): Boolean {
    return true;
  }
  isLeft(): Boolean {
    return false;
  }
  isDown(): Boolean {
    return false;
  }
  isUp(): Boolean {
    return false;
  }
  handle() {
    map[playery][playerx + 1].moveHorizontal(1);
  }
}

class Left implements Input {
  isRight(): Boolean {
    return false;
  }
  isLeft(): Boolean {
    return true;
  }
  isDown(): Boolean {
    return false;
  }
  isUp(): Boolean {
    return false;
  }
  handle() {
    map[playery][playerx - 1].moveHorizontal(-1);
  }
}
class Down implements Input {
  isRight(): Boolean {
    return false;
  }
  isLeft(): Boolean {
    return false;
  }
  isDown(): Boolean {
    return true;
  }
  isUp(): Boolean {
    return false;
  }
  handle() {
    map[playery + 1][playerx].moveVertical(1);
  }
}
class Up implements Input {
  isRight(): Boolean {
    return false;
  }
  isLeft(): Boolean {
    return false;
  }
  isDown(): Boolean {
    return false;
  }
  isUp(): Boolean {
    return true;
  }
  handle() {
    map[playery - 1][playerx].moveVertical(-1);
  }
}

let playerx = 1;
let playery = 1;
let rawMap: RawTile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];

let map: Tile[][];

function assertExhausted(x: never): never {
  throw new Error("Unexpected object: " + x);
}

function transformTile(tile: RawTile) {
  switch (tile) {
    case RawTile.AIR:
      return new Air();
    case RawTile.FLUX:
      return new Flux();
    case RawTile.UNBREAKABLE:
      return new Unbreakable();
    case RawTile.PLAYER:
      return new Player();
    case RawTile.STONE:
      return new Stone(new Resting());
    case RawTile.FALLING_STONE:
      return new Stone(new Falling());
    case RawTile.BOX:
      return new Box();
    case RawTile.FALLING_BOX:
      return new FallingBox();
    case RawTile.KEY1:
      return new Key1();
    case RawTile.LOCK1:
      return new Lock1();
    case RawTile.KEY2:
      return new Key2();
    case RawTile.LOCK2:
      return new Lock2();
    default:
      assertExhausted(tile);
  }
}

function transformMap() {
  map = new Array(rawMap.length);
  for (let y = 0; y < rawMap.length; y++) {
    map[y] = new Array(rawMap[y].length);
    for (let x = 0; x < rawMap[y].length; x++) {
      map[y][x] = transformTile(rawMap[y][x]);
    }
  }
}

let inputs: Input[] = [];

function removeLock1() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock1()) {
        map[y][x] = new Air();
      }
    }
  }
}
function removeLock2() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock2()) {
        map[y][x] = new Air();
      }
    }
  }
}

function moveToTile(newx: number, newy: number) {
  map[playery][playerx] = new Air();
  map[newy][newx] = new Player();
  playerx = newx;
  playery = newy;
}

function update() {
  handleInputs();
  updateMap();
}

function handleInputs() {
  while (inputs.length > 0) {
    let current = inputs.pop();
    current.handle();
  }
}

function updateMap() {
  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      updateTile(x, y);
    }
  }
}

function updateTile(x: number, y: number) {
  if (map[y][x].isStony() && map[y + 1][x].isAir()) {
    map[y + 1][x] = new Stone(new Falling());
    map[y][x] = new Air();
  } else if (map[y][x].isBoxy() && map[y + 1][x].isAir()) {
    map[y + 1][x] = new FallingBox();
    map[y][x] = new Air();
  } else if (map[y][x].isFallingStone()) {
    map[y][x] = new Stone(new Resting());
  } else if (map[y][x].isFallingBox()) {
    map[y][x] = new Box();
  }
}

function draws() {
  let g = createGraphichs();
  drawMap(g);
  drawPlayer(g);
}

function createGraphichs() {
  let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
  let g = canvas.getContext("2d");
  g.clearRect(0, 0, canvas.width, canvas.height);
  return g;
}

function drawMap(g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].draw(g, x, y);
    }
  }
}

function drawPlayer(g: CanvasRenderingContext2D) {
  g.fillStyle = "#ff0000";
  g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function gameLoop() {
  let before = Date.now();
  update();
  draws();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
  transformMap();
  gameLoop();
};

const LEFT_KEY = "ArrowLeft";
const UP_KEY = "ArrowUp";
const RIGHT_KEY = "ArrowRight";
const DOWN_KEY = "ArrowDown";
window.addEventListener("keydown", (e) => {
  if (e.key === LEFT_KEY || e.key === "a") inputs.push(new Left());
  else if (e.key === UP_KEY || e.key === "w") inputs.push(new Up());
  else if (e.key === RIGHT_KEY || e.key === "d") inputs.push(new Right());
  else if (e.key === DOWN_KEY || e.key === "s") inputs.push(new Down());
});
