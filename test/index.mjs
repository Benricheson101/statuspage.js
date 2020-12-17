import {Statuspage} from '../build/src/index.js';
import assert from 'assert';

const s = new Statuspage('wgbgn12kd4gt');

s.summary().then(({status}) =>
  assert(status.description === 'All Systems Operational')
);
