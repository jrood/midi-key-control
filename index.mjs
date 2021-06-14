import Keyboard from './keyboard';
import MidiDevice from './midi-device';
import keyCodes from './key-codes';
import keyMappings from './key-mappings';

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
