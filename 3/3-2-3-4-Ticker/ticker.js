import { EventEmitter } from 'events';

export function tick(number, cb) {
  let ticks = 1;
  const emitter = new EventEmitter;

  process.nextTick(() => emitter.emit('tick'));

  const iv = setInterval(() => {
    ticks += 1;
    let ts = Date.now();

    if (ts % 5 === 0) {
      emitter.emit('error', `${ts} is divisible by 5`);
      cb({message: `${ts} is divisible by 5`}, null);
    }

    if(ticks * 50 > number) {
      clearInterval(iv);
      cb(null, ticks - 1);
    } else {
      emitter.emit('tick');
    }
  }, 50);

  return emitter;
}