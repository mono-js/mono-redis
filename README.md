<h1 align="center"><img src="https://user-images.githubusercontent.com/904724/31045670-0b96f158-a5e9-11e7-82ab-e59af67ceef5.png" width="350" alt="Mono"/></h1>

> Redis module for [Mono](https://github.com/terrajs/mono)

[![npm version](https://img.shields.io/npm/v/mono-redis.svg)](https://www.npmjs.com/package/mono-redis)
[![Travis](https://img.shields.io/travis/terrajs/mono-redis/master.svg)](https://travis-ci.org/terrajs/mono-redis)
[![Coverage](https://img.shields.io/codecov/c/github/terrajs/mono-redis/master.svg)](https://codecov.io/gh/terrajs/mono-redis.js)
[![license](https://img.shields.io/github/license/terrajs/mono-redis.svg)](https://github.com/terrajs/mono-redis/blob/master/LICENSE)

## Installation

```bash
npm install --save mono-redis
```

Then, in your configuration file of your Mono application (example: `conf/application.js`):

```js
module.exports = {
  mono: {
    modules: ['mono-redis']
  }
}
```

## Configuration

Mono-Redis will use the `redis` property of your configuration (example: `conf/development.js`):

```js
module.exports = {
  mono: {
    redis: {
      port: 8047,
      // See [options] of https://github.com/luin/ioredis/blob/master/API.md#new-redisport-host-options
    }
  }
}
```

## Usage

In your modules files, you can access `redis` instance like this:

```js
const { redis } = require('mono-redis')

await redis.set('hello', 'world!')
const hello = await redis.get('hello')
// hello = 'world!'
```

We are using [ioredis](https://github.com/luin/ioredis) as a client since it supports async/await promises.
