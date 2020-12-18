// const {Statuspage} = require('../build/src');
// const assert = require('assert');

// const st = new Statuspage('wgbgn12kd4gt');

// st.summary().then(({status}) =>
//   assert(status.description === 'All Systems Operational')
// );

const {StatuspageUpdates} = require('../build/src');

const s = new StatuspageUpdates('wgbgn12kd4gt', 5000);

s.on('INCIDENT_UPDATE', e =>
  console.log('Updoot!', e.incidents[0].incident_updates[0].body)
);

s.start();
