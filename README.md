## deno-simple-server

A very simple HTTP server with Deno and a single worker

The server will be launched on the `1111` port

You can launch the server on any port if you specify it:

```shell script
export PORT=1111
```

### Deploy

```shell script
git clone https://github.com/peterdee/deno-simple-server
cd ./deno-simple-server
```

### Launch

```shell script
deno run --allow-net --allow-env --allow-read --unstable server.ts
```

### Benchmarking

Tested with [`wrk`](https://github.com/wg/wrk)

```text
peter: ~/Playground $ wrk -c 100 -d 30 -t 4 http://127.0.0.1:1111
Running 30s test @ http://127.0.0.1:1111
  4 threads and 100 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     3.63ms    1.92ms 108.65ms   91.56%
    Req/Sec     6.99k   813.61     8.20k    87.42%
  835261 requests in 30.02s, 50.18MB read
Requests/sec:  27826.33
Transfer/sec:      1.67MB
```
