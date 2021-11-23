## Overview

This is a wrapper for the swagger-ui-dist package to faciliate use by passing in OpenAPI spec(s) via an endpoint call(s).

## Usage

```ts
import { getAbsoluteFSPath, generateIndexHtml } from '@boxed/swagger-ui-wrapper';

// path to the actual swagger-ui-dist directory
const swaggerUIPath = getAbsoluteFSPath(); 

// Generates the index html file for the swagger docs user interface - be sure to be serving out the OpenAPI spec(s) (JSON) via the url(s) specified
generateIndexHtml([{ name: 'admin', url: '/docs/spec' }], swaggerUIPath); 

// FOR EXPRESS:

app.use('/docs', express.static(swaggerUIPath));

// Route to serve out the JSON OpenAPI spec - docs references the use of doctopus here (an example but not mandatory to use)
app.get('/docs/spec', (req, res) => res.send(docs.build()));


// FOR FASTIFY:

server.register(fastifyStatic, {
    root: swaggerUIPath,
    prefix: '/docs',
})

// Route to serve out the JSON OpenAPI spec - docs references the use of doctopus here (an example but not mandatory to use)
server.get('/docs/spec', async(req, reply) => docs.build());

// Route for the swagger docs interface
server.get('/docs', async(req, reply) => reply.sendFile('index.html', swaggerUIPath));