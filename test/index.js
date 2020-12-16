const {Statuspage} = require('../build/src');
const assert = require('assert');

const st = new Statuspage('wgbgn12kd4gt');

st.summary().then(({status}) =>
  assert(status.description === 'All Systems Operational')
);
