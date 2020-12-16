import status from '../build/src/index.js';
import assert from 'assert';

const s = new status.Statuspage('wgbgn12kd4gt');

s.summary().then(({status}) =>
  assert(status.description === 'All Systems Operational')
);
