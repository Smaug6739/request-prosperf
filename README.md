# Request prosperf

This module provides a simple way to get statistics on an http service.  
You can follow the evolution of response times and improve the efficiency of your services.  
This module provides simple reports by calculating the average response time or with the detail of your service. You can choose to export the details of each request in a json file.

## Getting Started

### Prerequisites

Node.js 14.0.0 or newer is required.

### Instalation

Install the module with npm or yarn :

With npm :

```
npm install request-prosperf
```

With yarn :

```
yarn add request-prosperf
```

## Usage

Import the module from node_modules :

With CommonJS syntax :

```js
const { RequestTerter } = require("request-prosperf");
```

With module syntax :

```js
import {RequestTerter} = from 'request-prosperf';

```

Create a new instance of RequestTerter :

```js
const options = {
  requests: 200; // Number of requests to test
  maxRequestTimeout: 2000; // Maximum time in milliseconds
  output: 'result.json'; // Json file
  cooldown: 0; // Setup cooldown between requests (in ms)
  throwOnError: false; // Throw on error
  method: 'GET'; // HTTP method to use
  body: null; // The body of the request
}
const tester = new RequestTerter('http://localhost:8080/ping',{options});
```

## Methods of RequestTerter

---

### start()

Start the testing.

Return : Promise\<ResultResponse>

## Properties of ResultResponse

---

### time

Return the total time in milliseconds for test every request.

### medium

The medium time of request.

## Methods of ResultResponse

---

### toJSON()

View detail as a json.

Return : JSON

---

## Authors

- [Smaug6739](https://github.com/Smaug6739)
