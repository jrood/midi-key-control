import easymidi from 'easymidi';

export default class MidiDevice {
  constructor(query) {
    const outputs = easymidi.getOutputs();
    const queryUpper = query.toUpperCase();
    const name = outputs.find(name => {
      return name.toUpperCase().includes(queryUpper);
    });
    if (!name) {
      throw new Error(`Could not find ${query}`);
    }
    this.output = new easymidi.Output(query);
  }

  setChannel(channel) {
    this.channel = channel;
  }

  send(note, velocity) {
    const evt = velocity ? 'noteon' : 'noteoff';
    this.output.send(evt, {
      note,
      velocity,
      channel: this.channel
    });
  }
}