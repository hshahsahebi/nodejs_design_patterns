import { tick } from './ticker.js';

tick(500, (err, count) => {
  if (err) {
    return console.log(`Error on Callback: ${err.message}`);
  }
  console.log(`${count} ticks published`);
})
  .on('tick', () => console.log('tick'))
  .on('error', () => console.log('Error emitted!'));