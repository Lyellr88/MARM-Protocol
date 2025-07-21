// marmLogic2.js -- Refactored modular version (barrel pattern)
// This file imports and re-exports logic from submodules for maintainability.
// When ready, rename to marmLogic.js and update imports elsewhere.

import * as constants from './constants.js';
import * as session from './session.js';
import * as notebook from './notebook.js';
import * as docs from './docs.js';
import * as summary from './summary.js';
import * as utils from './utils.js';

export * from './constants.js';
export * from './session.js';
export * from './notebook.js';
export * from './docs.js';
export * from './summary.js';
export * from './utils.js';

// Optionally, export as grouped namespaces
export { constants, session, notebook, docs, summary, utils }; 
