import { serve } from 'https://deno.land/std@0.50.0/http/server.ts';

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
  // event listener handler
  const handler = (event: ResponseEvent) => {    
    // remove an event listener
    worker.removeEventListener('message', handler);

    req.respond({
      body: event.data?.response,
    });
  }

  // create an event listener for the worker
  worker.addEventListener('message', handler);
  
  // get the response text from a worker
  worker.postMessage({ action: 'response' });
}
