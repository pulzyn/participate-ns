// SPDX-License-Identifier: CC0-1.0

import fs from 'node:fs';
import jsonld from 'jsonld';

const contextFile = process.env.CONTEXT_FILE ?? new URL('../../ns.jsonld', import.meta.url);
let doc;

try {
  doc = JSON.parse(fs.readFileSync(contextFile, 'utf8'));
} catch (error) {
  console.error(`ns.jsonld: invalid JSON: ${error.message}`);
  process.exit(1);
}

if (!doc || typeof doc !== 'object' || Array.isArray(doc)) {
  console.error('ns.jsonld: expected a top-level JSON object');
  process.exit(1);
}

const context = doc['@context'];
if (!context || typeof context !== 'object' || Array.isArray(context)) {
  console.error('ns.jsonld: expected @context to be an object');
  process.exit(1);
}

const documentLoader = async (url) => {
  throw new Error(`Remote context loading is disabled: ${url}`);
};

try {
  await jsonld.expand({ '@context': context }, { documentLoader });
} catch (error) {
  console.error(`ns.jsonld: invalid JSON-LD context: ${error.message}`);
  process.exit(1);
}

function countTerms(definitions) {
  return Object.entries(definitions).reduce((count, [term, definition]) => {
    const nestedContext = definition && typeof definition === 'object' && !Array.isArray(definition)
      ? definition['@context']
      : null;
    return count + Number(!term.startsWith('@')) +
      (nestedContext && typeof nestedContext === 'object' && !Array.isArray(nestedContext)
        ? countTerms(nestedContext)
        : 0);
  }, 0);
}

console.log(`ns.jsonld: valid JSON-LD context (${countTerms(context)} terms)`);
