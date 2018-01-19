const Redis = require('ioredis')

// Promosify methods
// redis.RedisClient.prototype = pify(redis.RedisClient.prototype, { excludeMain: true })

module.exports = async function ({ conf, log }) {
	const redisConfig = conf.mono.redis || {}

	log.info(`Opening Redis connection...`)
	// See [options] of https://github.com/luin/ioredis/blob/master/API.md#new-redisport-host-options
	let redis = new Redis(redisConfig)

	// Expose redis client (promisifed)
	module.exports.redis = redis

	// Bind connect and error connection
	return new Promise((resolve, reject) => {
		redis.on('error', (err) => {
			log.error('Could not connect to Redis server')
			/* istanbul ignore else */
			if (err.code === 'ECONNREFUSED') {
				reject(new Error(`Redis connection to ${err.address}:${err.port} failed`))
			}
			reject(err)
		})

		redis.on('ready', () => {
			log.info(`Redis connected`)
			resolve()
		})
	})
}

