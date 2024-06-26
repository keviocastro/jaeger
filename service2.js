const express = require('express');
const app = express();
const { FORMAT_HTTP_HEADERS, Tags } = require('opentracing');
const port = 3002;

const { initTracer } = require('./tracer');
const serviceName = 'my-service-2';
const tracer = initTracer(serviceName);

app.post('/', async (req, res) => {
  const parentSpanContext = tracer.extract(FORMAT_HTTP_HEADERS, req.headers);
  const span = tracer.startSpan(`http_request_received-${serviceName}`, {
    childOf: parentSpanContext,
  });

  try {
    res.send('Hello from Service 2!');
  } catch (error) {
    span.setTag('error', true);
    span.log({ event: 'error', message: error.message });
    res.status(500).send('Error on Service 2');
  }finally{
    span.finish();
  }
});

app.listen(port, () => {
  console.log(`Service 2 listening at http://localhost:${port}`);
});
