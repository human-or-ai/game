class Game {
  /**
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.gc = this.canvas.getContext('2d');

    // Set canvas width/height
    this.width = width;
    this.height = height;

    this.reset(1); // Reset with a seed of 1
  }

  /**
   * Resets everything, all previous event listeners, etc.
   */
  reset(seed) {
    this.seed = seed || 1;
    this.paused = true;
    this.score = 0;
    this.events = {};
    this.doUpdate = true;
    console.warn('Game state reset');
  }

  random() {
    let x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }

  /**
   * Begins the game loop
   */
  start() {
    this.score = 0;
    this.doUpdate = true;
    this.paused = false;

    // Setup player position
    this.player = {
      x: Math.round(this.width / 2),
      y: this.height - 40,
      r: 16,
      dx: 0
    };

    this.update();
  }

  /**
   * Update function.
   * DO NOT CALL THIS FUNCTION MANUALLY!
   * Automatically run by the game
   */
  update() {
    // Update player

    // Clear gc
    this.gc.clearRect(0, 0, this.width, this.height);
    this.gc.save();
    this.gc.translate(0.5, 0.5);

    // Draw player
    this.gc.fillStyle = '#2233ff';
    this.gc.strokeStyle = 'black';
    this.gc.lineWidth = 4;
    this.gc.beginPath();
    this.gc.arc(this.player.x, this.player.y, this.player.r, 0, Math.PI * 2);
    this.gc.closePath();
    this.gc.fill();
    this.gc.stroke();
    this.gc.restore();

    if (this.doUpdate) {
      requestAnimationFrame(() => {
        this.update();
      });
    }
  }

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

  /**
   * Event system lookups
   */
  on(event, callback) {
    // If the event list already exists
    if (this.events[event]) {
      // Add this new callback to the list
      this.events[event].push(callback);
    } else {
      // Else make the list for the first time
      // with the given callback as its first
      this.events[event] = [callback];
    }
  }

  /**
   * Emits an event
   */
  emit(event, ...params) {
    // If the event exists, call its functions
    if (this.events[event])
      this.events[event].forEach(callback => callback(...params));
  }
}

export default Game;
