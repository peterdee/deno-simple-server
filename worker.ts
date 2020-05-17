self.onmessage = (event: MessageEvent) => event.data.action === 'response' && self.postMessage({
  response: `-- DENO -- ${Date.now()}`,
});
