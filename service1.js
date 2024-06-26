const express = require('express');
const app = express();
const axios = require('axios');
const { faker } = require('@faker-js/faker');
const { initTracer } = require('./tracer');
const { FORMAT_HTTP_HEADERS } = require('opentracing');
const port = 3001;

const serviceName = 'my-service-1';
const tracer = initTracer(serviceName);


app.get('/', async (req, res) => {
  const service2Host = process.env.SERVICE_2_HOST || 'localhost';
  const service2Port = process.env.SERVICE_2_PORT || 3002;
  
  const requestBody = {
    name: faker.person.fullName(),
    email: faker.internet.email()
  };

  const span = tracer.startSpan(`http_request_start-${serviceName}`);
  span.setTag('request', JSON.stringify(requestBody));
  
  try {
    const headers = {};
    tracer.inject(span.context(), FORMAT_HTTP_HEADERS, headers);
    
    const response = await axios.post(`http://${service2Host}:${service2Port}`, requestBody, {
      headers
    });
    const message = response.data;
    res.send('Hello from Service 1! Service 2 says: ' + message + ' ' + new Date().toISOString());
  } catch (error) {
    span.setTag('error', true);
    span.log({ event: 'error', message: error.message, requestBody });
    res.status(500).send('Error communicating with Service 2');
  }finally{
    span.finish();
  }
});

app.listen(port, () => {
  console.log(`Service 1 listening at http://localhost:${port}`);
});
