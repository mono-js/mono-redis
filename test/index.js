const test = require('ava')
const { join } = require('path')

const { start, stop } = require('@terrajs/mono-test-utils')

const redisModule = require('../')
const { RedisClient } = require('redis')

test('Redis should be undefined when connection not opened', (t) => {
	t.true(typeof redisModule.redis === 'undefined')
	t.false(redisModule.redis instanceof RedisClient)
})

test('Start mono on fixture/ok/ should log a connection established', async (t) => {
	let ctx = await start(join(__dirname, 'fixtures/ok/'))
	t.true(ctx.stdout.join().includes('[@terrajs/mono-redis:mono-redis] Opening Redis connection...'))
	t.true(ctx.stdout.join().includes('[@terrajs/mono-redis:mono-redis] Redis connected'))
	t.true(redisModule.redis instanceof RedisClient)
	await stop(ctx.server)
})

test('Start mono on fixture/ko/ should log a Redis connection error', async (t) => {
	const error = await t.throws(start(join(__dirname, 'fixtures/ko/')))
	t.true(error.stderr.join().includes('[@terrajs/mono-redis:mono-redis] Could not connect to Redis server'))
})
