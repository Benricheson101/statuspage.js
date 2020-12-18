<h1 style="align: center">statuspage.js 📈</h1>

A Node.js implementation of [statuspage.io](https://statuspage.io) 's API.

# Quickstart
1. Install
```bash
# yarn
yarn add statuspage.js
# npm
npm i statuspage.js
```
2. Import and instantiate
```js
import {Statuspage, StatuspageUpdates} from 'statuspage.js';
// or
const {Statuspage, StatuspageUpdates} = require('statuspage.js');

const status = new Statuspage('abc123');
const updates = new StatuspageUpdates('abc123');
```
3. Do stuff!

---

For full documentation refer to [this page](https://www.notion.so/statuspage-js-e5582e4ac707443c88dd19edc9b501a8)
