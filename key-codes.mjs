const keyCodes =
  `  1234567890-=` +
  `  qwertyuiop[]` +
  `  asdfghjkl;' ` +
  `  zxcvbnm,./`
  .split('')
  .map(c => c == ' ' ? null : c);

// function keys
for (let i = 1; i <= 10; i++) {
  keyCodes[58 + i] = `F${i}`;
}

keyCodes[42] = 'shift';
keyCodes[54] = 'shift';

export default keyCodes;
