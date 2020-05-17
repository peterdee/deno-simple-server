import { serve, ServerRequest } from 'https://deno.land/std@0.50.0/http/server.ts';

import { ResponseEvent } from './types.ts';

// get the port from the environment
const environemt = Deno.env.toObject();
const port = Number(environemt.PORT) || 1111;

// create the worker
const worker = new Worker('./worker.ts', {
  deno: true,
  name: 'worker',
  type: 'module',
});

// run the server
const server = serve({ port });
console.log(`-- Deno running on port ${port}`);

// handle incoming requests
for await (const req of server) {
  // create an event listener for the worker
  worker.addEventListener(
    'message',
    (event: ResponseEvent) => req.respond({
      body: event.data?.response,
    }),
  );
  
  // get the response text from a worker
  worker.postMessage({ action: 'response' });
}
