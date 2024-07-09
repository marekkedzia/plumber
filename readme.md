# @marekkedzia/plumber-router

`@marekkedzia/plumber-router` is a TypeScript library that extends Express.js by introducing a structured way to define routers using a combination of pipes and filters. This architectural pattern allows for clear and maintainable route definitions in Node.js applications, enhancing modularity and reusability of middleware functions.

## Features

- **Modular Architecture**: Utilizes the pipes and filters design pattern to manage request processing in a decoupled manner.
- **Type Safety**: Leverages TypeScript for static type checking, ensuring that the route handling logic is type-safe and robust.
- **Custom Middleware Types**: Supports custom middleware definitions as pipes (transformers) and filters (validators or guards), which can be combined flexibly in route configurations.

## Installation

Ensure your system has Node.js (v14 or higher) installed. This library is hosted on GitHub Package Registry, so make sure you configure npm to use GitHub packages:

1. **Configure npm for GitHub Packages:**

   Edit your `~/.npmrc` file to include the following lines, replacing `YOUR_GITHUB_PERSONAL_ACCESS_TOKEN` with your actual token:

   ```plaintext
   @marekkedzia:registry=https://npm.pkg.github.com/
   //npm.pkg.github.com/:_authToken=YOUR_GITHUB_PERSONAL_ACCESS_TOKEN
   ```

2. **Install the library:**

   ```sh
   npm install @marekkedzia/plumber-router
   ```

## Usage

### Configuring a Router

Create a new `Plumber` instance by providing a configuration object which specifies the base path and optionally other settings.

```typescript
import { Plumber, Pipe, Filter } from '@marekkedzia/plumber-router';

// Define middleware functions
const logRequestPipe: Pipe<any> = Pipe((req) => {
    console.log('Request received:', req.path);
});

const authenticationFilter: Filter<any> = Filter(async (req) => {
    if (!req.headers.authorization) {
        throw new Error('Unauthorized');
    }
    return req.headers.authorization;
});

// Configure the router
const routerConfig = { path: '/api' };
const plumber = new Plumber(routerConfig);

// Register routes
plumber.register('get', [logRequestPipe, authenticationFilter], { path: '/users' });
```

### Running the App

Integrate the configured `Plumber` router into an Express application.

```javascript
const express = require('express');
const app = express();

app.use(plumber.router);
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests, or create issues for bugs and feature requests on GitHub.

## Author

Marek Kedzia

---
