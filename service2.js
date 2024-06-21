const express = require('express');
const app = express();
const initTracer = require('jaeger-client').initTracer;
const port = 3002;

let config = {
  serviceName: 'my-service-2',
  reporter: {
    logSpans: true,
    agentHost: process.env.JAEGER_AGENT_HOST || 'localhost',
    agentPort: process.env.JAEGER_AGENT_PORT || 6831, // Porta UDP padrão para Thrift compactado
  },
  sampler: {
    type: 'const',
    param: 1,
  },
};

let options = {
  tags: {
    'my-service.version': '1.1.2',
  },
  logger: console,
};

let tracer = initTracer(config, options);

// Middleware para iniciar um novo span para cada requisição HTTP
app.use((req, res, next) => {
  const span = tracer.startSpan('http_request');
  req.span = span;
  next();
  span.finish();
});

app.get('/', async (req, res) => {
  try {
    res.send('Hello from Service 2!');
  } catch (error) {
    req.span.setTag('error', true);
    req.span.log({ event: 'error', message: error.message });
    res.status(500).send('Error on Service 2');
  }
});

app.listen(port, () => {
  console.log(`Service 1 listening at http://localhost:${port}`);
});
