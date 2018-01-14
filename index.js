class Game {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.gc = this.canvas.getContext("2d");

    // Set canvas width/height
    this.canvas.width = width;
    this.canvas.height = height;

    this.reset();
  }

  /**
   * Resets the Game as if it was never played before
   */
  reset() {}

  /**
   * Begins the game loop
   */
  start() {}

  /**
   * Pauses the game
   */
  pause() {
    this.paused = true;
  }

  /**
   * Un-pauses the game
   */
  resume() {
    this.paused = false;
  }
}

export default Game;
