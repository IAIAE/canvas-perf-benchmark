# canvas-perf-benchmark
This is a tool for test device performance on canvas2d(not webgl) on production environment.

## what this tool do
run a short loop to draw a vector with normal-complexity. If canvas done it within 5ms, then run a loop with more complexity, otherwise, run a loop with less complexity. until you touch the bottle neck.

## usage
```
npm install canvas-perf-benchmark
```
and then
```javascript
import canvasPerf from 'canvas-perf-benchmark';

canvasPerf.test().then(score=>{
    // do next
})
```

## reference

