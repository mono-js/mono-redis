const redis = require('redis')

module.exports = async function () {
	const log = this.log.module('mono-redis')
	const redisConfig = this.conf.redis || {}

	log.info(`Opening Redis connection...`)
	log.info("config :", redisConfig)
	let redisClient = redis.createClient(redisConfig)

	// Expose redis client
	module.exports.redis = redisClient

	// Bind connect and error connection
	return new Promise((resolve, reject) => {
		redisClient.on('error', (err) => {
			log.error('Could not connect to Redis server')
			reject(err)
		})

		redisClient.on('connect', () => {
			log.info(`Redis connected`)
			resolve()
		})
	})
}

