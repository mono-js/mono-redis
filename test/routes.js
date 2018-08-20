const test = require('ava')
const { join } = require('path')

const redisModule = require('../')

const { cb } = require('mono-utils')
const { start, stop, $put, $get, $delete } = require('mono-test-utils')

let ctx

test.before('Start mono with routes context and flush redis', async () => {
	ctx = await start(join(__dirname, 'fixtures/ok/'))

	await cb(redisModule.redis.flushall.bind(redisModule.redis))
})

test('$get if no key present', async (t) => {
	const { body } = await $get('/redis/test')

	t.is(body.code, 'key-not-found')
})

test('$delete if no key present', async (t) => {
	const { body } = await $get('/redis/test')

	t.is(body.code, 'key-not-found')
})

test('$put', async (t) => {
	const { body } = await $put('/redis/test', {
		body: { value: 'value' }
	})

	t.is(body, 'value')
})

test('$get', async (t) => {
	const { body } = await $get('/redis/test')

	t.is(body, 'value')
})

test('$delete', async (t) => {
	const { body } = await $delete('/redis/test')

	t.deepEqual(body, { ok: true })
})

test('$put an object', async (t) => {
	const { body } = await $put('/redis/hello', {
		body: {
			value: JSON.stringify({ hello: 'world' })
		}
	})

	t.is(body.hello, 'world')
})

test('$get an object', async (t) => {
	const { body } = await $get('/redis/hello')

	t.is(body.hello, 'world')
})

test('$delete an object', async (t) => {
	const { body } = await $delete('/redis/hello')

	t.deepEqual(body, { ok: true })
})


test.after('Close mono server', async () => {
	await stop(ctx.server)
})
