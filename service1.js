const express = require('express');
const app = express();
const axios = require('axios');
const initTracer = require('jaeger-client').initTracer;
const port = 3001;

let config = {
  serviceName: 'my-service-1',
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
    const service2Host = process.env.SERVICE_2_HOST || 'localhost';
    const service2Port = process.env.SERVICE_2_PORT || 3002;
    const response = await axios.get(`http://${service2Host}:${service2Port}`);
    const message = response.data;
    res.send('Hello from Service 1! Service 2 says: ' + message + ' ' + new Date().toISOString());
  } catch (error) {
    req.span.setTag('error', true);
    req.span.log({ event: 'error', message: error.message });
    res.status(500).send('Error communicating with Service 2');
  }
});

app.listen(port, () => {
  console.log(`Service 1 listening at http://localhost:${port}`);
});
