const { HttpError } = require('@terrajs/mono')
const { cb } = require('@terrajs/mono/utils')

const { redis } = require('../../../..')

module.exports = [
	{
		method: 'get',
		path: '/redis/:key',
		async handler(req, res) {
			// We check if the :key exist from redis
			const exists = await redis.exists(req.params.key)
			// We throw an error if the key is not found
			if (!exists) throw new HttpError('key-not-found', 404)
			// We get the data from redis
			const value = await redis.get(req.params.key)
			// We send back the response
			res.send(value)
		}
	},
	{
		method: 'put',
		path: '/redis/:key',
		async handler(req, res) {
			// We set the value from body.value to redis as :key
			await redis.set(req.params.key, req.body.value)
			// We send back the response
			res.send(req.body.value)
		}
	},
	{
		method: 'delete',
		path: '/redis/:key',
		async handler(req, res) {
			// We check if the :key exist
			const exists = await redis.exists(req.params.key)
			// We throw an error if the key is not found
			if (!exists) throw new HttpError('key-not-found', 404)
			// We delete the value from :key
			await cb(redis.del.bind(redis), req.params.key)
			// We send back the response
			res.json({ ok: true })
		}
	}
]
