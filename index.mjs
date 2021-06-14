import Keyboard from './keyboard.mjs';
import MidiDevice from './midi-device.mjs';
import keyCodes from './key-codes.mjs';
import keyMappings from './key-mappings.mjs';

const keyboard = new Keyboard('/dev/input/event0');
const hermod = new MidiDevice('hermod');

hermod.setChannel(1);

let offset = 48;

keyboard.onKeyEvent(evt => {
  const key = keyCodes[evt.code];
  if (key == null) {
    return;
  }
  const val = keyMappings[key];
  if (val == null) {
    return;
  }

  // to do: if shift key is down, bring up an octave

  if (typeof val == 'string' && val.indexOf('channel') == 0) {
    const channel = val.split('channel')[0];
    hermod.setChannel(+channel);
  }
  if (typeof val == 'number') {
    hermod.send(val + offset, evt.value * 127);
  }
});
