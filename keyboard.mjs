import input from 'input-event';

export default class Keyboard {
  constructor(deviceFile) {
    const device = new input(deviceFile);
    this.keyboard = new input.Keyboard(device);
  }

  onKeyEvent(callback) {
    this.keyboard.on('keyup', callback);
    this.keyboard.on('keypress', callback);
  }
}
